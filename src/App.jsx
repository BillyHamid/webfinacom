import { useEffect, useState } from 'react';
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
import Loader from './components/Loader';

// Admin CMS
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import PagesManager from './admin/pages/PagesManager';
import NewsManager from './admin/pages/NewsManager';
import EventsManager from './admin/pages/EventsManager';
import MediaManager from './admin/pages/MediaManager';
import TestimonialsManager from './admin/pages/TestimonialsManager';
import PartnersManager from './admin/pages/PartnersManager';
import MetricsManager from './admin/pages/MetricsManager';
import SettingsPage from './admin/pages/SettingsPage';
import Login from './admin/pages/Login';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader label="FINACOM" />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Site public — une page par rubrique */}
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/produits-et-services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/mediatheque" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin CMS */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<PagesManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="media" element={<MediaManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="partners" element={<PartnersManager />} />
            <Route path="metrics" element={<MetricsManager />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
