import { getStore } from '@netlify/blobs';

export async function getSnapshotList() {
  const zeSnapshotStore = getStore('ze_snapshots');
  const list = await zeSnapshotStore.list();
  const response = {
    keys: list?.blobs?.map((blob) => ({ name: blob })),
  };
  return new Response(JSON.stringify(response), { status: 200 });
}
