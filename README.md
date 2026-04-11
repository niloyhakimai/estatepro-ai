# EstatePro

EstatePro is a premium full-stack real estate platform built with Next.js, React, Prisma, PostgreSQL, and Groq-powered AI experiences. It combines a polished marketing site, a searchable property catalog, role-based dashboards, and AI-assisted discovery flows in one App Router application.

## Overview

The project is designed as a complete real estate product rather than a single landing page. Visitors can browse curated listings, filter inventory through shareable URL parameters, inspect property detail pages, and submit inquiries. Authenticated users get personalized dashboard access, while managers and admins can monitor listings, user activity, and inquiry trends.

## Core Features

- AI-powered property search that converts natural language prompts into structured filters.
- Floating real estate assistant chat powered by Groq.
- Credentials-based authentication with optional Google sign-in.
- Role-aware dashboard routing for `ADMIN`, `MANAGER`, and `USER`.
- Admin and manager tools for property management, inquiry tracking, and portfolio insights.
- User dashboard views for inquiries and account management.
- Property detail pages with gallery views, related listings, and inquiry submission.
- Responsive premium UI with theme switching and modern glass-inspired styling.
- Seeded demo data so the app can be explored immediately after setup.

## Demo Accounts

Use these seeded accounts after running the database seed:

- Admin: `admin@estatepro.local` / `12345678`
- Manager: `manager@gmail.com` / `12345678`
- User: `user@estatepro.local` / `12345678`

## Tech Stack

- Framework: Next.js `16.2.2` with App Router
- Runtime UI: React `19.2.4`
- Language: TypeScript
- Styling: Tailwind CSS `v4`, Radix UI, shadcn/ui, Lucide icons
- Authentication: NextAuth.js with Prisma Adapter
- Database: PostgreSQL with Prisma `7` and `@prisma/adapter-pg`
- AI: Groq SDK
- Charts: Recharts

## App Areas

### Public Experience

- Home page with featured inventory and guided search.
- About, contact, and privacy pages.
- Explore page with filtering, sorting, pagination, and shareable search state.
- Property detail pages with inquiry actions and related property suggestions.

### Dashboard Experience

- `/dashboard/admin` for platform-level overview and analytics.
- `/dashboard/admin/properties` for listing management.
- `/dashboard/admin/inquiries` for tracking buyer conversations.
- `/dashboard/admin/users` for account oversight.
- `/dashboard/manager` for manager-focused portfolio monitoring.
- `/dashboard/user` and `/dashboard/user/inquiries` for client activity.
- `/dashboard/profile` for profile and account updates.

### AI Experience

- `/api/ai-search` for prompt-to-filter property discovery.
- `/api/chat` for conversational assistance.
- `/api/suggestions` for lightweight search suggestions.

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/niloyhakimai/estatepro-ai.git
cd estatepro-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
DIRECT_URL="your_optional_direct_database_url"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_random_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

GROQ_API_KEY="your_groq_api_key"
```

Notes:

- `DIRECT_URL` is optional, but supported by the Prisma config.
- Google sign-in is only enabled when both Google credentials are present.

### 4. Prepare the database

```bash
npx prisma db push
npx prisma generate
node prisma/seed.mjs
```

### 5. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.

## Final Project Status

- [x] Premium responsive marketing site
- [x] Explore listings with filtering, sorting, and pagination
- [x] Property details and inquiry flow
- [x] Role-based authentication and protected dashboards
- [x] Admin, manager, and user dashboard experiences
- [x] AI search and chat integrations
- [x] Prisma schema, seed data, and demo accounts

## Architecture Notes

- The app uses the Next.js App Router as a unified full-stack architecture.
- Server components, route handlers, and server actions are used across the product.
- Authentication state and dashboard access are enforced by role-aware session utilities.
- Prisma is configured through the PostgreSQL adapter and shared through a singleton client.
