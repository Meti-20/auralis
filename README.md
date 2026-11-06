# AURALIS — AI-Powered Cash Flow Analytics Dashboard

> **"Understand your money. Make better decisions."**

Auralis is a focused, polished, single-page fintech SaaS dashboard built for small businesses, founders, and finance operators. It delivers immediate clarity on capital velocity: how much money you earn, how much you spend, how much cash remains, where your money goes, and what financial decisions to consider next.

---

## ✦ Product Overview

Auralis provides an executive-grade cash flow analytics experience on a single, cohesive dashboard:

1. **Sidebar Navigation**
   - Architectural abstract A-shaped brand mark & clean AURALIS wordmark.
   - Direct section navigation: **Overview**, **Cash Flow**, **Transactions**.
   - Interactive modal actions: **Reports** (automated statement generator & exporter) and **Settings** (workspace profile, currency, date format, and alert configuration).
   - Direct access to **Product Guide & Intro**.
   - User profile status card at the bottom (Meti Jemal • Acme Technologies Inc.).
   - Full mobile navigation support with an accessible responsive drawer.

2. **Top Navigation**
   - Page title: **Financial Overview** with welcome greeting (*"Welcome back, Meti • Acme Technologies Inc."*).
   - Functional Date-Range Selector: **Last 7 days**, **Last 30 days** (default), **Last 90 days**.
   - Notification Center: Interactive popover with unread counter badge, transaction alerts, and *"Mark all read"* action.
   - Profile Menu: Dropdown with workspace status, Product Guide launcher, and quick links.

3. **Financial Summary KPI Cards**
   - **Total Income:** `$48,250` (+14.2% vs. previous 30 days)
   - **Total Expenses:** `$21,840` (-3.8% vs. previous 30 days)
   - **Net Cash Flow:** `$26,410` (+28.4% vs. previous 30 days)
   - **Available Balance:** `$72,650` (+18.2% across sample business accounts)
   - *All figures dynamically recalculate when changing date ranges, format according to user currency and number preferences, and format with tabular numerals.*

4. **Main Cash Flow Analytics**
   - High-fidelity Recharts AreaChart visualizing **Income**, **Expenses**, and **Net Cash Flow**.
   - **Weekly** vs. **Monthly** view toggle.
   - Dynamic date-range synchronization (`7d`, `30d`, `90d`).
   - Custom hover tooltips with currency formatting.
   - **Interactive Series Visibility Legend:** Clicking Income, Expenses, or Net Cash Flow toggles individual chart series visibility.

5. **Expense Category Breakdown**
   - Recharts Donut visualization of operational disbursements.
   - Explicit category breakdown:
     - **Salaries:** `$7,862` (36%) — Deep Forest Sage
     - **Marketing:** `$5,242` (24%) — Muted Sage Green
     - **Operations:** `$4,805` (22%) — Medium Olive Sage
     - **Software:** `$2,621` (12%) — Light Sage
     - **Other:** `$1,310` (6%) — Soft Grey
   - **Interactive Category Filtering:** Clicking any category or donut slice highlights the segment and filters the ledger to that department.

6. **Recent Transactions Ledger & Client-Side Export**
   - Complete ledger with Transaction Name, Category, Date, Status (*Cleared* / *Pending*), and Amount.
   - Distinct green (`+`) income pills and dark (`-`) expense pills.
   - Real-time search filter across transaction names, categories, and accounts.
   - Category filtering chips (*All*, *Income*, *Salaries*, *Marketing*, *Operations*, *Software*, *Other*).
   - Flow type filtering (*All Flows*, *Income Only*, *Expenses Only*).
   - Sorting (*Newest First*, *Oldest First*, *Highest Amount*, *Lowest Amount*).
   - **Functional Client-Side CSV Export:** One-click download of currently filtered transactions with RFC 4180 escaping, UTF-8 BOM, and standardized filename (`auralis-transactions-YYYY-MM-DD.csv`).

7. **Auralis AI Insights**
   - Visually distinct highlight card with toggleable pale lime ambient glow.
   - Three sample insights:
     1. **Spending Analysis:** *"Marketing expenses increased by 12% compared with the previous period."*
     2. **Cash Flow Observation:** *"Your income is currently higher than your expenses."*
     3. **Saving Opportunity:** *"Review recurring software subscriptions to identify potential savings."*
   - Interactive **"Explore insight"** button opening an analytical deep-dive modal with root-cause analysis.
   - Functional **"Simulate Action"** buttons with actionable feedback toast alerts and rollback support.

8. **Comprehensive Workspace Settings Dialog**
   - Multi-tab responsive configuration modal:
     - **Profile:** Full Name, Avatar Initials, Email, Company Name.
     - **Financial Preferences:** Reporting Currency (USD `$`, EUR `€`, GBP `£`, CAD `CA$`), Date Formats, Number Formatting (Standard commas vs Compact units).
     - **Notifications:** Email Anomaly Alerts, Weekly Cash Digest, Monthly Burn Alert Threshold ($).
     - **Appearance:** AI Glow Highlights toggle, UI Layout Density (Comfortable vs Compact).
     - **Product Guide:** Replay the first-time onboarding introduction.
     - **Demo Reset:** One-click restoration of initial default workspace state.
   - Full client-side persistence via `localStorage` updating across all components in real-time.

