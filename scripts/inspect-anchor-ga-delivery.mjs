import fs from 'node:fs';

const sessionResponsePath = '/tmp/anchor_uplift_postfix_qa.json';
const testUrl = 'https://upliftdental.com/?controlled_tracking_test=postfix-qa-20260815&utm_source=google&utm_medium=cpc&utm_campaign=event_proof&gclid=TEST-GCLID-POSTFIX-20260815';
const response = JSON.parse(fs.readFileSync(sessionResponsePath, 'utf8'));
const cdpUrl = response?.data?.cdp_url;

if (!cdpUrl) throw new Error('No CDP endpoint is available for the isolated QA session.');

const ws = new WebSocket(cdpUrl);
const pending = new Map();
const requests = [];
const trackedRequestUrls = new Map();
const googleTagRequestIds = [];
const browserLogs = [];
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
      const { resolve, reject } = pending.get(packet.id);
      pending.delete(packet.id);
      if (packet.error) reject(new Error(packet.error.message));
      else resolve(packet.result);
      return;
    }

    if (packet.method === 'Network.requestWillBeSent') {
      const url = packet.params?.request?.url || '';
      if (/google-analytics\.com\/g\/collect|googletagmanager\.com\/gtag\/js/i.test(url)) {
        trackedRequestUrls.set(packet.params.requestId, url);
        if (/googletagmanager\.com\/gtag\/js/i.test(url)) googleTagRequestIds.push(packet.params.requestId);
        requests.push({ type: 'request', url, method: packet.params?.request?.method || 'GET' });
      }
    }

    if (packet.method === 'Network.responseReceived') {
      const url = packet.params?.response?.url || '';
      if (/google-analytics\.com\/g\/collect|googletagmanager\.com\/gtag\/js/i.test(url)) {
        requests.push({ type: 'response', url, status: packet.params?.response?.status || 0 });
      }
    }

    if (packet.method === 'Network.loadingFinished' && trackedRequestUrls.has(packet.params.requestId)) {
      requests.push({ type: 'finished', url: trackedRequestUrls.get(packet.params.requestId) });
    }

    if (packet.method === 'Network.loadingFailed' && trackedRequestUrls.has(packet.params.requestId)) {
      requests.push({
        type: 'failed',
        url: trackedRequestUrls.get(packet.params.requestId),
        error: packet.params.errorText || 'unknown error',
      });
    }

    if (packet.method === 'Runtime.exceptionThrown') {
      requests.push({ type: 'runtime_exception', message: packet.params?.exceptionDetails?.text || 'runtime exception' });
    }

    if (packet.method === 'Log.entryAdded') {
      const entry = packet.params?.entry;
      if (entry?.level === 'error' || /google|content security|cookieyes/i.test(entry?.text || '')) {
        browserLogs.push({ level: entry?.level || 'unknown', text: entry?.text || '' });
      }
    }
  });
});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Network.enable', {}, sessionId);
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);
await send('Log.enable', {}, sessionId);
await send('Page.navigate', { url: testUrl }, sessionId);
await new Promise((resolve) => setTimeout(resolve, 12000));

const state = await send('Runtime.evaluate', {
  expression: `JSON.stringify({
    href: location.href,
    dataLayer: (window.dataLayer || []).map((item) => Array.from(item || [])),
    hasGoogleTag: typeof window.gtag === 'function'
  })`,
  returnByValue: true,
}, sessionId);

const gaInitialization = await send('Runtime.evaluate', {
  expression: `new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(JSON.stringify({ initialized: false })), 3000);
    window.gtag('get', 'G-PW2PJ3LD69', 'client_id', (clientId) => {
      clearTimeout(timeout);
      resolve(JSON.stringify({ initialized: Boolean(clientId), client_id_received: Boolean(clientId) }));
    });
  })`,
  awaitPromise: true,
  returnByValue: true,
}, sessionId);

const tagResponse = googleTagRequestIds.length
  ? await send('Network.getResponseBody', { requestId: googleTagRequestIds[0] }, sessionId)
  : { body: '' };

console.log(JSON.stringify({
  test_url: testUrl,
  network: requests,
  page_state: JSON.parse(state.result.value),
  ga_initialization: JSON.parse(gaInitialization.result.value),
  google_tag_response_contains_runtime: /google_tag_data|dataLayer/i.test(tagResponse.body || ''),
  browser_logs: browserLogs,
}, null, 2));

ws.close();
