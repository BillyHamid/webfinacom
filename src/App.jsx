import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages publiques
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';

// Utilitaires
import ScrollToTop from './components/ScrollToTop';

// Admin CMS
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import PagesManager from './admin/pages/PagesManager';
import NewsManager from './admin/pages/NewsManager';
import EventsManager from './admin/pages/EventsManager';
import SettingsPage from './admin/pages/SettingsPage';
import { DataProvider } from './admin/context/DataContext';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Site public — une page par rubrique */}
        <Route path="/" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/produits-et-services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/mediatheque" element={<MediaPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin CMS */}
        <Route
          path="/admin"
          element={
            <DataProvider>
              <AdminLayout />
            </DataProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesManager />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="events" element={<EventsManager />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
