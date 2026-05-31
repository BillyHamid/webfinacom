import { createContext, useContext, useState } from 'react';

const initialArticles = [
  { id: 1, title: 'FINACOM lance un programme d\'éducation financière', category: 'Inclusion', status: 'published', date: '12 Avr 2026', author: 'Aminata O.', views: 1420, image: true },
  { id: 2, title: 'Partenariat stratégique Mobile Banking', category: 'Innovation', status: 'published', date: '5 Avr 2026', author: 'Ibrahim S.', views: 980, image: true },
  { id: 3, title: 'Ouverture de 5 nouvelles agences', category: 'Développement', status: 'published', date: '28 Mars 2026', author: 'Admin', views: 2340, image: true },
  { id: 4, title: 'Formation sur la gestion des risques', category: 'Formation', status: 'draft', date: '14 Avr 2026', author: 'Moussa T.', views: 0, image: false },
  { id: 5, title: 'Bilan annuel 2025 : résultats records', category: 'Institution', status: 'draft', date: '13 Avr 2026', author: 'Admin', views: 0, image: true },
  { id: 6, title: 'Journée internationale de la microfinance', category: 'Événement', status: 'published', date: '2 Avr 2026', author: 'Fatimata K.', views: 560, image: true },
];

const initialEvents = [
  { id: 1, title: 'Forum de l\'Inclusion Financière 2026', date: '2026-04-22', time: '09:00 - 17:00', location: 'Ouagadougou', type: 'Conférence', capacity: 200, color: 'bg-primary-500' },
  { id: 2, title: 'Formation Gestion Financière PME', date: '2026-05-05', time: '08:30 - 13:00', location: 'Bobo-Dioulasso', type: 'Formation', capacity: 50, color: 'bg-accent-500' },
  { id: 3, title: 'Assemblée Générale Sociétaires', date: '2026-05-18', time: '10:00 - 15:00', location: 'Ouagadougou', type: 'Assemblée', capacity: 500, color: 'bg-blue-500' },
  { id: 4, title: 'Portes Ouvertes Nouvelles Agences', date: '2026-06-02', time: '08:00 - 18:00', location: 'Koudougou', type: 'Événement', capacity: 0, color: 'bg-emerald-500' },
];

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
  const [articles, setArticles] = useState(initialArticles);
  const [events, setEvents] = useState(initialEvents);
  const [pages, setPages] = useState(initialPages);

  return (
    <DataContext.Provider value={{ articles, setArticles, events, setEvents, pages, setPages }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
