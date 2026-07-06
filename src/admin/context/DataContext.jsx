import { createContext, useContext, useState } from 'react';

// Les actualités et événements sont désormais gérés via Supabase
// (voir src/hooks/useSupabaseTable.js). Ce contexte ne conserve que
// les pages, en attendant leur migration (voir supabase/schema.sql, table `pages`).
const initialPages = [
  { id: 1, title: 'Accueil', slug: '/', status: 'published', lastEdit: '14 Avr 2026', author: 'Admin', views: 4520 },
  { id: 2, title: 'À propos', slug: '/a-propos', status: 'published', lastEdit: '12 Avr 2026', author: 'Admin', views: 1230 },
  { id: 3, title: 'Services', slug: '/services', status: 'published', lastEdit: '10 Avr 2026', author: 'Aminata O.', views: 2180 },
  { id: 4, title: 'Contact', slug: '/contact', status: 'published', lastEdit: '8 Avr 2026', author: 'Admin', views: 980 },
  { id: 5, title: 'Tarifs 2026', slug: '/tarifs', status: 'draft', lastEdit: '14 Avr 2026', author: 'Ibrahim S.', views: 0 },
  { id: 6, title: 'Recrutement', slug: '/recrutement', status: 'draft', lastEdit: '13 Avr 2026', author: 'Fatimata K.', views: 0 },
];

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [pages, setPages] = useState(initialPages);

  return (
    <DataContext.Provider value={{ pages, setPages }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
