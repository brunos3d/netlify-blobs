import type { Context, Config } from '@netlify/edge-functions';
import { getStore, type Store } from '@netlify/blobs';

import { postUploadSnapshot } from '../../routes/postUploadSnapshot.ts';
import { getSnapshotList } from '../../routes/getSnapshotList.ts';

export default async (request: Request, context: Context) => {
  try {
    switch (request.method) {
      case 'POST':
        return postUploadSnapshot(request);
      case 'GET':
        return getSnapshotList();
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
