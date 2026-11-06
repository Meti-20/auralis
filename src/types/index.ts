export type DateRange = '7d' | '30d' | '90d';

export type ChartViewMode = 'weekly' | 'monthly';

export interface KPICardData {
  title: string;
  amount: number;
  formattedAmount: string;
  changePercent: number;
  isPositiveChange: boolean; // whether the change is financially favorable
  trendDirection: 'up' | 'down';
  comparisonLabel: string;
  iconType: 'income' | 'expense' | 'net' | 'balance';
  description: string;
}

export interface SummaryKPIs {
  totalIncome: KPICardData;
  totalExpenses: KPICardData;
  netCashFlow: KPICardData;
  availableBalance: KPICardData;
}

export interface CashFlowChartPoint {
  period: string; // e.g. "Oct 01-07" or "Oct"
  income: number;
  expenses: number;
  netCashFlow: number;
}

export interface ExpenseCategoryItem {
  id: string;
  name: 'Operations' | 'Marketing' | 'Salaries' | 'Software' | 'Other';
  amount: number;
  percentage: number;
  color: string;
  changePercent: number;
}

export interface DashboardTransaction {
  id: string;
  name: string;
  category: 'Operations' | 'Marketing' | 'Salaries' | 'Software' | 'Other' | 'Income';
  type: 'income' | 'expense';
  date: string;
  rawDate: string; // for sorting
  amount: number;
  status: 'Cleared' | 'Pending';
  account: string;
}

export interface AIInsightItem {
  id: string;
  title: string;
  category: 'Spending Analysis' | 'Cash Flow Observation' | 'Saving Opportunity';
  shortSummary: string;
  deepAnalysis: string;
  suggestedAction: string;
  impactMetric: string;
  impactValue: string;
  confidenceScore: number;
  badgeType: 'warning' | 'success' | 'optimization';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: 'transaction' | 'alert' | 'system';
}
