import type { Context, Config } from '@netlify/edge-functions';
import { getStore, type Store } from '@netlify/blobs';

export default async (request: Request, context: Context) => {
  const store: Store = await getStore('my-store');

  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return new Response('No key provided', { status: 400 });
  }

  try {
    switch (request.method) {
      case 'POST':
        const body = await request.json();
        await store.setJSON(key, body);
        return new Response('Blob successfully stored', { status: 200 });
      case 'GET':
        const value = await store.get(key);
        return new Response(JSON.stringify(value), { status: 200 });
      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
};

export const config: Config = {
  path: '/*',
};
