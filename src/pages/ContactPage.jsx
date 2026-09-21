import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { usePageContent } from '../hooks/usePageContent';

export default function ContactPage() {
  const { text } = usePageContent('contact');
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker={text('hero_kicker', 'Nos agences')}
        title={text('hero_title', 'Une agence FINACOM')}
        highlight={text('hero_highlight', 'près de chez vous')}
        description={text(
          'hero_description',
          'Retrouvez-nous dans nos 8 agences entièrement interconnectées — à Ouagadougou et à Koudougou — pour effectuer vos opérations partout dans le réseau.'
        )}
        breadcrumb="Contact"
        imageUrl="/hero-contact.jpg"
      />
      <Contact />
      <Footer />
    </div>
  );
}
