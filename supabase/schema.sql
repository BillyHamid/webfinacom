-- ============================================================================
-- FINACOM — Schéma Supabase pour le back-office
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

create extension if not exists "pgcrypto";

-- ============================================================================
-- ARTICLES (Actualités / Blog)
-- ============================================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  excerpt text,
  content text,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author text,
  views int not null default 0,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- EVENTS (Événements)
-- ============================================================================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  time_range text,
  location text,
  type text,
  capacity int not null default 0,
  color text not null default 'bg-primary-500',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- MEDIA_ITEMS (Médiathèque : vidéos / photos / documents)
-- ============================================================================
create table if not exists media_items (
  id uuid primary key default gen_random_uuid(),
  media_type text not null check (media_type in ('video', 'photo', 'document')),
  title text not null,
  description text,
  thumbnail_url text,
  file_url text,
  meta jsonb not null default '{}'::jsonb,
  is_featured boolean not null default false,
  published_at date not null default current_date,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- TESTIMONIALS (Témoignages)
-- ============================================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text,
  rating int not null default 5,
  initials text,
  color text,
  sort_order int not null default 0
);

-- ============================================================================
-- PARTNERS (Partenaires)
-- ============================================================================
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  sort_order int not null default 0
);

-- ============================================================================
-- KEY_METRICS (Chiffres-clés)
-- ============================================================================
create table if not exists key_metrics (
  id uuid primary key default gen_random_uuid(),
  icon text,
  color text not null default 'primary',
  value numeric not null default 0,
  suffix text,
  label text,
  description text,
  sort_order int not null default 0
);

-- ============================================================================
-- ABOUT_CONTENT (Valeurs / Axes stratégiques / Timeline de la page À propos)
-- ============================================================================
create table if not exists about_content (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('value', 'axis', 'timeline')),
  icon text,
  year text,
  title text,
  description text,
  sort_order int not null default 0
);

-- ============================================================================
-- PRODUCT_CATEGORIES / PRODUCTS (Services)
-- ============================================================================
create table if not exists product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  kicker text,
  sort_order int not null default 0
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references product_categories(id) on delete cascade,
  name text not null,
  description text,
  sort_order int not null default 0
);

-- ============================================================================
-- PAGES (Métadonnées + contenu des pages statiques)
-- ============================================================================
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  content text,
  author text,
  views int not null default 0,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- SITE_SETTINGS (Paramètres généraux + liens externes, clé/valeur)
-- ============================================================================
create table if not exists site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table articles enable row level security;
alter table events enable row level security;
alter table media_items enable row level security;
alter table testimonials enable row level security;
alter table partners enable row level security;
alter table key_metrics enable row level security;
alter table about_content enable row level security;
alter table product_categories enable row level security;
alter table products enable row level security;
alter table pages enable row level security;
alter table site_settings enable row level security;

-- Lecture publique des contenus déjà publiés
create policy "public read published articles" on articles
  for select to anon using (status = 'published');
create policy "public read pages" on pages
  for select to anon using (status = 'published');

-- Lecture publique totale pour les contenus toujours publics
create policy "public read events" on events for select to anon using (true);
create policy "public read media_items" on media_items for select to anon using (true);
create policy "public read testimonials" on testimonials for select to anon using (true);
create policy "public read partners" on partners for select to anon using (true);
create policy "public read key_metrics" on key_metrics for select to anon using (true);
create policy "public read about_content" on about_content for select to anon using (true);
create policy "public read product_categories" on product_categories for select to anon using (true);
create policy "public read products" on products for select to anon using (true);
create policy "public read site_settings" on site_settings for select to anon using (true);

-- Accès complet (lecture + écriture) pour les utilisateurs authentifiés (back-office)
create policy "authenticated full access articles" on articles for all to authenticated using (true) with check (true);
create policy "authenticated full access events" on events for all to authenticated using (true) with check (true);
create policy "authenticated full access media_items" on media_items for all to authenticated using (true) with check (true);
create policy "authenticated full access testimonials" on testimonials for all to authenticated using (true) with check (true);
create policy "authenticated full access partners" on partners for all to authenticated using (true) with check (true);
create policy "authenticated full access key_metrics" on key_metrics for all to authenticated using (true) with check (true);
create policy "authenticated full access about_content" on about_content for all to authenticated using (true) with check (true);
create policy "authenticated full access product_categories" on product_categories for all to authenticated using (true) with check (true);
create policy "authenticated full access products" on products for all to authenticated using (true) with check (true);
create policy "authenticated full access pages" on pages for all to authenticated using (true) with check (true);
create policy "authenticated full access site_settings" on site_settings for all to authenticated using (true) with check (true);

-- ============================================================================
-- STORAGE (bucket public pour logo, images d'articles/événements, médiathèque...)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "public read site-media" on storage.objects
  for select to anon using (bucket_id = 'site-media');

create policy "authenticated manage site-media" on storage.objects
  for all to authenticated using (bucket_id = 'site-media') with check (bucket_id = 'site-media');

-- ============================================================================
-- DONNÉES DE DÉPART (reprend le contenu actuellement codé en dur sur le site)
-- ============================================================================
insert into site_settings (key, value) values
  ('general', '{"site_name":"FINACOM","description":"Institution de microfinance communautaire au Burkina Faso.","email":"contact@finacom.bf","phone":"+226 00 00 00 00","address":"Ouagadougou, Burkina Faso","logo_url":"/logo-finacom-removebg-preview.png"}'),
  ('links', '{"webmail_url":"","client_platform_url":"","request_portal_url":"","play_store_url":"","app_store_url":""}')
on conflict (key) do nothing;

insert into testimonials (name, role, content, rating, initials, color, sort_order) values
  ('Aminata Ouédraogo', 'Commerçante, Ouagadougou', 'Grâce au crédit FINACOM, j''ai pu agrandir mon commerce et employer trois personnes. Leur accompagnement a été déterminant dans la réussite de mon projet.', 5, 'AO', 'bg-primary-500', 1),
  ('Ibrahim Sanou', 'Agriculteur, Bobo-Dioulasso', 'FINACOM comprend les réalités du monde agricole. Leur crédit saisonnier m''a permis de moderniser mon exploitation et d''augmenter mes rendements de 40%.', 5, 'IS', 'bg-accent-500', 2),
  ('Fatimata Kaboré', 'Présidente d''association, Koudougou', 'L''épargne collective proposée par FINACOM a transformé notre groupement de femmes. Nous avons pu financer 12 micro-projets en un an grâce à leur appui.', 5, 'FK', 'bg-emerald-500', 3),
  ('Moussa Traoré', 'Entrepreneur, Ouagadougou', 'La rapidité et la souplesse de FINACOM sont incomparables. En une semaine, j''avais mon financement. Leur service client est toujours disponible et à l''écoute.', 5, 'MT', 'bg-blue-500', 4);

insert into partners (name, logo_url, sort_order) values
  ('BCEAO', null, 1),
  ('Banque Mondiale', null, 2),
  ('UEMOA', null, 3),
  ('FCPB', null, 4),
  ('PNUD', null, 5),
  ('AFD', null, 6);

insert into key_metrics (icon, color, value, suffix, label, description, sort_order) values
  ('Users', 'primary', 50000, '+', 'Clients actifs', 'Particuliers et entreprises', 1),
  ('MapPin', 'accent', 13, '', 'Régions couvertes', 'Sur tout le territoire national', 2),
  ('Banknote', 'blue', 8, ' Mds', 'FCFA financés', 'Total des crédits accordés', 3),
  ('Building2', 'emerald', 45, '+', 'Points de service', 'Agences et guichets', 4);
