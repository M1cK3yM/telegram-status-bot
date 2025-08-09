import { Status, StatusResponse } from "@shared/types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchLatestStatuses(): Promise<Status[]> {
  const res = await fetch(`${BASE_URL}/latest`);
  if (!res.ok) throw new Error('Failed to fetch statuses');
  const data: StatusResponse = await res.json();
  return data.statuses;
}

export async function postStatus(statusData: {
  userId: string;
  name: string;
  status: string;
}): Promise<void> {
  const res = await fetch(`${BASE_URL}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statusData),
  });
  if (!res.ok) throw new Error('Failed to post status');
}
