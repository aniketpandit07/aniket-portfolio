-- Initial portfolio content schema.
-- Public visitors receive read-only access to visible/published content.
-- Administrative writes require an authenticated user whose trusted
-- app_metadata contains { "role": "admin" }.

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique default 'default',
  site_title text not null,
  site_description text,
  availability_status text not null default 'not_specified'
    check (availability_status in ('not_specified', 'available', 'limited', 'unavailable')),
  availability_text text,
  contact_email text,
  github_url text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_key_format check (key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  is_enabled boolean not null default true,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sections_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  category text not null,
  technologies text[] not null default '{}',
  thumbnail_path text,
  project_url text,
  github_url text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  slug text not null unique,
  title text not null,
  subtitle text,
  summary text,
  overview text,
  challenge text,
  approach text,
  outcome text,
  is_published boolean not null default false,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint case_studies_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.experience (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  organization text not null,
  role text not null,
  summary text,
  start_date date not null,
  end_date date,
  organization_url text,
  technologies text[] not null default '{}',
  is_published boolean not null default false,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experience_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint experience_date_order check (end_date is null or end_date >= start_date)
);

create index sections_public_order_idx
  on public.sections (is_enabled, display_order);
create index projects_public_order_idx
  on public.projects (is_published, display_order);
create index case_studies_project_id_idx
  on public.case_studies (project_id);
create index case_studies_public_order_idx
  on public.case_studies (is_published, display_order);
create index experience_public_order_idx
  on public.experience (is_published, display_order);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.touch_updated_at() from public;

create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();
create trigger sections_touch_updated_at
  before update on public.sections
  for each row execute function public.touch_updated_at();
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();
create trigger case_studies_touch_updated_at
  before update on public.case_studies
  for each row execute function public.touch_updated_at();
create trigger experience_touch_updated_at
  before update on public.experience
  for each row execute function public.touch_updated_at();

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'),
    false
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

alter table public.site_settings enable row level security;
alter table public.sections enable row level security;
alter table public.projects enable row level security;
alter table public.case_studies enable row level security;
alter table public.experience enable row level security;

revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.sections from anon, authenticated;
revoke all on table public.projects from anon, authenticated;
revoke all on table public.case_studies from anon, authenticated;
revoke all on table public.experience from anon, authenticated;

grant select on table public.site_settings to anon, authenticated;
grant select on table public.sections to anon, authenticated;
grant select on table public.projects to anon, authenticated;
grant select on table public.case_studies to anon, authenticated;
grant select on table public.experience to anon, authenticated;

grant insert, update, delete on table public.site_settings to authenticated;
grant insert, update, delete on table public.sections to authenticated;
grant insert, update, delete on table public.projects to authenticated;
grant insert, update, delete on table public.case_studies to authenticated;
grant insert, update, delete on table public.experience to authenticated;

grant all on table public.site_settings to service_role;
grant all on table public.sections to service_role;
grant all on table public.projects to service_role;
grant all on table public.case_studies to service_role;
grant all on table public.experience to service_role;

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Public can read enabled sections"
  on public.sections for select
  to anon, authenticated
  using (is_enabled);
create policy "Admins can read all sections"
  on public.sections for select
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (is_published);
create policy "Admins can read all projects"
  on public.projects for select
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Public can read published case studies"
  on public.case_studies for select
  to anon, authenticated
  using (
    is_published
    and (
      project_id is null
      or exists (
        select 1
        from public.projects
        where projects.id = case_studies.project_id
          and projects.is_published
      )
    )
  );
create policy "Admins can read all case studies"
  on public.case_studies for select
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Public can read published experience"
  on public.experience for select
  to anon, authenticated
  using (is_published);
create policy "Admins can read all experience"
  on public.experience for select
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Admins can insert site settings"
  on public.site_settings for insert
  to authenticated
  with check ((select public.is_portfolio_admin()));
create policy "Admins can update site settings"
  on public.site_settings for update
  to authenticated
  using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));
create policy "Admins can delete site settings"
  on public.site_settings for delete
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Admins can insert sections"
  on public.sections for insert
  to authenticated
  with check ((select public.is_portfolio_admin()));
create policy "Admins can update sections"
  on public.sections for update
  to authenticated
  using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));
create policy "Admins can delete sections"
  on public.sections for delete
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check ((select public.is_portfolio_admin()));
create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));
create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Admins can insert case studies"
  on public.case_studies for insert
  to authenticated
  with check ((select public.is_portfolio_admin()));
create policy "Admins can update case studies"
  on public.case_studies for update
  to authenticated
  using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));
create policy "Admins can delete case studies"
  on public.case_studies for delete
  to authenticated
  using ((select public.is_portfolio_admin()));

create policy "Admins can insert experience"
  on public.experience for insert
  to authenticated
  with check ((select public.is_portfolio_admin()));
create policy "Admins can update experience"
  on public.experience for update
  to authenticated
  using ((select public.is_portfolio_admin()))
  with check ((select public.is_portfolio_admin()));
create policy "Admins can delete experience"
  on public.experience for delete
  to authenticated
  using ((select public.is_portfolio_admin()));

insert into public.site_settings (
  id,
  key,
  site_title,
  site_description,
  contact_email,
  github_url,
  linkedin_url
)
values (
  '10000000-0000-4000-8000-000000000010',
  'default',
  'Aniket Pandit — Frontend & Full-Stack Developer',
  'Personal portfolio of Aniket Pandit, a frontend-focused full-stack developer building modern, responsive and interactive web experiences.',
  'aniketpandit548@gmail.com',
  'https://github.com/aniketpandit',
  'https://linkedin.com/in/aniketpandit'
);

insert into public.sections (id, slug, display_name, is_enabled, display_order)
values
  ('10000000-0000-4000-8000-000000000101', 'hero', 'Hero', true, 10),
  ('10000000-0000-4000-8000-000000000102', 'selected-work', 'Selected Work', true, 20),
  ('10000000-0000-4000-8000-000000000103', 'expertise', 'Expertise', true, 30),
  ('10000000-0000-4000-8000-000000000104', 'experience', 'Experience', true, 40),
  ('10000000-0000-4000-8000-000000000105', 'ui-lab', 'UI Lab', true, 50),
  ('10000000-0000-4000-8000-000000000106', 'about', 'About', true, 60),
  ('10000000-0000-4000-8000-000000000107', 'contact', 'Contact', true, 70);
