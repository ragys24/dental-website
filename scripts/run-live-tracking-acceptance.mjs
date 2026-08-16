import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chromiumPort = 9223;
const profileDir = '/tmp/uplift-tracking-acceptance-profile';
const testUrl = 'https://upliftdental.com/contact?controlled_tracking_test=postfix-qa-20260815&utm_source=google&utm_medium=cpc&utm_campaign=event_proof&gclid=TEST-GCLID-CLEANCHROME-20260815&gbraid=TEST-GBRAID-CLEANCHROME-20260815&wbraid=TEST-WBRAID-CLEANCHROME-20260815';
const expectedEventNames = new Set(['generate_lead', 'click_to_call', 'begin_booking']);
const pageOnlyMode = process.env.UPLIFT_QA_MODE === 'page_only';

fs.rmSync(profileDir, { recursive: true, force: true });

const chromium = spawn('/usr/bin/chromium', [
  '--headless=new',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  '--remote-debugging-address=127.0.0.1',
  `--remote-debugging-port=${chromiumPort}`,
  `--user-data-dir=${profileDir}`,
  'about:blank',
], { stdio: 'ignore' });

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getDebuggerUrl() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${chromiumPort}/json/version`);
      if (response.ok) return (await response.json()).webSocketDebuggerUrl;
    } catch {
      // Chromium is still starting.
    }
    await wait(250);
  }
  throw new Error('Clean Chromium did not expose a debugging endpoint.');
}

const cdpUrl = await getDebuggerUrl();
const ws = new WebSocket(cdpUrl);
const pending = new Map();
const requests = [];
const requestUrls = new Map();
let sequence = 0;

function send(method, params = {}, sessionId) {
  const id = ++sequence;
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
  ws.addEventListener('message', (message) => {
    const packet = JSON.parse(message.data);
    if (packet.id && pending.has(packet.id)) {
      const { resolve, reject: rejectPending } = pending.get(packet.id);
      pending.delete(packet.id);
      if (packet.error) rejectPending(new Error(packet.error.message));
      else resolve(packet.result);
      return;
    }

    if (packet.method === 'Network.requestWillBeSent') {
      const url = packet.params?.request?.url || '';
      requestUrls.set(packet.params.requestId, url);
      if (/google-analytics\.com\/g\/collect/i.test(url)) {
        const parsed = new URL(url);
        const postParameters = new URLSearchParams(packet.params?.request?.postData || '');
        requests.push({
          event_name: parsed.searchParams.get('en') || postParameters.get('en') || 'unknown',
          request_id: packet.params.requestId,
        });
      }
    }
  });
});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Network.enable', {}, sessionId);
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

const evaluate = async (expression, awaitPromise = false) => {
  const result = await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }, sessionId);
  return result.result.value;
};

await send('Page.navigate', { url: testUrl }, sessionId);
await wait(15000);

const formReady = await evaluate(`Boolean(document.querySelector('#contact-appointment-name') && document.querySelector('#contact-appointment-phone'))`);
if (!formReady) {
  const diagnostic = await evaluate(`JSON.stringify({
    final_url: location.href,
    title: document.title,
    body_preview: document.body?.innerText?.slice(0, 500) || '',
    loaded_scripts: performance.getEntriesByType('resource').map((entry) => entry.name).filter((name) => name.includes('/assets/'))
  })`);
  console.log(JSON.stringify({
    test_url: testUrl,
    form_ready: false,
    page_diagnostic: JSON.parse(diagnostic),
  }, null, 2));
  ws.close();
  chromium.kill('SIGTERM');
  process.exit(0);
}

if (pageOnlyMode) {
  await wait(5000);
  console.log(JSON.stringify({
    test_url: testUrl,
    page_only: true,
    ga_collection_events: requests.map(({ event_name }) => event_name),
  }, null, 2));
  ws.close();
  chromium.kill('SIGTERM');
  process.exit(0);
}

const formResult = await evaluate(`(async () => {
  const setValue = (selector, value) => {
    const element = document.querySelector(selector);
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };
  setValue('#contact-appointment-name', 'Uplift Dental Tracking Test Clean Browser');
  setValue('#contact-appointment-phone', '7148983308');
  document.querySelector('form').requestSubmit();
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (document.body.innerText.includes('Your appointment request has been received.')) return true;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
})()`, true);

const callResult = await evaluate(`(() => {
  const callLink = document.querySelector('a[href="tel:+17148983308"]');
  if (!callLink) return false;
  callLink.click();
  return true;
})()`);

await wait(500);
const bookingResult = await evaluate(`(async () => {
  const bookingLink = document.querySelector('a[href*="patientportal.carestack.com"]');
  if (!bookingLink) return { confirmation_shown: false, confirmed: false };
  bookingLink.click();
  await new Promise((resolve) => setTimeout(resolve, 300));
  const confirmButton = document.querySelector('[data-booking-intent-confirm]');
  if (!confirmButton) return { confirmation_shown: false, confirmed: false };
  confirmButton.click();
  return { confirmation_shown: true, confirmed: true };
})()`, true);

await wait(5000);

const pageState = await evaluate(`JSON.stringify({
  final_url: location.href,
  paid_parameters: ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign'].filter((key) => new URL(location.href).searchParams.has(key)),
  success_visible: document.body.innerText.includes('Your appointment request has been received.')
})`);

const eventCounts = Object.fromEntries(
  [...expectedEventNames].map((eventName) => [eventName, requests.filter((request) => request.event_name === eventName).length]),
);

console.log(JSON.stringify({
  test_url: testUrl,
  form_success_visible: formResult,
  call_link_activated: callResult,
  booking_intent: bookingResult,
  ga_event_counts: eventCounts,
  ga_collection_events: requests.map(({ event_name }) => event_name),
  final_page_state: JSON.parse(pageState),
}, null, 2));

ws.close();
chromium.kill('SIGTERM');
