export enum UserRole {
  EXECUTIVE = 'EXECUTIVE',
  RELATIONSHIP_MANAGER = 'RELATIONSHIP_MANAGER',
  INVESTOR = 'INVESTOR',
}

export enum AssetType {
  MULTIFAMILY = 'Multifamily',
  RETAIL = 'Retail',
  HOSPITALITY = 'Hospitality',
  LAND = 'Land',
}

export enum DealStage {
  SOURCING = 'Sourcing',
  UNDERWRITING = 'Underwriting',
  DUE_DILIGENCE = 'Due Diligence',
  CLOSED = 'Closed',
}

export interface Project {
  id: string;
  name: string;
  type: AssetType;
  location: string;
  purchaseDate: string;
  totalCap: number;
  status: 'Active' | 'Sold' | 'Construction';
  irr: number;
  equityMultiple: number;
  constructionProgress?: number; // 0-100 for Procore integration
}

export interface Investor {
  id: string;
  name: string;
  totalInvested: number;
  activeDeals: number;
  riskScore: number; // 0-100, calculated by AI
  lastInteraction: string;
  email: string;
}

export interface FinancialMetric {
  name: string;
  value: number;
  trend: number; // Percentage change
}

export interface IntegrationStatus {
  service: 'QuickBooks' | 'AppFolio' | 'Procore' | 'CoStar';
  connected: boolean;
  lastSync: string;
  entitiesSynced: number;
}

export interface ScenarioInputs {
  purchasePrice: number;
  exitCapRate: number;
  rentGrowth: number;
  interestRate: number;
  holdPeriod: number;
  capexBudget: number;
}

export interface DocTemplate {
  id: string;
  name: string;
  category: 'Legal' | 'Financial' | 'Update';
  lastModified: string;
}
