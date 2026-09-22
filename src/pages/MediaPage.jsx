import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import Media from '../components/Media';
import Footer from '../components/Footer';
import { usePageContent } from '../hooks/usePageContent';

export default function MediaPage() {
  const { text } = usePageContent('media');
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker={text('hero_kicker', 'Médiathèque')}
        title={text('hero_title', "Explorez l'univers FINACOM")}
        highlight={text('hero_highlight', 'en images')}
        description={text(
          'hero_description',
          'Vidéos institutionnelles, reportages photos et documents officiels — toutes les ressources pour mieux connaître FINACOM.'
        )}
        breadcrumb="Médiathèque"
        images={[
          text('hero_image_1', '/hero-media.jpg'),
          text('hero_image_2', ''),
          text('hero_image_3', ''),
        ].filter(Boolean)}
      />
      <Media />
      <Footer />
    </div>
  );
}
