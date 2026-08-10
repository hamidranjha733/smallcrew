// Serves the exported static site in out/.
//
// "next start" cannot run a project built with output: export, so this stands
// in for it. It uses only Node builtins, which keeps the dependency list at the
// six packages the project is allowed.
//
// Usage: node scripts/serve-static.mjs [port]

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'out');
const PORT = Number(process.argv[2] || process.env.PORT || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

async function resolve(urlPath) {
  // Reject anything that climbs out of out/.
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const target = path.join(ROOT, path.normalize(decoded));
  if (!target.startsWith(ROOT)) return null;

  const candidates = [target, path.join(target, 'index.html'), `${target}.html`];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate
    }
  }

  return null;
}

const server = createServer(async (req, res) => {
  let file = await resolve(req.url || '/');
  let status = 200;

  if (!file) {
    file = await resolve('/404.html');
    status = 404;
  }

  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(status, {
    'content-type': TYPES[path.extname(file)] || 'application/octet-stream',
    'cache-control': 'no-cache',
  });

  createReadStream(file).pipe(res);
});

try {
  await stat(ROOT);
} catch {
  console.error('No out/ directory. Run "npx next build" first.');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log(`Small Crew static build serving on http://localhost:${PORT}`);
});
