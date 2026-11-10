export interface Person {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
}

export const PEOPLE: Person[] = [
  { id: 'u-1', name: 'Alex Example', role: 'Platform Engineer', department: 'Engineering', location: 'Berlin', email: 'alex@example.com' },
  { id: 'u-2', name: 'Priya Shah', role: 'Warehouse Lead', department: 'Operations', location: 'Hamburg', email: 'priya@example.com' },
  { id: 'u-3', name: 'Tom Becker', role: 'Controller', department: 'Finance', location: 'Berlin', email: 'tom@example.com' },
  { id: 'u-4', name: 'Ana Costa', role: 'Night Supervisor', department: 'Operations', location: 'Lisbon', email: 'ana@example.com' },
  { id: 'u-5', name: 'Sam Okafor', role: 'HR Partner', department: 'People', location: 'London', email: 'sam@example.com' },
  { id: 'u-6', name: 'Mei Lin', role: 'Product Designer', department: 'Engineering', location: 'Remote', email: 'mei@example.com' },
];

export const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).join('').slice(0, 2);
