import Navbar from '../components/Navbar';
import HeroEditorial from '../components/HeroEditorial';
import ServicesPreview from '../components/ServicesPreview';
import FinacomPlusShowcase from '../components/FinacomPlusShowcase';
import AboutPreview from '../components/AboutPreview';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <HeroEditorial />
      <AboutPreview />
      <ServicesPreview />
      <FinacomPlusShowcase />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
