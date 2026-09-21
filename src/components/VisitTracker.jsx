import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * VisitTracker — enregistre une "page vue" à chaque navigation sur le site
 * public (jamais sur /admin/*). Composant invisible, à monter une seule
 * fois à la racine, à l'intérieur du <BrowserRouter>.
 */
export default function VisitTracker() {
  const location = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;

    supabase
      .from('site_visits')
      .insert({ path: location.pathname })
      .then(({ error }) => {
        if (error) {
          // Échec silencieux : le suivi de visite ne doit jamais gêner l'affichage du site.
          console.warn('Suivi de visite indisponible :', error.message);
        }
      });
  }, [location.pathname]);

  return null;
}
