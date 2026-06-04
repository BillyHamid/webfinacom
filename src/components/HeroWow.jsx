import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const HERO_IMAGE = '/hero-services.jpg';

// Mots du titre kinétique
const TITLE_WORDS = [
  { text: 'Bâtissons.', accent: false },
  { text: 'Investissons.', accent: false },
  { text: 'Grandissons.', accent: false },
  { text: 'Ensemble.', accent: true },
];

export default function HeroWow() {
  const [loaded, setLoaded] = useState(false);
  const [savingsAmount, setSavingsAmount] = useState(1247850348);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Compteur "live" qui augmente lentement
  useEffect(() => {
    const t = setInterval(() => {
      setSavingsAmount((prev) => prev + Math.floor(Math.random() * 50000) + 10000);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  // Mouse-tracking pour parallaxe + spotlight
  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const formatNum = (n) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-black flex items-center"
    >
      {/* ═══════════ FOND CINÉMATIQUE ═══════════ */}

      {/* Photo droite full-bleed */}
      <div className="absolute inset-0">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-black" />

        {/* Photo principale (côté droit) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: loaded ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 20000ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Voile sombre côté gauche pour transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        </div>

        {/* Voile global pour profondeur */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Mesh gradient animé (mouse-tracking) */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212,160,23,0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Grille fine */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Bandes cinemascope */}
        <div
          className="absolute top-0 left-0 right-0 h-8 lg:h-12 bg-black z-[5] pointer-events-none"
          style={{
            transform: loaded ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-8 lg:h-12 bg-black z-[5] pointer-events-none"
          style={{
            transform: loaded ? 'translateY(100%)' : 'translateY(0)',
            transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      {/* ═══════════ PARTICULES DORÉES ═══════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => {
          const left = (i * 47 + 13) % 100;
          const top = (i * 71 + 7) % 100;
          const delay = (i * 0.3) % 8;
          const size = i % 4 === 0 ? 4 : i % 2 === 0 ? 2 : 1.5;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-accent-400"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.5,
                animation: `sparkle 4.5s ease-in-out ${delay}s infinite`,
                boxShadow: '0 0 12px rgba(246, 185, 59, 0.6)',
              }}
            />
          );
        })}
      </div>

      {/* ═══════════ MASTHEAD MAGAZINE ═══════════ */}
      <div
        className="absolute top-24 left-0 right-0 z-10 px-4 sm:px-6 lg:px-12 hidden md:block"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 900ms ease-out 300ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 300ms',
        }}
      >
        <div className="flex items-center justify-between border-y border-white/15 py-3">
          <div className="flex items-center gap-4">
            <div className="text-accent-400 text-[10px] uppercase tracking-[0.4em] font-extrabold">
              FINACOM
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="text-white/40 text-[9px] uppercase tracking-[0.3em]">
              L'épargne nouvelle
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white/40 text-[9px] uppercase tracking-[0.3em]">
              Édition 2025 · Vol. 01
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5 text-accent-400 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400" />
              </span>
              EN LIGNE
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-32 lg:pt-40 pb-32 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Texte gauche */}
          <div className="lg:col-span-7">
            {/* Kicker */}
            <div
              className="inline-flex items-center gap-3 mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 800ms ease-out 600ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms',
              }}
            >
              <Sparkles size={14} className="text-accent-400" />
              <span className="text-accent-400 text-[10px] uppercase tracking-[0.4em] font-extrabold">
                La microfinance qui change tout
              </span>
            </div>

            {/* TITRE KINÉTIQUE — 4 mots qui apparaissent en cascade */}
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.04em] mb-10">
              {TITLE_WORDS.map((word, i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ paddingBottom: '0.05em' }}
                >
                  <span
                    className="inline-block"
                    style={{
                      transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                      opacity: loaded ? 1 : 0,
                      transition: `transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${800 + i * 200}ms, opacity 700ms ease-out ${800 + i * 200}ms`,
                    }}
                  >
                    {word.accent ? (
                      <span className="relative inline-block">
                        <span
                          className="text-accent-400 text-[3rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem]"
                          style={{ letterSpacing: '-0.05em' }}
                        >
                          {word.text}
                        </span>
                        {/* Glow doré derrière */}
                        <span
                          className="absolute inset-0 text-accent-400 blur-2xl opacity-50 text-[3rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem] pointer-events-none"
                          aria-hidden="true"
                        >
                          {word.text}
                        </span>
                      </span>
                    ) : (
                      <span
                        className="text-white text-[3rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem]"
                        style={{ letterSpacing: '-0.05em' }}
                      >
                        {word.text}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </h1>

            {/* Description */}
            <p
              className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 800ms ease-out 1700ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1700ms',
              }}
            >
              Microfinance moderne au service du développement.
              <span className="text-accent-400 font-semibold"> 50 ans</span> d'engagement
              pour faire grandir vos projets, au Burkina Faso et au-delà.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 items-start"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 800ms ease-out 1900ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1900ms',
              }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-5 rounded-md bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-base lg:text-lg transition-all duration-300 shadow-[0_20px_50px_-12px_rgba(212,160,23,0.5)] hover:shadow-[0_25px_60px_-12px_rgba(212,160,23,0.7)] hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                {/* Sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Ouvrir un compte</span>
                <ArrowRight
                  size={20}
                  className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
              <a
                href="#services"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-5 rounded-md border border-white/30 hover:border-accent-400 hover:bg-white/[0.04] text-white font-semibold text-base lg:text-lg backdrop-blur-sm transition-all duration-300"
              >
                <span>Découvrir nos solutions</span>
                <ArrowRight
                  size={18}
                  className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* ═══════════ CARTE 3D FLOTTANTE ═══════════ */}
          <div
            className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 1200ms ease-out 1500ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) 1500ms',
            }}
          >
            <div
              className="relative"
              style={{ perspective: '1500px' }}
            >
              {/* Halo doré derrière */}
              <div className="absolute inset-0 bg-accent-500/20 rounded-3xl blur-[80px] scale-110" />

              {/* Carte 3D animée */}
              <div
                className="relative w-[320px] h-[200px]"
                style={{
                  animation: 'cardFloat 8s ease-in-out infinite, cardRotate 16s linear infinite',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${(mousePos.x - 0.5) * 20}deg) rotateX(${(0.5 - mousePos.y) * 10}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-6 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden">
                  {/* Pattern décoratif */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        'radial-gradient(circle at 80% 20%, rgba(212,160,23,0.5) 0%, transparent 50%)',
                    }}
                  />
                  <svg
                    className="absolute right-0 top-0 w-2/3 h-full opacity-[0.08]"
                    viewBox="0 0 200 120"
                    fill="none"
                  >
                    <circle cx="180" cy="20" r="60" stroke="white" strokeWidth="0.5" />
                    <circle cx="180" cy="20" r="40" stroke="white" strokeWidth="0.5" />
                    <circle cx="180" cy="20" r="20" stroke="white" strokeWidth="0.5" />
                  </svg>

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div>
                      <div className="text-white/50 text-[9px] uppercase tracking-widest mb-1">
                        FINACOM
                      </div>
                      <div className="text-white font-bold text-sm">Carte Avenir</div>
                    </div>
                    <img
                      src="/logo-finacom.png"
                      alt=""
                      className="h-7 w-auto opacity-90"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>

                  {/* Puce */}
                  <div className="relative w-10 h-7 rounded bg-gradient-to-br from-accent-300 to-accent-600 mb-4 shadow-inner">
                    <div className="absolute inset-1 rounded-sm border border-accent-700/30 grid grid-cols-3 grid-rows-3 gap-px">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-accent-700/20" />
                      ))}
                    </div>
                  </div>

                  {/* Numéro */}
                  <div className="relative text-white/90 font-mono text-sm tracking-[0.2em] mb-3">
                    •••• &nbsp; •••• &nbsp; •••• &nbsp; 2024
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-end justify-between">
                    <div>
                      <div className="text-white/40 text-[8px] uppercase tracking-wider mb-0.5">
                        Titulaire
                      </div>
                      <div className="text-white text-[11px] font-semibold">
                        VOTRE NOM
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-accent-500/80" />
                      <div className="w-5 h-5 rounded-full bg-primary-300/60 -ml-3" />
                    </div>
                  </div>

                  {/* Reflet de lumière qui passe */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                      animation: 'shimmer 6s linear infinite',
                    }}
                  />
                </div>
              </div>

              {/* Petite carte 2 derrière (effet stack) */}
              <div
                className="absolute top-6 -right-6 w-[280px] h-[176px] rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 -z-10 shadow-2xl opacity-70"
                style={{
                  animation: 'cardFloat 8s ease-in-out -2s infinite',
                  transform: 'rotate(8deg)',
                }}
              />
              <div
                className="absolute -top-4 -left-4 w-[280px] h-[176px] rounded-2xl bg-primary-600 -z-20 shadow-xl opacity-30"
                style={{
                  animation: 'cardFloat 8s ease-in-out -4s infinite',
                  transform: 'rotate(-6deg)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ TICKER LIVE BAS ═══════════ */}
      <div
        className="absolute bottom-16 lg:bottom-20 left-0 right-0 z-10 px-4 sm:px-6 lg:px-12"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 800ms ease-out 2300ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 2300ms',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <div>
                <div className="text-emerald-400 text-[9px] uppercase tracking-[0.3em] font-bold mb-0.5">
                  Live · Épargne collectée 2025
                </div>
                <div className="text-white font-extrabold text-lg sm:text-xl lg:text-2xl tabular-nums tracking-tight">
                  {formatNum(savingsAmount)}{' '}
                  <span className="text-accent-400 text-base font-bold">FCFA</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <div className="text-accent-400 font-extrabold text-lg tabular-nums">50K+</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">Clients</div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <div className="text-accent-400 font-extrabold text-lg tabular-nums">13</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">Régions</div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <div className="text-accent-400 font-extrabold text-lg tabular-nums">97,3%</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">Remboursement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ SCROLL INDICATOR ═══════════ */}
      <a
        href="#about"
        className="absolute bottom-3 lg:bottom-3 left-1/2 -translate-x-1/2 z-10 group flex items-center gap-2 text-white/50 hover:text-accent-400 transition-colors"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 800ms ease-out 2600ms',
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
          Faire défiler
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
