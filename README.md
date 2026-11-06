# AURALIS — AI-Powered Cash Flow Analytics Dashboard

> **"Understand your money. Make better decisions."**

Auralis is a focused, polished, single-page fintech SaaS dashboard built for small businesses, founders, and finance operators. It delivers immediate clarity on capital velocity: how much money you earn, how much you spend, how much cash remains, where your money goes, and what financial decisions to make next.

---

## ✦ Product Overview

Auralis provides an executive-grade cash flow analytics experience on a single, cohesive dashboard:

1. **Sidebar Navigation**
   - Architectural abstract A-shaped brand mark & clean AURALIS wordmark.
   - Direct section navigation: **Overview**, **Cash Flow**, **Transactions**.
   - Interactive modal actions: **Reports** (automated statement generator) and **Settings** (workspace currency & alert configuration).
   - Direct access to **Product Guide & Intro**.
   - User profile status card at the bottom (Meti Jemal • Acme Technologies Inc.).
   - Full mobile navigation support with a responsive drawer.

2. **Top Navigation**
   - Page title: **Financial Overview** with welcome greeting (*"Welcome back, Meti • Acme Technologies Inc."*).
   - Functional Date-Range Selector: **Last 7 days**, **Last 30 days** (default), **Last 90 days**.
   - Notification Center: Interactive popover with unread counter badge, transaction alerts, and *"Mark all read"* action.
   - Profile Menu: Dropdown with workspace status, Product Guide launcher, and quick links.

3. **Financial Summary KPI Cards**
   - **Total Income:** `$48,250` (+14.2% vs. previous 30 days)
   - **Total Expenses:** `$21,840` (-3.8% vs. previous 30 days)
   - **Net Cash Flow:** `$26,410` (+28.4% vs. previous 30 days)
   - **Available Balance:** `$72,650` (+18.2% across 3 verified accounts)
   - *All figures dynamically recalculate when changing date ranges and format with tabular numerals.*

4. **Main Cash Flow Analytics**
   - High-fidelity Recharts AreaChart visualizing **Income**, **Expenses**, and **Net Cash Flow**.
   - **Weekly** vs. **Monthly** view toggle.
   - Dynamic date-range synchronization (`7d`, `30d`, `90d`).
   - Custom hover tooltips and clear visual legend.

5. **Expense Category Breakdown**
   - Recharts Donut visualization of operational disbursements.
   - Explicit category breakdown:
     - **Salaries:** `$7,862` (36%) — Deep Forest Sage
     - **Marketing:** `$5,242` (24%) — Muted Sage Green
     - **Operations:** `$4,805` (22%) — Medium Olive Sage
     - **Software:** `$2,621` (12%) — Light Sage
     - **Other:** `$1,310` (6%) — Soft Grey

6. **Recent Transactions Table**
   - Complete ledger with Transaction Name, Category, Date, Status (*Cleared* / *Pending*), and Amount.
   - Distinct green (`+`) income pills and dark (`-`) expense pills.
   - Real-time search filter by transaction name or bank account.
   - Category filtering chips (*All*, *Income*, *Salaries*, *Marketing*, *Operations*, *Software*, *Other*).
   - Working sorting (*Newest First*, *Oldest First*, *Highest Amount*, *Lowest Amount*).

7. **Auralis AI Insights**
   - Visually distinct highlight card with pale lime ambient glow.
   - Three sample insights:
     1. **Spending Analysis:** *"Marketing expenses increased by 12% compared with the previous period."*
     2. **Cash Flow Observation:** *"Your income is currently higher than your expenses."*
     3. **Saving Opportunity:** *"Review recurring software subscriptions to identify potential savings."*
   - Interactive **"Explore insight"** button opening an analytical deep-dive modal with root-cause analysis and a simulated action confirmation button.

8. **First-Time User Welcome Experience (`WelcomeScreen.tsx`)**
   - Immersive, non-marketing onboarding introduction greeting Meti (*"Welcome, Meti!"*).
   - Introduces the 4 core capabilities: Cash Flow Analytics, Expense Tracking, AI Financial Insights, and Transaction Monitoring.
   - Prominent *"Explore My Dashboard"* CTA button with smooth transition into the financial workspace.
   - `localStorage` persistence (`auralis_intro_completed`) ensuring the introduction only shows once on first visit.
   - Reopenable at any time via **Settings > Launch Guide**, **Profile Menu > Product Guide & Intro**, or the sidebar quick link.
   - Interactive contextual help tooltips across all KPIs, charts, and table headers.

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
- **Styling:** Custom CSS / MUI `sx` / Emotion (Zero Tailwind CSS)

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
│   │       ├── AIInsightsCard.tsx    # 3 AI insights with expandable detail dialog
│   │       ├── CashFlowAnalyticsChart.tsx # Recharts interactive area chart
│   │       ├── ExpenseBreakdown.tsx  # Donut chart & category progress list
│   │       ├── ReportsDialog.tsx     # Statement export dialog
│   │       ├── SettingsDialog.tsx    # Workspace settings modal
│   │       ├── Sidebar.tsx           # Desktop & mobile drawer navigation
│   │       ├── SummaryKPICards.tsx   # 4 KPI cards (Income, Expenses, Net, Balance)
│   │       ├── TopNavbar.tsx         # Date range selector, notifications, profile
│   │       └── TransactionsTable.tsx # Filterable, searchable, sortable ledger
│   ├── data/
│   │   └── mockData.ts               # Structured financial sample dataset
│   ├── theme/
│   │   ├── theme.ts                  # MUI theme palette & typography
│   │   └── ThemeRegistry.tsx         # Emotion SSR cache provider
│   └── types/
│       └── index.ts                  # TypeScript interface declarations
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
