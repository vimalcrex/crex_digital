// Supabase Database Types
// These types mirror the database schema

export type UserRole = "ADMIN" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";
export type OrganizationType = "MULTIFAMILY" | "COMMERCIAL";
export type SubscriptionStatus = "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING";
export type PropertyType =
  | "APARTMENT"
  | "STUDENT_HOUSING"
  | "SENIOR_LIVING"
  | "BUILD_TO_RENT"
  | "OFFICE"
  | "RETAIL"
  | "INDUSTRIAL"
  | "MIXED_USE";
export type PropertyStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";
export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
export type CampaignGoal =
  | "LEASING"
  | "LEASE_UP"
  | "ACQUISITION"
  | "DISPOSITION"
  | "BRAND_AWARENESS";
export type AdPlatform = "GOOGLE" | "FACEBOOK" | "LINKEDIN";
export type LandingPageStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST";
export type InvoiceStatus = "DRAFT" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          email_verified: string | null;
          password: string | null;
          name: string | null;
          image: string | null;
          role: UserRole;
          status: UserStatus;
          organization_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      accounts: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          provider: string;
          provider_account_id: string;
          refresh_token: string | null;
          access_token: string | null;
          expires_at: number | null;
          token_type: string | null;
          scope: string | null;
          id_token: string | null;
          session_state: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["accounts"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["accounts"]["Insert"]>;
      };
      sessions: {
        Row: {
          id: string;
          session_token: string;
          user_id: string;
          expires: string;
        };
        Insert: Omit<Database["public"]["Tables"]["sessions"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["sessions"]["Insert"]>;
      };
      verification_tokens: {
        Row: {
          identifier: string;
          token: string;
          expires: string;
        };
        Insert: Database["public"]["Tables"]["verification_tokens"]["Row"];
        Update: Partial<Database["public"]["Tables"]["verification_tokens"]["Insert"]>;
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          type: OrganizationType;
          website: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          subscription_status: SubscriptionStatus;
          setup_fee_paid: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["organizations"]["Row"], "id" | "created_at" | "updated_at" | "subscription_status" | "setup_fee_paid"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          subscription_status?: SubscriptionStatus;
          setup_fee_paid?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
      };
      properties: {
        Row: {
          id: string;
          name: string;
          type: PropertyType;
          status: PropertyStatus;
          address: string;
          city: string;
          state: string;
          zip: string;
          latitude: number | null;
          longitude: number | null;
          units: number | null;
          sqft: number | null;
          year_built: number | null;
          amenities: string[];
          description: string | null;
          lead_email: string | null;
          lead_webhook: string | null;
          website_url: string | null;
          organization_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["properties"]["Row"], "id" | "created_at" | "updated_at" | "status"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: PropertyStatus;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          name: string;
          status: CampaignStatus;
          goal: CampaignGoal;
          daily_budget: number;
          total_budget: number | null;
          target_locations: string[];
          target_radius: number | null;
          target_audiences: string[];
          start_date: string | null;
          end_date: string | null;
          organization_id: string;
          property_id: string;
          landing_page_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at" | "updated_at" | "status"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: CampaignStatus;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
      ad_accounts: {
        Row: {
          id: string;
          platform: AdPlatform;
          account_id: string;
          account_name: string | null;
          access_token: string | null;
          refresh_token: string | null;
          token_expiry: string | null;
          external_campaign_id: string | null;
          external_ad_set_id: string | null;
          external_ad_id: string | null;
          campaign_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ad_accounts"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["ad_accounts"]["Insert"]>;
      };
      ad_metrics: {
        Row: {
          id: string;
          platform: AdPlatform;
          date: string;
          impressions: number;
          clicks: number;
          spend: number;
          conversions: number;
          ctr: number | null;
          cpc: number | null;
          cpa: number | null;
          campaign_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ad_metrics"]["Row"], "id" | "created_at" | "impressions" | "clicks" | "spend" | "conversions"> & {
          id?: string;
          created_at?: string;
          impressions?: number;
          clicks?: number;
          spend?: number;
          conversions?: number;
        };
        Update: Partial<Database["public"]["Tables"]["ad_metrics"]["Insert"]>;
      };
      landing_page_templates: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          thumbnail: string | null;
          category: string;
          layout: string;
          default_data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["landing_page_templates"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["landing_page_templates"]["Insert"]>;
      };
      landing_pages: {
        Row: {
          id: string;
          slug: string;
          status: LandingPageStatus;
          title: string;
          headline: string | null;
          subheadline: string | null;
          hero_image: string | null;
          content: Record<string, unknown>;
          meta_title: string | null;
          meta_description: string | null;
          variants: Record<string, unknown> | null;
          active_variant: string | null;
          views: number;
          submissions: number;
          template_id: string | null;
          property_id: string;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["landing_pages"]["Row"], "id" | "created_at" | "updated_at" | "status" | "views" | "submissions"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: LandingPageStatus;
          views?: number;
          submissions?: number;
        };
        Update: Partial<Database["public"]["Tables"]["landing_pages"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          status: LeadStatus;
          first_name: string | null;
          last_name: string | null;
          email: string;
          phone: string | null;
          message: string | null;
          move_in_date: string | null;
          bedrooms: number | null;
          budget: number | null;
          source: string | null;
          medium: string | null;
          campaign: string | null;
          ad_platform: AdPlatform | null;
          forwarded_at: string | null;
          forwarded_to: string | null;
          property_id: string;
          landing_page_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "updated_at" | "status"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: LeadStatus;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      invoices: {
        Row: {
          id: string;
          status: InvoiceStatus;
          stripe_invoice_id: string | null;
          setup_fee: number | null;
          platform_fee: number | null;
          ad_spend: number | null;
          total: number;
          period_start: string;
          period_end: string;
          paid_at: string | null;
          organization_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["invoices"]["Row"], "id" | "created_at" | "updated_at" | "status"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: InvoiceStatus;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      ai_recommendations: {
        Row: {
          id: string;
          type: string;
          title: string;
          description: string;
          data: Record<string, unknown>;
          impact: string | null;
          confidence: number | null;
          applied: boolean;
          applied_at: string | null;
          dismissed: boolean;
          entity_type: string;
          entity_id: string;
          created_at: string;
          expires_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["ai_recommendations"]["Row"], "id" | "created_at" | "applied" | "dismissed"> & {
          id?: string;
          created_at?: string;
          applied?: boolean;
          dismissed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["ai_recommendations"]["Insert"]>;
      };
      ab_tests: {
        Row: {
          id: string;
          name: string;
          variants: Record<string, unknown>;
          traffic_split: Record<string, unknown>;
          results: Record<string, unknown> | null;
          winner: string | null;
          status: string;
          started_at: string;
          ended_at: string | null;
          landing_page_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ab_tests"]["Row"], "id" | "created_at" | "updated_at" | "status" | "started_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: string;
          started_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["ab_tests"]["Insert"]>;
      };
    };
  };
}

// Convenience type aliases
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
export type LandingPage = Database["public"]["Tables"]["landing_pages"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type AdMetric = Database["public"]["Tables"]["ad_metrics"]["Row"];
export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type AIRecommendation = Database["public"]["Tables"]["ai_recommendations"]["Row"];
