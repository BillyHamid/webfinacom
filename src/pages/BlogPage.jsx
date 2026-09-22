import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import News from '../components/News';
import Events from '../components/Events';
import Footer from '../components/Footer';
import { usePageContent } from '../hooks/usePageContent';

export default function BlogPage() {
  const { text } = usePageContent('blog');
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker={text('hero_kicker', 'Blog & Actualités')}
        title={text('hero_title', "L'actualité")}
        highlight={text('hero_highlight', 'FINACOM')}
        description={text(
          'hero_description',
          'Suivez nos dernières actualités, nos événements et toute la vie du réseau FINACOM — au cœur des communautés burkinabè.'
        )}
        breadcrumb="Blog"
        images={[
          text('hero_image_1', '/hero-blog.jpg'),
          text('hero_image_2', ''),
          text('hero_image_3', ''),
        ].filter(Boolean)}
      />
      <News />
      <Events />
      <Footer />
    </div>
  );
}
