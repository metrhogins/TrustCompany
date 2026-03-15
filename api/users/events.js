// api/task/events.js
// Server-Sent Events endpoint for real-time step notifications.
//
// NOTE: Vercel Edge Functions support streaming but NOT long-lived persistent connections
// in the same way Node.js does. Each invocation is stateless — there is no shared in-memory
// Map between requests (no sseClients Map).
//
// Pattern used here: the client polls this endpoint with ?token=<t> and receives a single
// "connected" event immediately. For actual step notifications the recommended approach on
// Vercel is to use an external pub/sub service (e.g. Pusher, Ably, Upstash Redis pub/sub)
// or poll a status endpoint. This file preserves the original interface so the frontend
// code requires no changes, and emits a connected event as a heartbeat.

export const config = { runtime: 'edge' };

import { urlParams, CORS } from './_lib.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  const token = urlParams(req).get('token');
  if (!token) {
    return new Response('Missing token', { status: 400, headers: CORS });
  }

  // Stream a single "connected" event and keep alive with heartbeat comments
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const enc    = new TextEncoder();

  // Fire initial connected event
  writer.write(enc.encode('data: connected\n\n'));

  // Heartbeat every 25 s to keep the connection alive through proxies
  // (Vercel Edge Functions have a max duration — this will close naturally)
  const interval = setInterval(() => {
    writer.write(enc.encode(': heartbeat\n\n')).catch(() => clearInterval(interval));
  }, 25_000);

  // Clean up when client disconnects
  req.signal?.addEventListener('abort', () => {
    clearInterval(interval);
    writer.close().catch(() => {});
  });

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection:      'keep-alive',
      ...CORS,
    },
  });
}
