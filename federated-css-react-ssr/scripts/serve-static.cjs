const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const portIndex = args.indexOf('--port');

const rootDir = path.resolve(dirIndex >= 0 ? args[dirIndex + 1] : 'dist');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const sendResponse = (res, statusCode, headers, body) => {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    ...headers,
  });
  if (res.req.method === 'HEAD') {
    res.end();
  } else {
    res.end(body);
  }
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);
  let filePath = path.join(rootDir, pathname);

  if (!filePath.startsWith(rootDir)) {
    sendResponse(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
    return;
  }

  const tryFile = (targetPath) => {
    fs.stat(targetPath, (err, stat) => {
      if (err) {
        sendResponse(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found');
        return;
      }
      if (stat.isDirectory()) {
        tryFile(path.join(targetPath, 'index.html'));
        return;
      }
      const ext = path.extname(targetPath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const stream = fs.createReadStream(targetPath);
      stream.pipe(res);
      stream.on('error', () => {
        sendResponse(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Server error');
      });
    });
  };

  if (pathname === '/' || pathname === '') {
    tryFile(path.join(rootDir, 'index.html'));
    return;
  }

  tryFile(filePath);
});

server.listen(port, () => {
  console.log(`[static] serving ${rootDir} on http://localhost:${port}`);
});
