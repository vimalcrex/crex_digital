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

### Phase 3 - Scale
- [ ] Advanced analytics and reporting
- [ ] A/B testing for landing pages
- [ ] Custom domain support for landing pages
- [ ] White-label options
- [ ] API access for enterprise clients

## Getting Started

*Development setup instructions coming soon*

## License

Proprietary - All Rights Reserved

## Contact

*Contact information coming soon*
