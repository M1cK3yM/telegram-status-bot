import { Status } from "@shared/types";

let statuses: Status[] = [];

export function addStatus(status: Status) {
  statuses.unshift({ ...status, time: new Date() });
  statuses = statuses.slice(0, 50);
}

export function getLatestStatuses(): Status[] {
  return statuses.slice(0, 3);
}

export function getLatestStatusForUser(userId: string): Status[] {
  return statuses.filter(s => s.userId === userId).slice(0, 3);
}
