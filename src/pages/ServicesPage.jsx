import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Services from '../components/Services';
import QuickAccess from '../components/QuickAccess';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker="Produits & Services"
        title="Une offre complète,"
        highlight="à votre service"
        description="Découvrez nos solutions d'épargne, nos produits de crédit et nos services digitaux — pensés pour répondre à tous les besoins financiers."
        breadcrumb="Nos produits et services"
        imageUrl="/hero-services.jpg"
      />
      <Services />
      <QuickAccess />
      <CTABanner />
      <Footer />
    </div>
  );
}
