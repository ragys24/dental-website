import { spawn } from 'node:child_process';
import fs from 'node:fs';

const port = 9225;
const profile = '/tmp/uplift-live-chat-validation';
const targetUrl = 'http://127.0.0.1:3000/';
fs.rmSync(profile, { recursive: true, force: true });

const chromium = spawn('/usr/bin/chromium', [
  '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-extensions', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
  '--remote-debugging-address=127.0.0.1', `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let endpoint;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`);
    if (response.ok) { endpoint = (await response.json()).webSocketDebuggerUrl; break; }
  } catch { /* booting */ }
  await wait(250);
}
if (!endpoint) throw new Error('Chromium debugger was unavailable.');

const socket = new WebSocket(endpoint);
const pending = new Map();
let sequence = 0;
const runtimeExceptions = [];
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
  socket.addEventListener('message', ({ data }) => {
    const packet = JSON.parse(data);
    if (!packet.id || !pending.has(packet.id)) return;
    const { resolve: done, reject: fail } = pending.get(packet.id);
    pending.delete(packet.id);
    packet.error ? fail(new Error(packet.error.message)) : done(packet.result);
    if (packet.method === 'Runtime.exceptionThrown') runtimeExceptions.push(packet.params.exceptionDetails.text || 'Runtime exception');
  });
});
const send = (method, params = {}, sessionId) => {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
};
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await Promise.all([send('Page.enable', {}, sessionId), send('Runtime.enable', {}, sessionId), send('DOM.enable', {}, sessionId)]);
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);
await send('Page.navigate', { url: targetUrl }, sessionId);
await wait(16000);

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  return result.result.value;
};
const pageDiagnostics = await evaluate(`({
  url: location.href,
  title: document.title,
  readyState: document.readyState,
  rootLength: document.getElementById('root')?.innerHTML.length || 0,
  textLength: document.body?.innerText.length || 0,
  launcherPresent: Boolean(document.querySelector('[aria-label="Open Uplift Dental information guide"]')),
  liveChatResources: performance.getEntriesByType('resource').map((entry) => entry.name).filter((name) => name.includes('LiveChat')),
})`);
await evaluate(`document.querySelector('[aria-label="Open Uplift Dental information guide"]')?.click()`);
await wait(250);
await evaluate(`Array.from(document.querySelectorAll('[aria-label="Uplift Dental information guide"] button')).find((button) => button.textContent?.trim() === 'Services')?.click()`);
await wait(900);
const serviceFlow = await evaluate(`document.body.innerText.includes('Our general-information pages cover')`);
const messageExcerpt = await evaluate(`document.body.innerText.slice(-1800)`);
const chatHasForm = await evaluate(`Boolean(document.querySelector('[aria-label="Uplift Dental information guide"] form'))`);
const deltaInputResult = await evaluate(`(() => {
  const input = document.querySelector('input[aria-describedby="chat-privacy-note"]');
  if (!input) return false;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, 'Do you take Delta Dental?');
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  return true;
})()`);
await wait(500);
const deltaDentalFlow = await evaluate(`document.body.innerText.includes('Plans such as Delta Dental are common PPO plans')`);
const inputResult = await evaluate(`(() => {
  const input = document.querySelector('input[aria-describedby="chat-privacy-note"]');
  if (!input) return false;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, 'I have pain in my tooth and my number is 714-555-0100');
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  return true;
})()`);
await wait(350);
const privacyFlow = await evaluate(`({
  notice: document.body.innerText.includes('this chat does not accept personal health, insurance, or contact details'),
  refusal: document.body.innerText.includes("can't review personal health, insurance, or treatment details in chat"),
  rawSensitiveTextVisible: document.body.innerText.includes('I have pain in my tooth and my number is 714-555-0100'),
  chatBounds: (() => { const el = document.querySelector('[aria-label="Uplift Dental information guide"]'); if (!el) return null; const rect = el.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: rect.width, viewport: window.innerWidth }; })(),
})`);

console.log(JSON.stringify({ pageDiagnostics, runtimeExceptions, serviceFlow, chatHasForm, deltaInputResult, deltaDentalFlow, inputResult, privacyFlow, messageExcerpt }, null, 2));
socket.close();
chromium.kill('SIGTERM');
