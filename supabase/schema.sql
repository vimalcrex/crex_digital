-- CREX Digital - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'CUSTOMER');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');
CREATE TYPE organization_type AS ENUM ('MULTIFAMILY', 'COMMERCIAL');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING');
CREATE TYPE property_type AS ENUM ('APARTMENT', 'STUDENT_HOUSING', 'SENIOR_LIVING', 'BUILD_TO_RENT', 'OFFICE', 'RETAIL', 'INDUSTRIAL', 'MIXED_USE');
CREATE TYPE property_status AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE campaign_status AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');
CREATE TYPE campaign_goal AS ENUM ('LEASING', 'LEASE_UP', 'ACQUISITION', 'DISPOSITION', 'BRAND_AWARENESS');
CREATE TYPE ad_platform AS ENUM ('GOOGLE', 'FACEBOOK', 'LINKEDIN');
CREATE TYPE landing_page_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ORGANIZATIONS
-- ============================================================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type organization_type NOT NULL,
  website TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status subscription_status NOT NULL DEFAULT 'TRIALING',
  setup_fee_paid BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- USERS & AUTH
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMPTZ,
  password TEXT,
  name TEXT,
  image TEXT,
  role user_role NOT NULL DEFAULT 'CUSTOMER',
  status user_status NOT NULL DEFAULT 'PENDING',
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ============================================================================
-- PROPERTIES
-- ============================================================================

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type property_type NOT NULL,
  status property_status NOT NULL DEFAULT 'ACTIVE',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  units INTEGER,
  sqft INTEGER,
  year_built INTEGER,
  amenities TEXT[] DEFAULT '{}',
  description TEXT,
  lead_email TEXT,
  lead_webhook TEXT,
  website_url TEXT,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- LANDING PAGES
-- ============================================================================

CREATE TABLE landing_page_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  category TEXT NOT NULL,
  layout TEXT NOT NULL,
  default_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE landing_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  status landing_page_status NOT NULL DEFAULT 'DRAFT',
  title TEXT NOT NULL,
  headline TEXT,
  subheadline TEXT,
  hero_image TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  variants JSONB,
  active_variant TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  submissions INTEGER NOT NULL DEFAULT 0,
  template_id UUID REFERENCES landing_page_templates(id) ON DELETE SET NULL,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- ============================================================================
-- CAMPAIGNS & ADS
-- ============================================================================

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status campaign_status NOT NULL DEFAULT 'DRAFT',
  goal campaign_goal NOT NULL,
  daily_budget DECIMAL(10, 2) NOT NULL,
  total_budget DECIMAL(10, 2),
  target_locations TEXT[] DEFAULT '{}',
  target_radius INTEGER,
  target_audiences TEXT[] DEFAULT '{}',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  landing_page_id UUID REFERENCES landing_pages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ad_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform ad_platform NOT NULL,
  account_id TEXT NOT NULL,
  account_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expiry TIMESTAMPTZ,
  external_campaign_id TEXT,
  external_ad_set_id TEXT,
  external_ad_id TEXT,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(platform, campaign_id)
);

CREATE TABLE ad_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform ad_platform NOT NULL,
  date DATE NOT NULL,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  ctr DECIMAL(5, 4),
  cpc DECIMAL(10, 2),
  cpa DECIMAL(10, 2),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(campaign_id, platform, date)
);

-- ============================================================================
-- LEADS
-- ============================================================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status lead_status NOT NULL DEFAULT 'NEW',
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  move_in_date DATE,
  bedrooms INTEGER,
  budget DECIMAL(10, 2),
  source TEXT,
  medium TEXT,
  campaign TEXT,
  ad_platform ad_platform,
  forwarded_at TIMESTAMPTZ,
  forwarded_to TEXT,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  landing_page_id UUID REFERENCES landing_pages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- BILLING
-- ============================================================================

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status invoice_status NOT NULL DEFAULT 'PENDING',
  stripe_invoice_id TEXT UNIQUE,
  setup_fee DECIMAL(10, 2),
  platform_fee DECIMAL(10, 2),
  ad_spend DECIMAL(10, 2),
  total DECIMAL(10, 2) NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- AI & OPTIMIZATION
-- ============================================================================

CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  impact TEXT,
  confidence DECIMAL(3, 2),
  applied BOOLEAN NOT NULL DEFAULT FALSE,
  applied_at TIMESTAMPTZ,
  dismissed BOOLEAN NOT NULL DEFAULT FALSE,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

CREATE TABLE ab_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  variants JSONB NOT NULL DEFAULT '{}',
  traffic_split JSONB NOT NULL DEFAULT '{}',
  results JSONB,
  winner TEXT,
  status TEXT NOT NULL DEFAULT 'running',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  landing_page_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_properties_organization ON properties(organization_id);
CREATE INDEX idx_campaigns_organization ON campaigns(organization_id);
CREATE INDEX idx_campaigns_property ON campaigns(property_id);
CREATE INDEX idx_landing_pages_property ON landing_pages(property_id);
CREATE INDEX idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX idx_leads_property ON leads(property_id);
CREATE INDEX idx_leads_landing_page ON leads(landing_page_id);
CREATE INDEX idx_leads_created ON leads(created_at);
CREATE INDEX idx_ad_metrics_campaign_date ON ad_metrics(campaign_id, date);
CREATE INDEX idx_invoices_organization ON invoices(organization_id);
CREATE INDEX idx_ai_recommendations_entity ON ai_recommendations(entity_type, entity_id);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to increment landing page submissions
CREATE OR REPLACE FUNCTION increment_landing_page_submissions(page_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE landing_pages
  SET submissions = submissions + 1
  WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_landing_page_templates_updated_at BEFORE UPDATE ON landing_page_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_landing_pages_updated_at BEFORE UPDATE ON landing_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ad_accounts_updated_at BEFORE UPDATE ON ad_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON ab_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Note: You'll want to create specific RLS policies based on your access patterns
-- For now, service role key bypasses RLS for server-side operations
