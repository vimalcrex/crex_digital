# CREX Digital

A targeted digital marketing platform for multi-family apartments and commercial real estate brokerages.

## Overview

CREX Digital provides intelligent, targeted marketing solutions for the real estate industry, specializing in:

- **Multi-Family Apartments** - Leasing campaigns to fill vacancies
- **Commercial Brokerages** - Marketing for acquisitions and dispositions

The platform integrates with major advertising networks to deliver high-converting campaigns with full transparency on spend and performance.

## Core Features

### Ad Platform Integrations
- **Google Ads** - Search, Display, and YouTube campaigns
- **Facebook/Meta Ads** - Feed, Stories, and Marketplace placements
- **LinkedIn Ads** - B2B targeting for commercial properties

### Customer Dashboard
- Real-time ad spend tracking across all platforms
- Conversion rate analytics and reporting
- Campaign performance metrics
- ROI tracking and attribution

### Landing Page Builder
- Property-specific landing pages
- Template-based creative system
- Mobile-responsive designs
- A/B testing capabilities
- Lead capture forms that forward directly to owner/property management websites

### Lead Routing
- Direct lead forwarding to client websites
- No CRM lock-in - leads go straight to the property owner or management company
- Webhook integrations for real-time lead delivery

### Authentication & Access Control

**Admin Portal**
- Internal team access for CREX Digital staff
- Customer account management and onboarding
- Campaign setup and configuration
- Template management and creation
- Billing administration
- Platform-wide analytics and reporting

**Customer Portal**
- Secure login for property owners/managers
- View-only access to their campaigns and spend
- Dashboard with performance metrics
- Landing page preview and approval
- Billing history and invoices
- Lead activity logs

## Pricing Model

| Component | Price |
|-----------|-------|
| Platform Setup | $1,500 (one-time) |
| Monthly Platform Fee | TBD |
| Ad Spend | Pass-through (client pays actual ad costs) |

- All billing processed via Stripe
- Monthly fees charged in advance
- Transparent ad spend with no markup

## Target Customers

### Multi-Family Properties
- Apartment communities
- Student housing
- Senior living facilities
- Build-to-rent communities

### Commercial Real Estate
- Office leasing
- Retail spaces
- Industrial properties
- Investment sales (acquisitions & dispositions)

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CREX Digital Platform                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Google Ads  │  │ Facebook Ads │  │ LinkedIn Ads │          │
│  │  Integration │  │  Integration │  │  Integration │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └────────────────┬┴─────────────────┘                   │
│                          │                                      │
│                          ▼                                      │
│         ┌────────────────────────────────┐                      │
│         │     Campaign Management        │                      │
│         │     & Analytics Engine         │                      │
│         └────────────────┬───────────────┘                      │
│                          │                                      │
│         ┌────────────────┼────────────────┐                     │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Customer   │  │  Landing    │  │   Billing   │             │
│  │  Dashboard  │  │   Pages     │  │  (Stripe)   │             │
│  └─────────────┘  └──────┬──────┘  └─────────────┘             │
│                          │                                      │
│                          ▼                                      │
│                   ┌─────────────┐                               │
│                   │ Lead Router │                               │
│                   │ (to client  │                               │
│                   │  websites)  │                               │
│                   └─────────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## AI-Powered Optimization Engine

CREX Digital uses machine learning to continuously optimize ad performance and landing page conversions based on real-time data from all campaigns.

### Data Pipeline (Fivetran → Data Warehouse)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Google Ads  │────▶│             │     │             │     │    CREX     │
├─────────────┤     │  Fivetran   │────▶│  Snowflake  │────▶│     AI      │
│ Facebook Ads│────▶│  Connectors │     │  Warehouse  │     │   Engine    │
├─────────────┤     │             │     │             │     │             │
│ LinkedIn Ads│────▶│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Fivetran Connectors:**
- Google Ads Connector - Campaign, ad group, keyword, and conversion data
- Facebook Ads Connector - Ad insights, creative performance, audience data
- LinkedIn Ads Connector - B2B campaign metrics and lead data
- Unified schema via `dbt_ad_reporting` package for cross-platform analysis

**Data Sync Schedule:**
- Ad performance data: Every 6 hours
- Conversion data: Real-time via webhooks + hourly batch
- Creative assets: Daily sync

### AI Ad Optimization

**Smart Budget Allocation:**
- ML model predicts conversion likelihood by campaign, ad set, and creative
- Automatically shifts budget to highest-performing combinations
- Daily rebalancing based on 7-day rolling performance window

