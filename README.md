# LightPay

LightPay is a responsive digital-payment **web app prototype** built with Next.js, React and JavaScript. It has an original royal-blue and yellow identity and is inspired by familiar fintech usability patterns, not a copy of any existing product.

## Current features

- Responsive dashboard with sample balance and monthly summaries
- Show/hide balance control
- Quick actions for transfers, bills, airtime and data
- Simulated transfer and bill-payment flows with form validation
- Transaction history, search, status filtering and transaction details
- Wallet/card concept, notifications, profile/settings screens
- Light theme with responsive mobile navigation
- MySQL schema prepared for future backend work

> **Important:** All data is mock data. Transfers and bill payments are simulations. No real money moves, no bank account is connected, and the displayed profile/account information is illustrative.

## Requirements

- Node.js 20.9 or newer
- npm
- Optional for later integration: MySQL 8+

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a production build with:

```bash
npm run build
npm start
```

## Database setup command

The database schema is kept in `database/schema.sql`.

```bash
mysql -u root -p < database/schema.sql
```

This creates the `lightpay` database and the initial `users`, `wallets`, `transactions`, and `audit_events` tables. You will be prompted for your local MySQL root password. For a shared or production environment, create a dedicated least-privilege database user rather than using root.

An example environment file is provided at `.env.example`. Copy it to `.env.local` only when a backend/database connection is actually implemented. Never commit `.env.local` or real credentials.

## Project structure

```text
lightpay-nextjs/
├── app/
│   ├── globals.css       # Brand styling and responsive layouts
│   ├── layout.js         # Root layout and metadata
│   └── page.js           # Interactive prototype screens and flows
├── database/
│   └── schema.sql        # MySQL schema and setup command
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Suggested next implementation steps

1. Split the single-page prototype into Next.js routes and reusable components.
2. Add a server-side API and session-based authentication.
3. Connect MySQL using a server-only database client and migrations.
4. Add a payment provider's sandbox APIs for any real integration.
5. Add automated tests, accessibility checks and deployment configuration.

Do not store plaintext passwords, expose database credentials in client code, or treat a browser-only balance as a source of truth.


## Theme and responsive navigation
- LightPay uses royal blue `#4169E1` and yellow `#FFD447` as its primary brand colors.
- Use the moon/sun button in the top bar, or the Appearance control in Profile & Settings, to switch between light and dark mode. The selection is saved in the browser.
- The bottom navigation is displayed only on small mobile screens (650px and below). Desktop/tablet use the sidebar navigation.
- The supplied project brief does not specify exact hexadecimal brand values, so these palette values are the implementation's chosen royal blue and yellow pair. If your team has an approved brand sheet, update the CSS variables in `app/globals.css`.
