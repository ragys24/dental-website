const [mode = 'mobile', pagePath = 'gallery'] = process.argv.slice(2);
const pagePrefix = `https://3000-iccwxpz249gvvvo3pfknt-1e2c1e90.us2.manus.computer/${pagePath}`;

function connect(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  let nextId = 0;
  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  return {
    async send(method, params = {}) {
      await ready;
      const id = ++nextId;
      const result = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
      socket.send(JSON.stringify({ id, method, params }));
      return result;
    },
    close() {
      socket.close();
    },
  };
}

async function main() {
  const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const target = targets.find((entry) => entry.type === 'page' && entry.url.startsWith(pagePrefix));
  if (!target) throw new Error(`Preview target for /${pagePath} was not found`);

  const cdp = connect(target.webSocketDebuggerUrl);
  try {
    if (mode === 'reset') {
      await cdp.send('Emulation.clearDeviceMetricsOverride');
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
      console.log('desktop viewport restored');
      return;
    }
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    console.log('mobile viewport set to 390x844');
  } finally {
    cdp.close();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
