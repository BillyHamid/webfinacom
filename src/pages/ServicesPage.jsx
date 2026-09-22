import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Services from '../components/Services';
import Footer from '../components/Footer';
import { usePageContent } from '../hooks/usePageContent';

export default function ServicesPage() {
  const { text } = usePageContent('services');
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker={text('hero_kicker', 'Produits & Services')}
        title={text('hero_title', 'Une offre complète,')}
        highlight={text('hero_highlight', 'à votre service')}
        description={text(
          'hero_description',
          'Découvrez nos solutions d\'épargne, nos produits de crédit et nos services digitaux — pensés pour répondre à tous les besoins financiers.'
        )}
        breadcrumb="Nos produits et services"
        images={[
          text('hero_image_1', '/hero-services.jpg'),
          text('hero_image_2', '/hero-services-2.jpg'),
          text('hero_image_3', ''),
        ].filter(Boolean)}
      />
      <Services />
      <Footer />
    </div>
  );
}
