// Mock data for development and testing

export const mockThreatData = {
  severity: 'HIGH',
  confidence: 0.92,
  activeThreats: [
    { id: 't1', name: 'Credential Stuffing', severity: 'HIGH' },
    { id: 't2', name: 'Phishing', severity: 'MEDIUM' },
    { id: 't3', name: 'Ransomware', severity: 'CRITICAL' },
  ],
  lastUpdated: new Date().toISOString(),
};

export const mockBudgetData = {
  totalBudget: 250000,
  usedBudget: 187500,
  remainingBudget: 62500,
  allocations: {
    'MFA': 45000,
    'WAF': 35000,
    'Patching': 40000,
    'Backup': 30000,
    'Training': 20000,
    'Monitoring': 17500,
  },
  roi: 1.8,
  lastUpdated: new Date().toISOString(),
};
