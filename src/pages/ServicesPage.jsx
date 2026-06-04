import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Services from '../components/Services';
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
        imageUrl="https://images.unsplash.com/photo-1563132337-f159f484226c?auto=format&fit=crop&w=2000&q=80"
      />
      <Services />
      <Footer />
    </div>
  );
}
