# GitHub Dashboard Pro

A modern, type-safe GitHub exploration dashboard built as a hands-on practice of **Next.js 16.2.9** and the React 19 ecosystem. Authenticated with GitHub OAuth, backed by Prisma Postgres, styled with Tailwind v4 in a Primer-inspired visual language.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Highlights

- **Next.js 16.2.9** with **Partial Prerendering** (`cacheComponents: true`)
- **React 19.2.4** — RSC, Server Actions, the new `use()` hook patterns
- **NextAuth v5 (beta)** with GitHub provider, JWT session strategy
- **Prisma 7** + PostgreSQL, with the new `@prisma/adapter-pg`
- **Tailwind v4** (CSS-first config) with a tokenized design system
- **TanStack Query v5** for client-side fetching
- **React Hook Form + Zod v4** for validated forms
- **react-markdown + remark-gfm** for repository README rendering
- **Motion** for tasteful, state-conveying animation
- **Lucide** icon system, **Inter + JetBrains Mono** typography

---

## Features

| Module | Capabilities |
| --- | --- |
| **Dashboard** | Stats grid (repos, stars, followers, contributions), activity feed |
| **Repositories** | Search, filter, sort, drill-down with full README rendering |
| **Users** | GitHub user profiles, search, follow |
| **Favorites** | Star repos and users, with notes and collections |
| **Collections** | Curated groups of repos/users, public or private |
| **Settings** | Profile, theme, account management |
| **AI Explain** | LLM-powered insight stubs for repositories |
| **Auth** | GitHub OAuth, JWT session, JWT access token forwarding |
| **Theme** | Light / Dark / System with no-flash inline script |

---

## Architecture

```
app/                      # App Router (Next.js 16)
├── (auth)/               # Auth route group (login)
├── (dashboard)/          # Authenticated route group
│   ├── layout.tsx        # Sidebar + Header shell
│   └── dashboard/        # All dashboard routes
├── api/                  # Route handlers
├── layout.tsx            # Root layout (theme bootstrap)
└── globals.css           # Tailwind v4 + design tokens

components/
├── layout/               # Header, Sidebar, ThemeProvider
├── shared/               # SectionHeader, StatCard, EmptyState, SearchCommand
└── ui/                   # Button, Card, Avatar, Dropdown, Input, Badge, Skeleton

features/                 # Feature-first modules (Sandi Metz style)
├── ai/                   # AI explain (stubs)
├── dashboard/            # Stats, activity
├── favorites/            # Starred repos + users
├── repositories/         # Repo list + detail
├── settings/             # User settings
└── users/                # User list + profile

lib/                      # Cross-cutting concerns
├── auth.ts               # NextAuth config
├── auth-client.ts        # Client auth helpers
├── db.ts                 # Prisma singleton
├── github.ts             # GitHub API client
├── languages.ts          # Language metadata
└── format.ts             # Number/date formatters

prisma/                   # Database schema
types/                    # Shared ambient types
utils/                    # Pure utilities (cn helper)
```

Each feature directory follows the same internal structure:

```
features/<name>/
├── api/                  # Data-fetching (server, "use cache")
├── components/           # Feature-specific components
├── constants/            # Static data, configuration
├── types.ts              # Feature types
└── index.ts              # Barrel export
```

---

## Getting Started

### Prerequisites

- Node.js **20+**
- A PostgreSQL database (Prisma Postgres recommended)
- A GitHub OAuth app

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in the values:

```bash
DATABASE_URL="postgres://..."
AUTH_GITHUB_ID="your_github_oauth_client_id"
AUTH_GITHUB_SECRET="your_github_oauth_client_secret"
AUTH_SECRET="openssl rand -base64 32"
```

### 3. Push the schema

```bash
npx prisma db push
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with GitHub.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Production build with PPR |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Next.js 16 Notes

This project exists to exercise the **Next.js 16** surface area end-to-end. Things worth knowing:

- **Partial Prerendering** is enabled via `cacheComponents: true` in `next.config.ts`. Static shell + dynamic streaming.
- **Auth reading request headers** keeps authenticated pages dynamic. The dashboard layout uses `auth()` per request.
- **Data functions** are colocated with features and use the `"use cache"` directive for the cache-components pipeline.
- **`Suspense` boundaries** wrap the data-fetching components so PPR can stream them independently.
- **Server Components by default**. The client boundary is only crossed where interactivity requires it (theme toggle, dropdowns, search command).

The root `AGENTS.md` contains the project rule:

> This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Design System

- **Register**: product (devs using GitHub data)
- **Density**: compact, table-friendly
- **Accent**: Primer green (`--color-accent-emphasis`)
- **Typography**: Inter (UI), JetBrains Mono (code/numbers)
- **Tokens**: CSS custom properties under `var(--color-*)`, defined in `app/globals.css`
- **Motion**: 150–250 ms, state-conveying only

See `PRODUCT.md` for the full product register.

---

## Tech Stack

- **Framework**: Next.js 16.2.9
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (PostCSS plugin)
- **Auth**: NextAuth v5 (beta) with GitHub provider
- **Database**: Prisma 7 + PostgreSQL (`@prisma/adapter-pg`)
- **Forms**: React Hook Form + Zod
- **Data fetching**: TanStack Query v5
- **Markdown**: react-markdown + remark-gfm
- **Animation**: Motion (Framer Motion successor)
- **Icons**: Lucide React
- **AI**: OpenAI SDK (stubbed integration)

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

## Acknowledgments

- Next.js team for the v16 release
- Vercel for `next/font` and `create-next-app`
- The Primer design system for the visual language reference
