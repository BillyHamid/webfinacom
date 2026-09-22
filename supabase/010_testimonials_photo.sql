-- ============================================================================
-- FINACOM — Ajoute une photo optionnelle à chaque témoignage
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

alter table testimonials add column if not exists photo_url text;
