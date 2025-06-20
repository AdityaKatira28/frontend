export interface ThreatData {
  // Define the structure of threat data
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  // Add other fields as needed
}

export interface BudgetData {
  // Define the structure of budget data
  allocated: number;
  used: number;
  remaining: number;
  // Add other fields as needed
}

export interface QueryResult {
  // Define the structure of query results
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}

export interface LoadingState {
  threats: boolean;
  budget: boolean;
  query: boolean;
}
