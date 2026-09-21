import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * usePageContent(page) — charge les textes éditables (titres/paragraphes)
 * d'une page depuis Supabase (table `page_content`).
 *
 * Renvoie une fonction `text(fieldKey, fallback)` : tant que la base n'a pas
 * répondu, ou si la ligne n'existe pas / est vide, elle renvoie `fallback`
 * (le texte actuellement codé en dur) — le site ne casse jamais, même sans
 * backend disponible.
 */
export function usePageContent(page) {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from('page_content')
      .select('field_key, value')
      .eq('page', page)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn('Contenu de page indisponible, repli sur le texte par défaut :', error.message);
          setValues({});
        } else {
          const map = {};
          (data || []).forEach((row) => {
            map[row.field_key] = row.value;
          });
          setValues(map);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const text = (fieldKey, fallback) => {
    const v = values[fieldKey];
    return v && v.trim() ? v : fallback;
  };

  return { text, loading };
}
