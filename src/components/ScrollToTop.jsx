import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — utilitaire qui force le scroll en haut de page à chaque
 * changement de route React Router. À monter une fois, à l'intérieur du
 * BrowserRouter.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
