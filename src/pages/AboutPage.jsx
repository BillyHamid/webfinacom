import Navbar from '../components/Navbar';
import MiniHero from '../components/MiniHero';
import About from '../components/About';
import VideoText from '../components/VideoText';
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
