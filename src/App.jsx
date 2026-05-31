import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public site
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Services from './components/Services';
import About from './components/About';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';
import News from './components/News';
import Events from './components/Events';
import QuickAccess from './components/QuickAccess';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

// Admin CMS
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import PagesManager from './admin/pages/PagesManager';
import NewsManager from './admin/pages/NewsManager';
import EventsManager from './admin/pages/EventsManager';
import SettingsPage from './admin/pages/SettingsPage';
import { DataProvider } from './admin/context/DataContext';

function HomePage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <About />
      <Metrics />
      <Testimonials />
      <News />
      <Events />
      <QuickAccess />
      <CTABanner />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/" element={<HomePage />} />

        {/* Admin CMS */}
        <Route path="/admin" element={<DataProvider><AdminLayout /></DataProvider>}>
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
