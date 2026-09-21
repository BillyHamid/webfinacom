import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import About from '../components/About';
import VideoText from '../components/VideoText';
import Footer from '../components/Footer';
import { usePageContent } from '../hooks/usePageContent';

export default function AboutPage() {
  const { text } = usePageContent('about');
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <MiniHero
        kicker={text('hero_kicker', 'Notre identité')}
        title={text('hero_title', 'Une finance proche, moderne et')}
        highlight={text('hero_highlight', 'durable')}
        description={text(
          'hero_description',
          "Découvrez l'histoire, la mission et les valeurs qui guident l'engagement de FINACOM auprès des communautés burkinabè."
        )}
        breadcrumb="À propos"
        images={['/about-hero-team.jpg', '/hero-about-2.jpg']}
      />
      <About />

      {/* ─── VideoText : "FINACOM" rempli avec une vidéo africaine ─── */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative h-[320px] sm:h-[440px] lg:h-[600px] xl:h-[700px] w-full">
          <VideoText
            src="https://videos.pexels.com/video-files/13020377/13020377-hd_1280_720_30fps.mp4"
            fontSize={22}
            fontWeight={900}
          >
            FINACOM
          </VideoText>
        </div>
      </section>

      <Footer />
    </div>
  );
}
