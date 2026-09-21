-- ============================================================================
-- FINACOM — Suivi du nombre de pages vues (visiteurs publics)
-- Nécessite que 002_restrict_write_to_admins.sql ait déjà été exécuté
-- (utilise la fonction is_admin() qu'il crée).
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  created_at timestamptz not null default now()
);

-- Index pour accélérer les comptages par période (aujourd'hui / ce mois-ci)
create index if not exists site_visits_created_at_idx on site_visits (created_at);

alter table site_visits enable row level security;

-- N'importe quel visiteur (anon) peut enregistrer UNE visite (insert seul) —
-- il ne peut ni lire, ni modifier, ni supprimer les visites existantes.
create policy "anon can log a visit" on site_visits
  for insert to anon
  with check (true);

-- Seuls les admins peuvent consulter et nettoyer l'historique des visites.
create policy "admin read visits" on site_visits
  for select to authenticated
  using (is_admin());

create policy "admin delete visits" on site_visits
  for delete to authenticated
  using (is_admin());
