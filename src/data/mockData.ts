export interface NodeData {
  id: string; // Account ID or Name
  type: 'Account' | 'Card';
  ip?: string;
  phone?: string;
  riskScore: number;
}

export interface LinkData {
  source: string;
  target: string;
  amount: number;
  timestamp: string; // ISO String
}

export const mockNodes: NodeData[] = [
  // Normal accounts
  { id: 'A001', type: 'Account', ip: '192.168.1.1', phone: '555-0101', riskScore: 0 },
  { id: 'A002', type: 'Account', ip: '192.168.1.2', phone: '555-0102', riskScore: 0 },
  { id: 'A003', type: 'Account', ip: '192.168.1.3', phone: '555-0103', riskScore: 0 },
  
  // High Amount Normal
  { id: 'A004', type: 'Account', ip: '192.168.1.4', phone: '555-0104', riskScore: 0 },

  // Suspicious - Split Source (S100 and targets sharing similar IPs can be a signal)
  { id: 'S100', type: 'Account', ip: '10.0.0.99', phone: '555-0999', riskScore: 0 },
  { id: 'S101', type: 'Account', ip: '10.0.0.101', phone: '555-0999', riskScore: 0 }, // Shares phone with S100!
  { id: 'S102', type: 'Account', ip: '10.0.0.102', phone: '555-0992', riskScore: 0 },
  { id: 'S103', type: 'Account', ip: '10.0.0.103', phone: '555-0993', riskScore: 0 },

  // Suspicious - Rapid Transfer Ring
  { id: 'R200', type: 'Account', ip: '172.16.0.50', phone: '555-0200', riskScore: 0 },
  { id: 'R201', type: 'Account', ip: '172.16.0.51', phone: '555-0201', riskScore: 0 },
  { id: 'R202', type: 'Account', ip: '172.16.0.52', phone: '555-0202', riskScore: 0 },

  // High Value Node
  { id: 'H300', type: 'Account', ip: '11.22.33.44', phone: '555-0300', riskScore: 0 },
  { id: 'H301', type: 'Account', ip: '11.22.33.45', phone: '555-0301', riskScore: 0 },
];

export const mockLinks: LinkData[] = [
  // Normal Link
  { source: 'A001', target: 'A002', amount: 500, timestamp: '2023-10-01T10:00:00Z' },
  { source: 'A002', target: 'A003', amount: 200, timestamp: '2023-10-01T14:30:00Z' },

  // High Amount
  { source: 'H300', target: 'H301', amount: 45000, timestamp: '2023-10-01T15:00:00Z' },

  // Splitting Behavior
  { source: 'S100', target: 'S101', amount: 9000, timestamp: '2023-10-02T10:00:00Z' },
  { source: 'S100', target: 'S102', amount: 9000, timestamp: '2023-10-02T10:01:00Z' },
  { source: 'S100', target: 'S103', amount: 9000, timestamp: '2023-10-02T10:02:00Z' },

  // Rapid Transfer (Layering)
  { source: 'R200', target: 'R201', amount: 5000, timestamp: '2023-10-03T11:00:00Z' },
  { source: 'R201', target: 'R202', amount: 4900, timestamp: '2023-10-03T11:01:30Z' } // < 2min gap
];
