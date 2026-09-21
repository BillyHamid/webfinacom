-- ============================================================================
-- FINACOM — Contenu éditable des 5 pages restantes (À propos, Produits &
-- Services, Blog, Médiathèque, Contact) — même principe que 004_page_content.sql
-- pour l'accueil. Réutilise la table page_content (déjà créée + RLS en place).
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

insert into page_content (page, field_key, value) values
  -- ── À propos ──────────────────────────────────────────────────────────
  ('about', 'hero_kicker', 'Notre identité'),
  ('about', 'hero_title', 'Une finance proche, moderne et'),
  ('about', 'hero_highlight', 'durable'),
  ('about', 'hero_description', 'Découvrez l''histoire, la mission et les valeurs qui guident l''engagement de FINACOM auprès des communautés burkinabè.'),
  ('about', 'mission_heading', 'Améliorer les conditions de vie par une finance utile.'),
  ('about', 'mission_body', 'FINACOM contribue à améliorer les conditions de vie de ses clients et usagers — urbains comme ruraux — à travers une offre rentable et pérenne de produits et services financiers souples, modernes et accessibles à tous.'),
  ('about', 'mission_quote', 'Une institution de microfinance moderne au service du développement.'),
  ('about', 'mission_ancrage_heading', 'Branche financière de la FEME'),
  ('about', 'mission_ancrage_body', 'FINACOM est une association ayant pour objet la collecte de l''épargne et l''octroi de crédit. Sa structure mère est l''ODE, ONG de développement créée en 1972 par la FEME.'),
  ('about', 'history_heading', 'Cinquante ans au service du développement.'),
  ('about', 'history_body', 'De la création de l''ODE en 1972 à FINACOM aujourd''hui — un demi-siècle d''engagement au cœur des communautés burkinabè.'),
  ('about', 'leader_quote', 'Notre mission dépasse la microfinance. Nous portons l''espoir d''une autonomie financière digne pour chaque foyer burkinabè — qu''il vienne du marché de Ouagadougou, des plaines de Koudougou ou de la diaspora.'),
  ('about', 'leader_name', 'Direction Générale FINACOM'),
  ('about', 'values_heading', 'Trois principes qui guident chacun de nos actes.'),
  ('about', 'values_body', 'Notre engagement chrétien et notre vocation sociale convergent vers une finance pensée pour servir, pas pour exploiter.'),
  ('about', 'governance_heading', 'Une gouvernance ancrée et claire.'),
  ('about', 'governance_body', 'FINACOM s''inscrit dans une lignée institutionnelle solide qui garantit sa mission et ses valeurs.'),
  ('about', 'axes_heading', 'Trois priorités pour 2024–2028.'),
  ('about', 'regions_heading', 'Présents au cœur des communautés.'),
  ('about', 'regions_body', '8 agences interconnectées au Burkina Faso — vous trouvez toujours FINACOM près de chez vous.'),
  ('about', 'cta_heading', 'Prêt à faire grandir vos projets avec FINACOM ?'),
  ('about', 'cta_body', 'Découvrez notre gamme complète de produits et services — épargne, crédit, mobile banking — et trouvez la solution adaptée à votre vie.'),

  -- ── Produits & Services ──────────────────────────────────────────────
  ('services', 'hero_kicker', 'Produits & Services'),
  ('services', 'hero_title', 'Une offre complète,'),
  ('services', 'hero_highlight', 'à votre service'),
  ('services', 'hero_description', 'Découvrez nos solutions d''épargne, nos produits de crédit et nos services digitaux — pensés pour répondre à tous les besoins financiers.'),
  ('services', 'intro_heading', 'Une offre complète, au service de vos projets.'),
  ('services', 'intro_body', 'FINACOM structure son offre autour de quatre familles de produits et services, pensées pour répondre à tous les besoins financiers — du particulier à l''entreprise.'),
  ('services', 'process_heading', 'Souscrire à un produit FINACOM, en 4 étapes.'),
  ('services', 'process_body', 'De la première question au premier versement — un parcours simple, rapide et accompagné.'),
  ('services', 'faq_heading', 'Tout ce qu''il faut savoir, simplement.'),

  -- ── Blog ──────────────────────────────────────────────────────────────
  ('blog', 'hero_kicker', 'Blog & Actualités'),
  ('blog', 'hero_title', 'L''actualité'),
  ('blog', 'hero_highlight', 'FINACOM'),
  ('blog', 'hero_description', 'Suivez nos dernières actualités, nos événements et toute la vie du réseau FINACOM — au cœur des communautés burkinabè.'),
  ('blog', 'news_heading', 'Dernières nouvelles'),

  -- ── Médiathèque ───────────────────────────────────────────────────────
  ('media', 'hero_kicker', 'Médiathèque'),
  ('media', 'hero_title', 'Explorez l''univers FINACOM'),
  ('media', 'hero_highlight', 'en images'),
  ('media', 'hero_description', 'Vidéos institutionnelles, reportages photos et documents officiels — toutes les ressources pour mieux connaître FINACOM.'),
  ('media', 'media_heading', 'Explorez l''univers FINACOM en images.'),
  ('media', 'media_body', 'Vidéos institutionnelles, reportages photos et documents officiels — toutes les ressources pour mieux connaître FINACOM et ses produits.'),

  -- ── Contact ───────────────────────────────────────────────────────────
  ('contact', 'hero_kicker', 'Nos agences'),
  ('contact', 'hero_title', 'Une agence FINACOM'),
  ('contact', 'hero_highlight', 'près de chez vous'),
  ('contact', 'hero_description', 'Retrouvez-nous dans nos 8 agences entièrement interconnectées — à Ouagadougou et à Koudougou — pour effectuer vos opérations partout dans le réseau.'),
  ('contact', 'info_heading', 'Une agence FINACOM près de chez vous.'),
  ('contact', 'info_body', 'Retrouvez-nous dans 8 agences entièrement interconnectées — à Ouagadougou et à Koudougou — pour effectuer vos opérations dans tout le réseau FINACOM.'),
  ('contact', 'network_heading', '8 agences entièrement interconnectées.')

on conflict (page, field_key) do nothing;
