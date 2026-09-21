import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker="Nos agences"
        title="Une agence FINACOM"
        highlight="près de chez vous"
        description="Retrouvez-nous dans nos 8 agences entièrement interconnectées — à Ouagadougou et à Koudougou — pour effectuer vos opérations partout dans le réseau."
        breadcrumb="Contact"
        imageUrl="/hero-contact.jpg"
      />
      <Contact />
      <Footer />
    </div>
  );
}
