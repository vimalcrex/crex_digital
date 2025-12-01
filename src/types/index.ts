// Re-export database types
export type {
  User,
  Organization,
  Property,
  Campaign,
  LandingPage,
  Lead,
  AdMetric,
  Invoice,
  AIRecommendation,
  UserRole,
  UserStatus,
  OrganizationType,
  SubscriptionStatus,
  PropertyType,
  PropertyStatus,
  CampaignStatus,
  CampaignGoal,
  AdPlatform,
  LandingPageStatus,
  LeadStatus,
  InvoiceStatus,
} from "./database";

// Extended types with relations
import type {
  User,
  Organization,
  Property,
  Campaign,
  LandingPage,
  Lead,
  AdMetric,
} from "./database";

export type UserWithOrganization = User & {
  organization: Organization | null;
};

export type OrganizationWithRelations = Organization & {
  users: User[];
  properties: Property[];
  campaigns: Campaign[];
};

export type PropertyWithRelations = Property & {
  organization: Organization;
  campaigns: Campaign[];
  landingPages: LandingPage[];
  leads: Lead[];
};

export type CampaignWithRelations = Campaign & {
  organization: Organization;
  property: Property;
  landingPage: LandingPage | null;
  adMetrics: AdMetric[];
};

export type LandingPageWithRelations = LandingPage & {
  property: Property;
  leads: Lead[];
};

// Dashboard metrics types
export interface DashboardMetrics {
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  avgCtr: number;
  avgCpc: number;
  avgCpa: number;
}

export interface SpendByPlatform {
  platform: "GOOGLE" | "FACEBOOK" | "LINKEDIN";
  spend: number;
  conversions: number;
}

export interface MetricsTrend {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

// Landing page content types
export interface LandingPageContent {
  sections: ContentSection[];
  styles: ContentStyles;
}

export interface ContentSection {
  id: string;
  type: "hero" | "features" | "gallery" | "testimonials" | "cta" | "form" | "amenities";
  data: Record<string, unknown>;
  order: number;
}

export interface ContentStyles {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonStyle: "rounded" | "square" | "pill";
}

// Lead form types
export interface LeadFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  moveInDate?: string;
  bedrooms?: number;
  budget?: number;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// AI Recommendation types
export interface BudgetRecommendation {
  campaignId: string;
  currentBudget: number;
  recommendedBudget: number;
  reason: string;
  expectedImpact: string;
}

export interface CreativeRecommendation {
  adId: string;
  issue: "fatigue" | "low_ctr" | "low_conversion";
  suggestion: string;
}

export interface AudienceRecommendation {
  type: "expand" | "restrict";
  segment: string;
  reason: string;
}
