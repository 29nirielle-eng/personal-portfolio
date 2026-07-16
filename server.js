import http from 'http';
import { spawn } from 'child_process';

const PORT = 3001;
const TASK_COMMAND = `cd /home/nicole-i/International-Sports-Explorer && npm install && npm run dev -- --host 0.0.0.0 --port 5173 && sleep 3 && cat /tmp/international-sports-explorer.log && curl -I http://localhost:5173`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/run-task') {
    const child = spawn('bash', ['-lc', TASK_COMMAND], {
      detached: true,
      stdio: 'ignore',
    });

    child.unref();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'started' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`Task launcher server listening on http://127.0.0.1:${PORT}`);
});
