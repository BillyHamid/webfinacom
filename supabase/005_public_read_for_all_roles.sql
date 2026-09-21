-- ============================================================================
-- FINACOM — Corrige la lecture publique : elle ne doit pas dépendre du rôle
-- ----------------------------------------------------------------------------
-- Bug : les policies "public read ..." créées dans schema.sql ne couvraient
-- que le rôle `anon`. Résultat : un visiteur qui a une session Supabase active
-- dans son navigateur (rôle `authenticated`, même s'il n'est pas admin) ne
-- voyait plus AUCUN contenu public (articles, témoignages, etc.) — RLS
-- filtre silencieusement, sans erreur, donc ça se manifeste juste par des
-- sections vides sur le site.
-- Correctif : on élargit chaque policy de lecture publique à `anon` ET
-- `authenticated`, pour que le contenu public reste visible par tout le
-- monde, connecté ou pas.
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

drop policy if exists "public read published articles" on articles;
create policy "public read published articles" on articles
  for select to anon, authenticated using (status = 'published');

drop policy if exists "public read pages" on pages;
create policy "public read pages" on pages
  for select to anon, authenticated using (status = 'published');

drop policy if exists "public read events" on events;
create policy "public read events" on events
  for select to anon, authenticated using (true);

drop policy if exists "public read media_items" on media_items;
create policy "public read media_items" on media_items
  for select to anon, authenticated using (true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials
  for select to anon, authenticated using (true);

drop policy if exists "public read partners" on partners;
create policy "public read partners" on partners
  for select to anon, authenticated using (true);

drop policy if exists "public read key_metrics" on key_metrics;
create policy "public read key_metrics" on key_metrics
  for select to anon, authenticated using (true);

drop policy if exists "public read about_content" on about_content;
create policy "public read about_content" on about_content
  for select to anon, authenticated using (true);

drop policy if exists "public read product_categories" on product_categories;
create policy "public read product_categories" on product_categories
  for select to anon, authenticated using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products
  for select to anon, authenticated using (true);

drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings
  for select to anon, authenticated using (true);

drop policy if exists "public read site-media" on storage.objects;
create policy "public read site-media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-media');

-- Idem pour page_content (créée dans 004_page_content.sql), si déjà exécutée
drop policy if exists "public read page_content" on page_content;
create policy "public read page_content" on page_content
  for select to anon, authenticated using (true);
