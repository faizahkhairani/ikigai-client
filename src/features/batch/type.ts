export type BatchStatus = 'active' | 'closed';

export type Batch = {
  id: string;
  name: string;
  startDate: string; // JSON kirim tanggal sebagai string ISO
  endDate: string | null;
  status: BatchStatus;
  quota: number | null;
  closedAt: string | null;
  createdAt: string;
};

export type OpenBatchPayload = {
  name: string;
  startDate: string;
  endDate?: string;
  quota?: number;
};