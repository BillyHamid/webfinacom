-- ============================================================================
-- FINACOM — Ajoute marya.kamba@yahoo.fr comme administrateur
-- (nécessite que ce compte existe déjà dans auth.users, cf. Authentication → Users)
-- À exécuter en une seule fois dans Supabase Dashboard → SQL Editor → Run
-- ============================================================================

insert into admins (id)
select id from auth.users where email = 'marya.kamba@yahoo.fr'
on conflict (id) do nothing;

-- Vérification : doit renvoyer une ligne avec cet email si l'ajout a fonctionné
select a.id, u.email
from admins a
join auth.users u on u.id = a.id;
