export interface Status {
  userId: string;
  name: string;
  status: string;
  time?: Date;
}

export interface StatusResponse {
  statuses: Status[];
}
