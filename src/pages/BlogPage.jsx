import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import News from '../components/News';
import Events from '../components/Events';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker="Blog & Actualités"
        title="L'actualité"
        highlight="FINACOM"
        description="Suivez nos dernières actualités, nos événements et toute la vie du réseau FINACOM — au cœur des communautés burkinabè."
        breadcrumb="Blog"
        imageUrl="https://images.unsplash.com/photo-1573164574001-518958d9baa2?auto=format&fit=crop&w=2000&q=80"
      />
      <News />
      <Events />
      <CTABanner />
      <Footer />
    </div>
  );
}
