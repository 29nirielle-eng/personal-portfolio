const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const workspaceRoot = '/home/nicole-i/myyy-first-webpage';
const targetProject = '/home/nicole-i/International-Sports-Explorer';
const port = process.env.PORT || 3000;

let viteProcess = null;
let viteStarting = false;

function startVite() {
  if (viteProcess || viteStarting) return;

  viteStarting = true;
  console.log('Starting International Sports Explorer preview...');

  viteProcess = spawn('npm', ['run', 'dev', '--', '--host', '0.0.0.0', '--port', '5173'], {
    cwd: targetProject,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
  });

  viteProcess.stdout.on('data', (data) => {
    process.stdout.write(`[vite] ${data}`);
  });

  viteProcess.stderr.on('data', (data) => {
    process.stderr.write(`[vite] ${data}`);
  });

  viteProcess.on('exit', (code) => {
    console.log(`Vite process exited with code ${code}`);
    viteProcess = null;
    viteStarting = false;
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  startVite();

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = requestPath.split('?')[0];
  const filePath = path.join(workspaceRoot, safePath.replace(/^\//, ''));

  if (!filePath.startsWith(workspaceRoot)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType(filePath) });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  startVite();
  console.log(`Local preview server running at http://127.0.0.1:${port}/index.html`);
});
