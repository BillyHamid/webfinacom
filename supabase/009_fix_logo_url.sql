-- ============================================================================
-- FINACOM — Remet le vrai logo à la place de la photo de test uploadée
-- par erreur dans Paramètres → Général.
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

update site_settings
set value = jsonb_set(value, '{logo_url}', '"/logo-finacom-removebg-preview.png"')
where key = 'general';

-- Vérification : doit afficher la valeur ci-dessus
select value->>'logo_url' as logo_url from site_settings where key = 'general';
