# 🏡 EstatePro - AI-Powered Real Estate Platform

EstatePro is a modern, feature-rich real estate application built with a focus on seamless user experience and Agentic AI integration. It features a role-based dashboard, dynamic property listings, and AI-powered natural language search capabilities.

> **Note:** This project is currently a Work In Progress (WIP) as part of an ongoing development phase.

---

## ✨ Key Features

- 🤖 **Agentic AI Search:** Natural language property search powered by Groq (LLaMA 3) to automatically filter properties (e.g., "Find me a cheap 3-bedroom place").
- 💬 **Smart Real Estate Assistant:** A floating AI chatbot to answer user queries and guide them through the platform.
- 🔐 **Role-Based Authentication:** Secure login system using NextAuth (Credentials & Google Provider) with distinct `USER` and `ADMIN` roles.
- 📊 **Interactive Dashboards:** Dedicated workspaces for Admins to manage properties/inquiries and for Users to track their interests, complete with Recharts data visualization.
- 🔍 **Advanced Filtering:** Dynamic server-side filtering for property listings (Location, Price, Bedrooms).
- 📱 **Fully Responsive UI:** Polished, Dribbble-quality interfaces with Light/Dark mode support.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Shadcn UI (Radix Primitives)
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Authentication:** NextAuth.js (Auth.js) + bcryptjs
- **AI Integration:** Groq SDK
- **Charts:** Recharts

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/estatepro-ai.git
cd estatepro-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
# Database
DATABASE_URL="your_neon_postgres_url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_a_random_secret_string"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# AI Integration (Groq)
GROQ_API_KEY="your_groq_api_key"
```

### 4. Database Setup

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📈 Current Project Status

- [x] Phase 1: Database & Foundation Setup  
- [x] Phase 2: Global Layout, Theming & Auth Shell  
- [x] Phase 3: Home Page & UI Components  
- [x] Phase 4: Property Listings & Details (Dynamic Routing)  
- [x] Phase 5: Role-Based Dashboard & Data Tables  
- [x] Phase 6: AI Search & Chat Assistant (Groq Integration)  
- [ ] Final Polish & Deployment (Pending)

---

## 📌 Notes

Designed and developed as a comprehensive full-stack showcase project with modern UI/UX and AI-powered features.