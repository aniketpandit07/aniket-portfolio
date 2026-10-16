# Backend architecture

This portfolio uses a single Next.js application rather than a separate backend server.

## Responsibilities

- **Frontend:** App Router pages and React components render the portfolio. Layout, typography, color tokens, animation, and presentation-only copy stay in the codebase.
- **Next.js server layer:** Server Components, Server Actions, and Route Handlers will validate input, apply authorization, and call the data-access layer. UI components should not contain ad hoc Supabase queries.
- **Data access:** Modules in `src/lib/data` are the boundary between application code and content storage. The projects accessor currently returns the existing static dataset, so the portfolio works before Supabase is configured.
- **Supabase:** `src/lib/supabase/client.ts` creates a browser client for future browser-only needs. `src/lib/supabase/server.ts` creates the default cookie-aware server client. Both return `null` when configuration is absent.
- **PostgreSQL:** Version-controlled migrations define the five initial content tables. Static page content remains the active source until an individual domain is deliberately migrated.
- **Future Admin Portal:** Authentication, protected admin routes, mutations, storage policies, and an auth-refresh proxy are intentionally deferred until the Admin Portal is implemented.

## Data flow

```text
React UI
  -> Next.js Server Component / Action / Route Handler
  -> src/lib/data
  -> Supabase client
  -> PostgreSQL (and Storage when media is introduced)
```

Current project content follows the same first two steps, then resolves to `src/data/projects.ts`. This preserves the existing portfolio while allowing the data-access implementation to change later without scattering database calls through components.

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

These values identify the Supabase project and are safe to expose to the browser. Database security must still be enforced with grants and Row Level Security. Service-role keys and database passwords must never use a `NEXT_PUBLIC_` variable or be committed.

No Supabase project, tables, migrations, or credentials are required for the current portfolio to run. When auth is added, introduce a Next.js `proxy.ts` to refresh sessions and protect admin routes; do not add that request-time work to the public site before it is needed.

## Database model

The initial migration is `supabase/migrations/001_initial_portfolio_schema.sql`.

| Table | Responsibility |
| --- | --- |
| `site_settings` | Small set of public global settings such as title, availability, contact email, and profile links. |
| `sections` | Stable section slugs, display labels, enabled state, and ordering. It does not store layout or large content blocks. |
| `projects` | Selected Work metadata, technology labels, media reference, links, featured state, publication state, and ordering. |
| `case_studies` | Optional project-linked case studies with simple structured narrative fields: overview, challenge, approach, and outcome. |
| `experience` | Professional experience metadata, dates, technologies, publication state, and ordering. |

`case_studies.project_id` references `projects.id` and becomes `null` if a project is removed. This permits a deliberately standalone case study without preserving a broken relationship. No project, case-study, or experience records are seeded yet because those UI domains remain code-backed.

Every table uses a UUID primary key, stable unique slug/key, UTC-aware timestamps, and an `updated_at` trigger. Indexes cover the public publication/order queries and the case-study foreign key; unique constraints already index stable identifiers.

## RLS and access model

Row Level Security is enabled on all five application tables. Grants are revoked before the minimum privileges are granted back:

- `anon` can only select public rows.
- `authenticated` can select public rows. Draft/disabled rows and every insert, update, or delete require `app_metadata.role = "admin"`.
- `service_role` retains full server-side access and must never be exposed through a `NEXT_PUBLIC_` variable.

Public row rules are table-specific: all site settings are public, sections must be enabled, and projects, case studies, and experience entries must be published. A linked case study is public only while its project is also published.

The admin claim must eventually be assigned through a trusted server-side process; users cannot be promoted from browser-controlled profile metadata. Admin authentication, claim assignment, session refresh, protected routes, and the Admin Portal are deferred to a later phase.

## Migration workflow

Treat migrations as the source of truth. Do not recreate or edit this schema manually in the remote Table Editor.

```bash
# After installing and signing in to the Supabase CLI:
supabase init
supabase link
supabase db push
```

For local validation, initialize/start the Supabase development stack and run `supabase db reset`. After the schema is applied to a project, regenerate Supabase TypeScript database types from that project rather than hand-maintaining generated client types. The domain interfaces in `src/types/content.ts` describe the application-facing camelCase model in the meantime.