**Audience Optimization:**
- Analyzes which demographics, locations, and interests convert best
- Recommends audience expansions or restrictions
- Identifies high-intent renters using behavioral signals

**Creative Performance Scoring:**
- Scores ad creatives (headlines, images, CTAs) based on historical performance
- Recommends top-performing creative combinations
- Flags underperforming ads for refresh

**Bid Optimization:**
- Integrates with platform smart bidding (Google tROAS, Meta Advantage+)
- Provides first-party conversion data via Conversions API for better ML training
- Recommends bid adjustments based on property-specific conversion patterns

### AI Landing Page Optimization

**Dynamic Personalization:**
- Customizes landing page content based on:
  - Traffic source (Google vs Facebook vs LinkedIn)
  - Geographic location (neighborhood-specific content)
  - Device type (mobile-optimized layouts)
  - Time of day (showing relevant amenities)
- Personalized CTAs can increase conversions by up to 42%

**Smart A/B Testing:**
- Multi-armed bandit algorithm for real-time traffic allocation
- Tests headlines, images, layouts, and form fields simultaneously
- Automatically promotes winning variants without manual intervention
- Expected lift: 20-35% improvement in conversion rates

**Friction Detection:**
- Identifies where visitors drop off in the conversion funnel
- Analyzes form completion rates and abandonment points
- Recommends UX improvements to reduce bounce rates

### Continuous Learning Feedback Loop

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     CREX AI Optimization Loop                            │
│                                                                          │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│   │  Serve  │───▶│ Collect │───▶│  Train  │───▶│ Deploy  │──┐          │
│   │   Ads   │    │  Data   │    │  Model  │    │  Model  │  │          │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘  │          │
│        ▲                                                     │          │
│        └─────────────────────────────────────────────────────┘          │
│                                                                          │
│   Every interaction teaches the model something new                      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Model Training Cycle:**
1. **Data Collection** - Fivetran syncs ad data to warehouse every 6 hours
2. **Feature Engineering** - Extract signals: CTR, CPC, conversion rate, time-to-convert
3. **Model Update** - Warm-start from previous checkpoint, batch update with new data
4. **Validation** - Compare predictions against holdout set
5. **Deployment** - Roll out to production if performance improves
6. **Monitoring** - Track prediction accuracy, trigger retraining if drift detected

**Key ML Models:**
| Model | Purpose | Update Frequency |
|-------|---------|------------------|
| Budget Allocator | Distribute spend across campaigns | Daily |
| Conversion Predictor | Score lead quality | Every 6 hours |
| Creative Ranker | Rank ad creative effectiveness | Weekly |
| Landing Page Optimizer | Select best page variant per visitor | Real-time |

**Real Estate-Specific Signals:**
- Seasonal leasing trends (back-to-school, spring move-in)
- Local market occupancy rates
- Neighborhood demographic data
- Property amenity preferences by audience segment

### Optimization Dashboard (Admin)

**AI Insights Panel:**
- "Budget is 40% allocated to underperforming ad sets - recommend rebalance"
- "Creative fatigue detected on Campaign X - refresh images"
- "Landing page variant B outperforming by 23% - promote to 100%"
- "High-intent audience segment identified in ZIP 75201"

**Automated Actions:**
- One-click apply AI recommendations
- Schedule automatic optimizations (with approval workflow)
- Set guardrails (min/max spend limits, brand safety)

## Planned Tech Stack

### Frontend
- Next.js / React
- TypeScript
- Tailwind CSS
- Dashboard charting library (Recharts/Chart.js)

### Backend
- Node.js / Python
- PostgreSQL database
- Redis for caching
- Job queue for async processing

### Integrations
- Google Ads API
- Meta Marketing API
- LinkedIn Marketing API
- Stripe Billing API
- Webhook delivery system

### Data & AI Stack
- **Fivetran** - ELT connectors for ad platform data
- **Snowflake** - Cloud data warehouse
- **dbt** - Data transformation (`dbt_ad_reporting` package)
- **Python** - ML model training (scikit-learn, XGBoost)
- **MLflow** - Model versioning and deployment tracking
- **Redis** - Real-time feature store for landing page personalization

### Infrastructure (Render)
- **Web Service** - Next.js application
- **PostgreSQL** - Managed database
- **Redis** - Managed caching layer
- **Background Workers** - Async job processing
- **Static Sites** - Landing page hosting with global CDN
- **Cron Jobs** - Scheduled tasks (reporting, sync)
- SSL/TLS included on all services

