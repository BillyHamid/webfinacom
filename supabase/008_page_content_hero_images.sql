-- ============================================================================
-- FINACOM — Ajoute les photos de fond des heros au contenu éditable
-- (nécessite que 004_page_content.sql et 007_page_content_all_pages.sql
-- aient déjà été exécutés)
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

insert into page_content (page, field_key, value) values
  ('home', 'hero_image_1', '/hero-about.jpg'),

  ('about', 'hero_image_1', '/about-hero-team.jpg'),
  ('about', 'hero_image_2', '/hero-about-2.jpg'),

  ('services', 'hero_image_1', '/hero-services.jpg'),
  ('services', 'hero_image_2', '/hero-services-2.jpg'),

  ('blog', 'hero_image_1', '/hero-blog.jpg'),

  ('media', 'hero_image_1', '/hero-media.jpg'),

  ('contact', 'hero_image_1', '/hero-contact.jpg')

on conflict (page, field_key) do nothing;
