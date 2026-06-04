import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Media from '../components/Media';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker="Médiathèque"
        title="Explorez l'univers FINACOM"
        highlight="en images"
        description="Vidéos institutionnelles, reportages photos et documents officiels — toutes les ressources pour mieux connaître FINACOM."
        breadcrumb="Médiathèque"
        imageUrl="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80"
      />
      <Media />
      <CTABanner />
      <Footer />
    </div>
  );
}
