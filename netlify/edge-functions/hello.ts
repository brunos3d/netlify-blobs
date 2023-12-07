import type { Context, Config } from '@netlify/edge-functions';
import { getStore, type Store } from '@netlify/blobs';

export default async (request: Request, context: Context) => {
  try {
    const store: Store = await getStore('my-store');

    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return new Response('No key provided', { status: 400 });
    }

    switch (request.method) {
      case 'POST':
        const body = await request.json();
        await store.setJSON(key, body);
        return new Response('Blob successfully stored', { status: 200 });
      case 'GET':
        const value = await store.get(key);
        return new Response(value, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (e) {
    console.error(e);
    return new Response('Internal Error', { status: 500 });
  }
};

export const config: Config = {
  path: '/*',
};
