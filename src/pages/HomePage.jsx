import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroEditorial from '../components/HeroEditorial';
import HeroWow from '../components/HeroWow';
import HeroLight from '../components/HeroLight';
import HeroOptions from '../components/HeroOptions';
import HeroMini from '../components/HeroMini';
import HeroFullBleed from '../components/HeroFullBleed';
import Services from '../components/Services';
import ServicesPreview from '../components/ServicesPreview';
import FinacomPlusShowcase from '../components/FinacomPlusShowcase';
import About from '../components/About';
import AboutPreview from '../components/AboutPreview';
import Testimonials from '../components/Testimonials';
import QuickAccess from '../components/QuickAccess';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <HeroEditorial />
      <HeroWow />
      <HeroLight />
      <HeroOptions />
      <HeroMini />
      <HeroFullBleed />
      <AboutPreview />
      <ServicesPreview />
      <FinacomPlusShowcase />
      <Testimonials />
      <QuickAccess />
      <CTABanner />
      <Footer />
    </div>
  );
}
