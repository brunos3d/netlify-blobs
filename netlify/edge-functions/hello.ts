import type { Context, Config } from '@netlify/edge-functions';
import { getStore, type Store } from '@netlify/blobs';

export default async (request: Request, context: Context) => {
  const store: Store = await getStore('my-store');

  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return new Response('No key provided', { status: 400 });
  }

  switch (request.method) {
    case 'POST':
      await store.setJSON(key, request.json());
      break;
    case 'GET':
      const value = await store.get(key);
      return new Response(JSON.stringify(value), { status: 200 });
    default:
      return new Response('Method not allowed', { status: 405 });
  }
};

export const config: Config = {
  path: '/*',
};
