# 🏡 EstatePro - AI-Powered Luxury Real Estate Platform

EstatePro is a modern, premium, and feature-rich real estate application built with a focus on seamless user experience, luxury aesthetics (Glassmorphism), and Agentic AI integration. It features a role-based executive dashboard, dynamic property listings, and AI-powered natural language search capabilities.

---

## 🔐 Demo Credentials

Use these accounts to explore the role-based features and administrative dashboards of the platform:

### Administrator
- Email: `admin@estatepro.local`
- Password: `12345678`

### Property Manager
- Email: `manager@gmail.com`
- Password: `12345678`

### Standard Client
- Email: `user@estatepro.local`
- Password: `12345678`

---

## ✨ Key Features

- 🤖 **Agentic AI Search:** Natural language property search powered by Groq (LLaMA 3.1 70B) to automatically filter properties  
  Example: `"Find me a cheap 3-bedroom place"`

- 💬 **Smart Real Estate Assistant:** A floating AI chatbot to answer user queries and guide them through the platform  

- 🔐 **Role-Based Authentication:** Secure login system using NextAuth (Credentials & Google Provider) with distinct `ADMIN`, `MANAGER`, and `USER` roles  

- 📊 **Interactive Executive Dashboards:** Dedicated workspaces for Admins and Users with Recharts data visualization  

- 🔍 **Advanced Filtering:** Dynamic server-side filtering for property listings by location, price, and bedrooms  

- 📱 **Luxury Responsive UI:** Glassmorphism design, smooth animations, and Light/Dark mode support  

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (App Router)  
- **Language:** TypeScript  
- **Styling & UI:** Tailwind CSS v4, Framer Motion, Shadcn UI  
- **Database:** PostgreSQL (Neon) with Prisma ORM  
- **Authentication:** NextAuth.js (Auth.js) + bcryptjs  
- **AI Engine:** Groq SDK  
- **State & Data:** Next-Safe-Action  
- **Monitoring:** Recharts  

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/niloyhakimai/estatepro-ai.git
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

## 🏁 Final Project Status

- [x] Phase 1-6: Core Infrastructure & AI Integration (Completed)  
- [x] UI/UX Overhaul: Luxury Glassmorphism & Responsive Fixes (Completed)  
- [x] Optimization: Image Fallbacks & Server-Side Filtering (Completed)  
- [x] Vercel Deployment & Live Demo (Completed)  

---

## 📌 Notes

Designed and developed as a comprehensive full-stack showcase project with modern UI/UX and AI-powered features. 
Architecture Note: This project leverages the Next.js App Router as a unified Full-Stack solution, utilizing Server Actions and Route Handlers for robust backend logic and secure database operations.
