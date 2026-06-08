import http from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Load .env.local manually (no dotenv dep needed)
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
} catch {
  // no .env.local
}

const PORT = 3000;

// Lazily import handler after env is loaded
const { default: chatHandler } = await import('../api/chat.ts');

function buildVercelReq(req: http.IncomingMessage, body: Buffer) {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const searchParams: Record<string, string> = {};
  url.searchParams.forEach((v, k) => { searchParams[k] = v; });

  let parsedBody: unknown;
  try { parsedBody = JSON.parse(body.toString()); } catch { parsedBody = {}; }

  return Object.assign(req, {
    body: parsedBody,
    query: searchParams,
    cookies: {},
  });
}

function buildVercelRes(res: http.ServerResponse) {
  const origSetHeader = res.setHeader.bind(res);
  const origEnd = res.end.bind(res);
  const origWrite = res.write.bind(res);

  return Object.assign(res, {
    status(code: number) { res.statusCode = code; return this; },
    json(data: unknown) {
      origSetHeader('Content-Type', 'application/json');
      origEnd(JSON.stringify(data));
      return this;
    },
    send(data: string | Buffer) {
      origEnd(data);
      return this;
    },
    setHeader(key: string, value: string | string[]) {
      origSetHeader(key, value);
      return this;
    },
    end(data?: unknown) {
      origEnd(data as Parameters<typeof origEnd>[0]);
      return this;
    },
    write(chunk: unknown) {
      if (!res.headersSent) {
        res.writeHead(res.statusCode || 200);
      }
      const ok = origWrite(chunk);
      // Force flush for SSE — Node.js may buffer otherwise
      (res.socket as NodeJS.Socket & { flush?: () => void })?.flush?.();
      return ok;
    },
  });
}

const server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const vReq = buildVercelReq(req, body) as Parameters<typeof chatHandler>[0];
    const vRes = buildVercelRes(res) as Parameters<typeof chatHandler>[1];
    chatHandler(vReq, vRes);
  });
});

server.listen(PORT, () => {
  console.log(`[dev-api] API server ready at http://localhost:${PORT}`);
});
