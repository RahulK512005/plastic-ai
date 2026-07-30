# Punarvritt

Punarvritt is a front-end prototype for an **India-focused Plastic Recycling Marketplace & EPR Compliance Platform**. It connects Brand Owners / PIBOs (Producers, Importers, Brand Owners) with Certified Plastic Recyclers & Waste Aggregators to manage Extended Producer Responsibility (EPR) obligations under CPCB regulations.

## Features

- **Landing Page** — Marketing page with platform stats and value propositions for Brands, Recyclers, and Traceability.
- **Authentication Flows** — Separate login and signup pages for Brand and Recycler portals.
- **Registration Wizard** — 7-step onboarding flow:
  1. Choose role (Brand / Recycler)
  2. Select material category (Plastic / Metal)
  3. Company information (GST, PAN, address, contact)
  4. Document upload with drag-drop and animated progress
  5. Processing capacity tier selection
  6. Subscription plan selection
  7. Review and submit
- **Dashboards** — Mock dashboards for both portals showing EPR credits, certificates, compliance metrics, and connected entities.
- **Draft Persistence** — Auto-saves wizard progress to `localStorage` with manual save support.
- **Validation** — Per-step validation for email, mobile, GSTIN, PAN, pincode, and required documents.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4
- **Icons:** lucide-react
- **Animations:** motion (Framer Motion)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev or node node_modules\.bin\next.exe dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Gemini AI API key for AI-powered compliance insights |
| `APP_URL` | Application base URL |

## Project Structure

```
punarvritt-task-1/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── brand/
│   │   ├── login/page.tsx      # Brand login
│   │   ├── signup/page.tsx     # Brand signup (wizard)
│   │   └── dashboard/page.tsx  # Brand dashboard
│   └── recycler/
│       ├── login/page.tsx      # Recycler login
│       ├── signup/page.tsx     # Recycler signup (wizard)
│       └── dashboard/page.tsx  # Recycler dashboard
├── src/
│   ├── components/
│   │   ├── auth/               # Shared auth layout and form components
│   │   ├── registration/       # 7-step wizard components
│   │   └── ui/                 # Reusable UI primitives
│   ├── hooks/
│   │   └── useRegistration.ts  # Wizard state management
│   ├── data/
│   │   └── pricing.ts          # Pricing tiers and document requirements
│   └── types/
│       └── registration.ts     # TypeScript interfaces and enums
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Notes

- This is a front-end prototype. No backend API routes are implemented.
- Authentication and wizard state are managed client-side.
- `@google/genai` is included as a dependency but not yet integrated.
