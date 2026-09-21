-- ============================================================================
-- FINACOM — Restreint l'écriture aux seuls administrateurs
-- Corrige : les policies "authenticated full access ..." donnaient un accès
-- total en écriture à N'IMPORTE QUEL compte "authenticated", et l'inscription
-- publique était activée → n'importe qui pouvait s'inscrire et tout modifier.
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) Table des administrateurs autorisés
-- ----------------------------------------------------------------------------
create table if not exists admins (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

-- Personne ne peut lire/écrire cette table depuis le client (anon ou authenticated) ;
-- seule la fonction is_admin() ci-dessous (security definer) peut la consulter,
-- et l'ajout d'admins se fait depuis le Dashboard / SQL Editor.

-- ----------------------------------------------------------------------------
-- 2) Fonction utilitaire : l'utilisateur connecté est-il admin ?
--    security definer = peut lire `admins` même si RLS l'interdit au client.
-- ----------------------------------------------------------------------------
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admins where admins.id = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- 3) Remplace les policies d'écriture "authenticated" (trop larges) par
--    des policies "admin uniquement"
-- ----------------------------------------------------------------------------
drop policy if exists "authenticated full access articles" on articles;
drop policy if exists "authenticated full access events" on events;
drop policy if exists "authenticated full access media_items" on media_items;
drop policy if exists "authenticated full access testimonials" on testimonials;
drop policy if exists "authenticated full access partners" on partners;
drop policy if exists "authenticated full access key_metrics" on key_metrics;
drop policy if exists "authenticated full access about_content" on about_content;
drop policy if exists "authenticated full access product_categories" on product_categories;
drop policy if exists "authenticated full access products" on products;
drop policy if exists "authenticated full access pages" on pages;
drop policy if exists "authenticated full access site_settings" on site_settings;

create policy "admin full access articles" on articles for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access events" on events for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access media_items" on media_items for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access testimonials" on testimonials for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access partners" on partners for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access key_metrics" on key_metrics for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access about_content" on about_content for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access product_categories" on product_categories for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access products" on products for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access pages" on pages for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin full access site_settings" on site_settings for all to authenticated using (is_admin()) with check (is_admin());

-- ----------------------------------------------------------------------------
-- 4) Idem pour le bucket de stockage "site-media"
-- ----------------------------------------------------------------------------
drop policy if exists "authenticated manage site-media" on storage.objects;
create policy "admin manage site-media" on storage.objects
  for all to authenticated using (bucket_id = 'site-media' and is_admin())
  with check (bucket_id = 'site-media' and is_admin());

-- ============================================================================
-- 5) ÉTAPE MANUELLE OBLIGATOIRE : déclarer le(s) compte(s) admin existant(s)
--    Remplace l'email ci-dessous par celui/ceux de ton/tes compte(s) admin,
--    puis exécute ce bloc (il va chercher l'UUID correspondant dans auth.users).
-- ============================================================================
insert into admins (id)
select id from auth.users where email in ('ouattarabillyhamid@gmail.com', 'lymoctar@gmail.com')
on conflict (id) do nothing;
