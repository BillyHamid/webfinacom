import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase: variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquantes. Renseigne-les dans .env.local.'
  );
}

// Valeurs de repli tant que .env.local n'est pas renseigné : évite que
// createClient() lève une exception qui casserait tout l'arbre React
// (le site public doit pouvoir s'afficher même sans Supabase configuré).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export const MEDIA_BUCKET = 'site-media';
