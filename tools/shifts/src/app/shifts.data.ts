import { signal } from '@angular/core';

export type Shift = 'Early' | 'Late' | 'Night' | 'Off';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ROTA: Record<string, Shift[]> = {
  'Priya Shah': ['Early', 'Early', 'Late', 'Off', 'Off', 'Early', 'Early'],
  'Tom Becker': ['Late', 'Late', 'Off', 'Early', 'Early', 'Off', 'Late'],
  'Ana Costa': ['Night', 'Night', 'Night', 'Off', 'Off', 'Late', 'Late'],
  'Sam Okafor': ['Off', 'Early', 'Early', 'Late', 'Late', 'Night', 'Off'],
};

export interface SwapRequest {
  id: number;
  from: string;
  to: string;
  day: string;
  status: 'pending' | 'approved' | 'declined';
}

/** Lives in the tool, so it survives tab switches but not a reload. */
export const SWAP_REQUESTS = signal<SwapRequest[]>([
  { id: 1, from: 'Tom Becker', to: 'Sam Okafor', day: 'Thu', status: 'pending' },
  { id: 2, from: 'Ana Costa', to: 'Priya Shah', day: 'Sat', status: 'pending' },
]);
