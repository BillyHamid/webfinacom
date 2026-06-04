import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';

// TODO: Remplacer par des photos professionnelles FINACOM en haute résolution
// Format recommandé : paysage 16:9 ou plus large, min 1920×1080px
// Sujets : scènes communautaires, marché, entrepreneurs, équipe locale, agence
const HERO_BG_URLS = [
  'https://images.unsplash.com/photo-1573164574001-518958d9baa2?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80',
];

const BG_ROTATION_INTERVAL = 6000; // ms

export default function HeroFullBleed() {
  const [loaded, setLoaded] = useState(false);
  const [activeBg, setActiveBg] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Rotation automatique des fonds (pause au survol)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActiveBg((i) => (i + 1) % HERO_BG_URLS.length),
      BG_ROTATION_INTERVAL
    );
    return () => clearInterval(t);
  }, [paused]);

  const fade = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translate3d(0,0,0)' : 'translate3d(0,24px,0)',
    transition: `opacity 900ms ease-out ${ms}ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${ms}ms`,
  });

  return (
    <section
      id="hero-v2"
      className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ─── CAROUSEL DE PHOTOS PLEIN ÉCRAN ─── */}
      <div className="absolute inset-0">
        {/* Fallback gradient neutre */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />

        {/* Photos empilées avec crossfade + Ken Burns */}
        {HERO_BG_URLS.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Communauté FINACOM - scène ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === activeBg ? 1 : 0,
              transform: `scale(${i === activeBg ? 1.08 : 1})`,
              transition:
                'opacity 1400ms cubic-bezier(0.4, 0, 0.2, 1), transform 9000ms ease-out',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}

        {/* Overlays — gradient noir neutre pour lisibilité du texte (sans teinte verte) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* ─── INDICATEURS DE PAGINATION (cliquables) ─── */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        {HERO_BG_URLS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveBg(i)}
            className="group relative flex items-center justify-end gap-3"
            aria-label={`Afficher la photo ${i + 1}`}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                i === activeBg
                  ? 'text-accent-400 opacity-100 translate-x-0'
                  : 'text-white/0 opacity-0 translate-x-2 group-hover:text-white/60 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`block transition-all duration-500 ${
                i === activeBg
                  ? 'w-8 h-[2px] bg-accent-400'
                  : 'w-4 h-[2px] bg-white/30 group-hover:bg-white/60 group-hover:w-6'
              }`}
            />
          </button>
        ))}
      </div>

      {/* ─── CONTENU ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-3xl">
          {/* Kicker */}
          <div style={fade(80)} className="inline-flex items-center gap-3 mb-10">
            <span className="h-px w-12 bg-accent-400" />
            <span className="text-accent-400 text-[11px] uppercase tracking-[0.3em] font-semibold">
              Finance communautaire
            </span>
          </div>

          {/* Titre massif */}
          <h2
            style={fade(200)}
            className="text-white font-extrabold leading-[0.95] tracking-tight text-[3rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.25rem] mb-8"
          >
            Bâtir l'avenir,
            <br />
            <span className="text-accent-400">une communauté</span>
            <br />
            à la fois.
          </h2>

          {/* Lede */}
          <p
            style={fade(360)}
            className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 font-light"
          >
            Depuis 15 ans, FINACOM met l'épargne, le crédit et l'inclusion
            financière au service des Burkinabè — de Ouagadougou à la diaspora.
          </p>

          {/* CTAs */}
          <div
            style={fade(500)}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-md bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-base transition-all duration-300 shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Ouvrir un compte</span>
              <ArrowRight
                size={20}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-8 py-5 rounded-md border border-white/30 hover:border-white/60 hover:bg-white/[0.06] text-white font-semibold text-base transition-all duration-300 backdrop-blur-sm"
            >
              <span>Découvrir nos solutions</span>
              <ArrowRight
                size={18}
                className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ─── LIGNE DE CONFIANCE EN BAS ─── */}
      <div
        style={fade(680)}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 lg:gap-10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-accent-400 flex-shrink-0" />
                <span className="text-white/80 text-xs lg:text-sm font-medium">
                  Agréé <span className="text-white font-bold">BCEAO</span>
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/15" />
              <div className="text-white/80 text-xs lg:text-sm">
                <span className="text-white font-bold tabular-nums">50 000+</span> clients
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/15" />
              <div className="text-white/80 text-xs lg:text-sm">
                <span className="text-white font-bold tabular-nums">13</span> régions
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/15" />
              <div className="text-white/80 text-xs lg:text-sm">
                <span className="text-white font-bold tabular-nums">15</span> ans d'expertise
              </div>
            </div>

            <a
              href="#partners"
              className="hidden lg:flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors group"
            >
              <span>Découvrir</span>
              <ChevronDown
                size={14}
                className="animate-bounce group-hover:text-accent-400 transition-colors"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Accent vertical doré */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-accent-400 to-transparent opacity-60 hidden lg:block" />
    </section>
  );
}
