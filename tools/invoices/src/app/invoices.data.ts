export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'open' | 'overdue';
}

export const INVOICES: Invoice[] = [
  { id: 'INV-1001', customer: 'Acme Corp', amount: 12500, status: 'paid' },
  { id: 'INV-1002', customer: 'Globex', amount: 4300, status: 'open' },
  { id: 'INV-1003', customer: 'Initech', amount: 980, status: 'overdue' },
  { id: 'INV-1004', customer: 'Umbrella', amount: 22100, status: 'open' },
];
