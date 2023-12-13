import { getStore } from '@netlify/blobs';

interface SnapshotTemp {
  id: string;
  assets: Record<string, any>;
  message: string;
}

export async function postUploadSnapshot(request: Request) {
  const newSnapshot = (await request.json()) as SnapshotTemp;

  console.log('snapshot', newSnapshot);

  const zeSnapshotsStore = getStore('ze_snapshots');

  console.log('before setJSON');

  await zeSnapshotsStore.setJSON(newSnapshot.id, newSnapshot);

  console.log('after setJSON');

  return new Response('Blob successfully stored', { status: 200 });
}
