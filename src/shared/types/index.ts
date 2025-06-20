// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Security specific types
export interface ThreatData extends BaseEntity {
  type: 'malware' | 'phishing' | 'ddos' | 'data_breach' | 'insider_threat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  status: 'active' | 'resolved' | 'investigating';
  location?: string;
  affectedAssets?: string[];
}

export interface SecurityMetric extends BaseEntity {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  category: 'threat' | 'compliance' | 'performance' | 'financial';
}

export interface BudgetAllocation extends BaseEntity {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  roi: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface Alert extends BaseEntity {
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  type: 'security' | 'system' | 'user';
  read: boolean;
  actionRequired: boolean;
}

// UI Component types
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  enabled: boolean;
  description?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  options?: Record<string, any>;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  validation?: Record<string, any>;
}

// API Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Theme and styling types
export interface Theme {
  name: 'light' | 'dark' | 'system';
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Navigation types
export interface Breadcrumb {
  label: string;
  path?: string;
  active?: boolean;
}

// Filter and search types
export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, string | number | boolean>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    limit: number;
  };
} 