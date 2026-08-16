const uploadFiles = [
  '/home/ubuntu/webdev-static-assets/uplift-authentic-office/gbp-interior-upload/uplift-interior-reception-waiting-area.jpg',
  '/home/ubuntu/webdev-static-assets/uplift-authentic-office/gbp-interior-upload/uplift-interior-reception-desk.jpg',
];
const targetUrlPrefix = 'https://www.google.com/local/business/10268131085528094278/promote/photos/add';

function connectCdp(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  let sequence = 0;

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });

  return {
    ready,
    async send(method, params = {}) {
      await ready;
      const id = ++sequence;
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
  const target = targets.find((entry) => entry.type === 'page' && entry.url.startsWith(targetUrlPrefix));
  if (!target) throw new Error('Active Google Business Profile photo uploader was not found');

  const cdp = connectCdp(target.webSocketDebuggerUrl);
  try {
    const documentRoot = await cdp.send('DOM.getDocument', { depth: 2, pierce: true });
    const fileInput = await cdp.send('DOM.querySelector', {
      nodeId: documentRoot.root.nodeId,
      selector: 'input[type="file"]',
    });
    if (!fileInput.nodeId) throw new Error('Google photo file input was not found');

    await cdp.send('DOM.setFileInputFiles', { files: uploadFiles, nodeId: fileInput.nodeId });
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const pageText = await cdp.send('Runtime.evaluate', {
      expression: 'document.body.innerText',
      returnByValue: true,
    });
    console.log(JSON.stringify({ status: 'files_attached', pageText: pageText.result.value }, null, 2));
  } finally {
    cdp.close();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