### Authentication
- NextAuth.js / Auth0 for identity management
- Role-based access control (RBAC)
- JWT tokens for API authentication
- SSO support for enterprise customers

## Deployment (Render)

All services hosted on [Render](https://render.com) for unified management and billing.

### Render Services

| Service | Type | Branch | Purpose |
|---------|------|--------|---------|
| `crex-web` | Web Service | `main` | Next.js app (admin + customer portals) |
| `crex-worker` | Background Worker | `main` | Async jobs (ad sync, reports) |
| `crex-db` | PostgreSQL | - | Primary database |
| `crex-redis` | Redis | - | Caching & job queues |
| `crex-landing` | Static Site | `main` | Landing page templates |

### Environments

| Environment | Render Project | URL | Branch |
|-------------|----------------|-----|--------|
| Production | crex-prod | crexdigital.com | `main` |
| Staging | crex-staging | staging.crexdigital.com | `staging` |

### CI/CD Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Push to   │────▶│   Render    │────▶│   Build &   │────▶│   Deploy    │
│    main     │     │   Webhook   │     │    Test     │     │    Live     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

- **Auto-deploy on push to `main`** - Render deploys automatically via GitHub integration
- Preview environments for pull requests
- Zero-downtime deployments
- Automatic rollback on failed health checks
- Database migrations via release command

### Environment Variables (Render Dashboard)

```
# Database
DATABASE_URL=              # Auto-set by Render
REDIS_URL=                 # Auto-set by Render

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Ad Platforms
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_DEVELOPER_TOKEN=
META_APP_ID=
META_APP_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Billing
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

# Data Pipeline
FIVETRAN_API_KEY=
FIVETRAN_API_SECRET=
SNOWFLAKE_ACCOUNT=
SNOWFLAKE_USER=
SNOWFLAKE_PASSWORD=
SNOWFLAKE_DATABASE=
SNOWFLAKE_WAREHOUSE=

# ML Pipeline
MLFLOW_TRACKING_URI=
```

### Render Blueprint (render.yaml)

Infrastructure as code - all services defined in `render.yaml` for one-click setup.

### Deployment Checklist
- [ ] Render account created and team invited
- [ ] GitHub repo connected to Render
- [ ] Environment variables configured in Render dashboard
- [ ] PostgreSQL and Redis provisioned
- [ ] Custom domain added and DNS configured
- [ ] SSL certificates auto-provisioned
- [ ] Stripe webhooks pointed to Render URL
- [ ] Ad platform OAuth callbacks configured

## Landing Page Templates

Templates will be organized by property type and campaign goal:

### Multi-Family Templates
- Lease-up campaigns (new properties)
- Vacancy fill campaigns
- Renewal/retention campaigns
- Amenity spotlight pages

### Commercial Templates
- Property listings (for sale)
- Space availability (for lease)
- Investment opportunity pages
- Broker profile pages

## Roadmap

### Phase 1 - MVP
- [ ] Admin authentication and portal
- [ ] Customer authentication and portal
- [ ] Google Ads integration
- [ ] Basic dashboard with spend tracking
- [ ] Single landing page template
- [ ] Stripe billing setup
- [ ] Render deployment with auto-deploy on merge to main

### Phase 2 - Core Platform
- [ ] Facebook/Meta Ads integration
- [ ] LinkedIn Ads integration
- [ ] Expanded template library
- [ ] Conversion tracking
- [ ] Lead routing webhooks
- [ ] Fivetran connectors setup (Google, Facebook, LinkedIn)
- [ ] Snowflake data warehouse provisioning

### Phase 3 - AI Foundation
- [ ] dbt models for unified ad reporting
- [ ] Basic ML pipeline (data collection → training → deployment)
- [ ] Conversion predictor model v1
- [ ] A/B testing framework for landing pages
- [ ] AI insights dashboard (recommendations display)

### Phase 4 - AI Optimization
- [ ] Smart budget allocation model
- [ ] Creative performance scoring
- [ ] Landing page personalization engine
- [ ] Multi-armed bandit for A/B testing
- [ ] Automated optimization actions (with approval)
- [ ] Real estate-specific signal integration

### Phase 5 - Scale
- [ ] Advanced analytics and reporting
- [ ] Custom domain support for landing pages
- [ ] White-label options
- [ ] API access for enterprise clients
- [ ] Model monitoring and drift detection
- [ ] Self-serve AI recommendations

## Getting Started

*Development setup instructions coming soon*

## License

Proprietary - All Rights Reserved

## Contact

*Contact information coming soon*