9. **Financial Statement Generator (`ReportsDialog.tsx`)**
   - Generates and downloads real client-side financial statements:
     - Cash Flow & Inflow Statement
     - Departmental Expense Breakdown
     - Tax & Compliance Preparation Ledger
   - Exports in standard CSV format or opens a styled, printable presentation ready for PDF export (`window.print()`).

10. **First-Time User Welcome Experience (`WelcomeScreen.tsx`)**
    - Immersive onboarding introduction greeting Meti (*"Welcome, Meti!"*).
    - Introduces the 4 core capabilities: Cash Flow Analytics, Expense Tracking, AI Financial Insights, and Transaction Monitoring.
    - Prominent *"Explore My Dashboard"* CTA button with smooth transition into the financial workspace.
    - `localStorage` persistence (`auralis_intro_completed`) ensuring the introduction displays once on first visit.
    - Reopenable at any time via **Settings > Launch Guide**, **Profile Menu > Product Guide & Intro**, or the sidebar quick link.

---

## ✦ Design System & Color Palette

Built strictly with the required warm neutral palette:

| Color | Hex | Usage |
|---|---|---|
| **Warm Ivory** | `#F8F7F2` | Primary page background |
| **Soft Cream** | `#EEECE4` | Secondary backgrounds, toggle bars, badges |
| **Card Canvas** | `#FCFBF8` | Dashboard cards and elevated surfaces |
| **Charcoal** | `#252923` | Headings, primary text, and dark button accents |
| **Muted Sage Green** | `#A5B98A` | Primary accent, chart series, positive trends |
| **Deep Forest Sage** | `#3E502C` | Button hovers, high-contrast badges |
| **Soft Grey** | `#DADBD5` | Subtle borders, table dividers, donut slice |
| **Pale Lime** | `#DDF0CE` | AI insight highlights, glow effects |

- **Typography:** Manrope for headings and Inter for body text.
- **Tabular Numerals:** Standardized with `tabular-numbers` to guarantee aligned financial figures.

---

## ✦ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **UI Components & Theme:** Material UI (MUI v5) + Emotion SSR Cache
- **Data Visualizations:** Recharts v2 (AreaChart, Donut PieChart, ResponsiveContainer)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Management:** React Context (`UserContext`) with `localStorage` persistence

---

## ✦ Project Structure

```
AURALIS/
├── public/
│   └── icon.svg                      # Custom geometric brand mark
├── src/
│   ├── app/
│   │   ├── globals.css               # Design tokens, resets, tabular numbers
│   │   ├── icon.svg                  # Favicon
│   │   ├── layout.tsx                # App root layout & font loader
│   │   └── page.tsx                  # Single-page focused dashboard
│   ├── components/
│   │   ├── common/
│   │   │   └── AuralisLogo.tsx       # SVG abstract A brand mark & wordmark
│   │   └── dashboard/
│   │       ├── AIInsightsCard.tsx    # 3 AI insights with simulation action & modal
│   │       ├── CashFlowAnalyticsChart.tsx # Recharts interactive area chart with legend toggles
│   │       ├── ExpenseBreakdown.tsx  # Donut chart & clickable category progress list
│   │       ├── ReportsDialog.tsx     # Statement export dialog (CSV / Printable PDF)
│   │       ├── SettingsDialog.tsx    # Multi-tab workspace settings modal
│   │       ├── Sidebar.tsx           # Desktop & mobile drawer navigation
│   │       ├── SummaryKPICards.tsx   # 4 KPI cards (Income, Expenses, Net, Balance)
│   │       ├── TopNavbar.tsx         # Date range selector, notifications, profile
│   │       ├── TransactionsTable.tsx # Filterable ledger with CSV export
│   │       └── WelcomeScreen.tsx     # First-time onboarding experience
│   ├── context/
│   │   └── UserContext.tsx           # User profile & preferences state provider
│   ├── data/
│   │   └── mockData.ts               # Structured financial sample dataset
│   ├── theme/
│   │   ├── theme.ts                  # MUI theme palette & typography
│   │   └── ThemeRegistry.tsx         # Emotion SSR cache provider
│   ├── types/
│   │   └── index.ts                  # TypeScript interface declarations
│   └── utils/
│       └── exportUtils.ts            # Client-side CSV & printable report utilities
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✦ Getting Started

### Installation

```bash
cd AURALIS
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## ✦ Disclaimer

*Auralis is an illustrative fintech product prototype designed for professional developer portfolio showcase. All financial metrics, customer quotes, and transactions are realistic simulated sample demonstration assets.*
