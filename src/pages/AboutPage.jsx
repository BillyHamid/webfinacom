import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import About from '../components/About';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker="Notre identité"
        title="Une finance proche, moderne et"
        highlight="durable"
        description="Découvrez l'histoire, la mission et les valeurs qui guident l'engagement de FINACOM auprès des communautés burkinabè depuis plus de 50 ans."
        breadcrumb="À propos"
        imageUrl="/hero-about.jpg"
      />
      <About />
      <CTABanner />
      <Footer />
    </div>
  );
}
