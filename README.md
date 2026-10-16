# Aniket Portfolio

A Next.js App Router portfolio with a Supabase-ready server and data-access foundation. The current portfolio content remains code-backed, so Supabase credentials are optional during local development.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Supabase (optional)

Copy `.env.example` to `.env.local` and provide the project URL and publishable key when a Supabase project is ready. The application continues to run with its static project data when these variables are absent.

See [docs/backend-architecture.md](docs/backend-architecture.md) for the planned data flow, domain boundaries, and deferred Admin Portal work.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Deployment targets Vercel; configure the same environment variables in the Vercel project when Supabase-backed features are enabled.
