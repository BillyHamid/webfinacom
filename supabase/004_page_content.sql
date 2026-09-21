-- ============================================================================
-- FINACOM — Contenu éditable des pages principales (titres/paragraphes clés)
-- Nécessite que 002_restrict_write_to_admins.sql ait déjà été exécuté
-- (utilise la fonction is_admin() qu'il crée).
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

create table if not exists page_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,        -- 'home', 'about', 'services'... (une seule page pour l'instant : 'home')
  field_key text not null,   -- identifiant du champ, ex. 'hero_heading'
  value text not null default '',
  updated_at timestamptz not null default now(),
  unique (page, field_key)
);

alter table page_content enable row level security;

-- Lecture publique (le site affiche ce contenu à tout le monde, connecté ou pas)
create policy "public read page_content" on page_content
  for select to anon, authenticated using (true);

-- Écriture réservée aux admins
create policy "admin write page_content" on page_content
  for all to authenticated
  using (is_admin())
  with check (is_admin());

-- ----------------------------------------------------------------------------
-- Valeurs de départ (reprennent le texte actuellement codé en dur sur l'accueil)
-- ----------------------------------------------------------------------------
insert into page_content (page, field_key, value) values
  ('home', 'hero_kicker', 'Microfinance moderne · Burkina Faso'),
  ('home', 'hero_body', 'Chaque franc épargné. Chaque crédit accordé. Chaque commerce financé. FINACOM accompagne les Burkinabè vers l''autonomie financière.'),
  ('home', 'hero_quote', 'Une institution de microfinance moderne au service du développement.'),
  ('home', 'about_heading', 'Une finance proche, moderne et durable.'),
  ('home', 'about_body', 'Depuis 1972 via l''ODE, et aujourd''hui en tant que branche financière de la FEME, FINACOM accompagne chaque Burkinabè — urbain comme rural — vers de meilleures conditions de vie grâce à des solutions d''épargne et de crédit modernes.'),
  ('home', 'about_quote', 'Une institution de microfinance moderne au service du développement.'),
  ('home', 'services_heading', 'Une offre structurée en 4 familles.'),
  ('home', 'digital_kicker', '100% Digital'),
  ('home', 'digital_heading', 'Votre banque dans votre poche.'),
  ('home', 'digital_body', 'Accédez à vos comptes, effectuez vos virements et payez vos factures depuis votre smartphone ou votre ordinateur. Simple, rapide, sécurisé.'),
  ('home', 'testimonials_heading', 'Ce que disent nos clients'),
  ('home', 'testimonials_body', 'Découvrez les témoignages de ceux qui ont fait confiance à FINACOM pour concrétiser leurs projets.'),
  ('home', 'cta_badge', 'Rejoignez plus de 50 000 clients satisfaits'),
  ('home', 'cta_heading', 'Ensemble, construisons votre avenir financier'),
  ('home', 'cta_body', 'Que vous soyez un particulier, un entrepreneur ou une association, FINACOM a la solution qu''il vous faut. Ouvrez votre compte dès aujourd''hui et rejoignez notre communauté.')
on conflict (page, field_key) do nothing;
