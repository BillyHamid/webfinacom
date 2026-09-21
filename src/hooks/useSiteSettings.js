import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DEFAULT_GENERAL = {
  site_name: 'FINACOM',
  description: 'Institution de microfinance moderne, agréée BCEAO. Branche financière de la FEME, au service du développement burkinabè.',
  email: 'contact@finacom.bf',
  phone: '+226 25 00 00 00',
  address: '01 BP 1234 Ouagadougou 01, Burkina Faso',
  logo_url: '/logo-finacom-removebg-preview.png',
};

/**
 * useSiteSettings — coordonnées, nom du site et logo, tels que définis dans
 * Paramètres → Général (table site_settings, clé "general"). Repli sur les
 * valeurs actuelles codées en dur tant que la base n'a pas répondu ou si un
 * champ est vide — le site ne casse jamais, même sans backend disponible.
 */
export function useSiteSettings() {
  const [general, setGeneral] = useState(DEFAULT_GENERAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general')
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn('Paramètres du site indisponibles, repli sur les valeurs par défaut :', error.message);
        } else if (data?.value) {
          setGeneral((g) => {
            const merged = { ...g };
            Object.entries(data.value).forEach(([key, value]) => {
              if (value && String(value).trim()) merged[key] = value;
            });
            return merged;
          });
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { general, loading };
}
