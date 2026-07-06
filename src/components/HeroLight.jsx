import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Check, ShieldCheck, ArrowDown } from 'lucide-react';

const HERO_IMAGE = '/hero-about.jpg';

export default function HeroLight() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-white flex items-center"
    >
      {/* ═══════════ BACKGROUND CLAIR ═══════════ */}

      {/* Base : crème lumineuse */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #ffffff 0%, #f8fbf5 40%, #fefaf0 100%)',
        }}
      />

      {/* Mesh gradient animé qui suit le curseur */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212,160,23,0.08) 0%, transparent 50%),
            radial-gradient(circle 700px at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, rgba(27,122,61,0.07) 0%, transparent 50%)
          `,
        }}
      />

      {/* Halos décoratifs fixes */}
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent-500/15 blur-[140px] pointer-events-none" />

      {/* Grille très subtile */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(27,122,61,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,61,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Logo FINACOM en filigrane énorme */}
      <div
        className="absolute -right-20 -bottom-20 lg:right-0 lg:bottom-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none select-none flex items-center justify-center"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px)`,
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <span className="text-[20rem] font-black text-primary-900 tracking-tighter">
          F
        </span>
      </div>

      {/* ═══════════ PARTICULES DORÉES ═══════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 53 + 11) % 100;
          const top = (i * 67 + 9) % 100;
          const delay = (i * 0.35) % 6;
          const size = i % 3 === 0 ? 4 : 2;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-accent-500"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.4,
                animation: `sparkle 4s ease-in-out ${delay}s infinite`,
                boxShadow: '0 0 10px rgba(212, 160, 23, 0.5)',
              }}
            />
          );
        })}
      </div>

      {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-32 lg:pt-36 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ─── COLONNE GAUCHE : TYPOGRAPHIE ─── */}
          <div className="lg:col-span-7">
            {/* Kicker premium */}
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-[0_4px_20px_rgba(27,122,61,0.08)] border border-primary-100 mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(-15px)',
                transition: 'opacity 700ms ease-out 200ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
              </span>
              <span className="text-primary-700 text-[11px] uppercase tracking-[0.25em] font-bold">
                Microfinance moderne · Burkina Faso
              </span>
              <Sparkles size={12} className="text-accent-500" />
            </div>

            {/* Titre éditorial — révélation cascade */}
            <h1 className="font-extrabold text-dark leading-[1.0] tracking-tight mb-10">
              <div
                className="overflow-hidden"
                style={{ paddingBottom: '0.05em' }}
              >
                <span
                  className="inline-block text-[2.75rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.75rem]"
                  style={{
                    letterSpacing: '-0.04em',
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 400ms, opacity 700ms ease-out 400ms',
                  }}
                >
                  Plus qu'une banque,
                </span>
              </div>
              <div
                className="overflow-hidden"
                style={{ paddingBottom: '0.05em' }}
              >
                <span
                  className="inline-block"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, opacity 700ms ease-out 600ms',
                  }}
                >
                  <span className="text-dark text-[2.75rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.75rem]" style={{ letterSpacing: '-0.04em' }}>
                    votre
                  </span>{' '}
                  <span className="relative inline-block">
                    <span
                      className="text-[2.75rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.75rem]"
                      style={{
                        background: 'linear-gradient(135deg, #1b7a3d 0%, #d4a017 60%, #f6b93b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      partenaire
                    </span>
                    {/* Soulignement doré qui se dessine */}
                    <svg
                      className="absolute left-0 -bottom-2 w-full pointer-events-none"
                      viewBox="0 0 300 14"
                      fill="none"
                      preserveAspectRatio="none"
                      style={{ height: '0.18em' }}
                    >
                      <path
                        d="M2 7 Q 80 2 150 6 T 298 5"
                        stroke="#d4a017"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="380"
                        strokeDashoffset={loaded ? 0 : 380}
                        style={{
                          transition:
                            'stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1) 1300ms',
                        }}
                      />
                    </svg>
                  </span>
                  <span className="text-dark text-[2.75rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.75rem]" style={{ letterSpacing: '-0.04em' }}>
                    .
                  </span>
                </span>
              </div>
            </h1>

            {/* Description */}
            <p
              className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 800ms ease-out 1100ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms',
              }}
            >
              Depuis <strong className="text-dark font-bold">50 ans</strong>, FINACOM accompagne
              chaque Burkinabè vers l'autonomie financière — avec des solutions{' '}
              <span className="text-primary-700 font-semibold">d'épargne</span>, de{' '}
              <span className="text-primary-700 font-semibold">crédit</span> et de{' '}
              <span className="text-primary-700 font-semibold">mobile banking</span>{' '}
              pensés pour vous.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 items-start mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 800ms ease-out 1300ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1300ms',
              }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-5 rounded-full bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 text-white font-bold text-base lg:text-lg transition-all duration-300 shadow-[0_20px_40px_-12px_rgba(27,122,61,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(27,122,61,0.7)] hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                {/* Sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Ouvrir un compte</span>
                <span className="relative w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center group-hover:bg-accent-400 group-hover:rotate-12 transition-all duration-300">
                  <ArrowRight size={16} className="text-primary-900" />
                </span>
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 px-6 py-5 text-dark font-semibold text-base lg:text-lg transition-all duration-300"
              >
                <span className="relative">
                  Découvrir nos solutions
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
                <ArrowRight size={18} className="text-primary-600 transition-all duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>

            {/* Trust badges horizontales */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 800ms ease-out 1500ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1500ms',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-primary-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  Agréé <strong className="text-dark">BCEAO</strong>
                </span>
              </div>
              <div className="w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-accent-50 flex items-center justify-center">
                  <Check size={14} className="text-accent-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  <strong className="text-dark">50 000+</strong> clients
                </span>
              </div>
              <div className="w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                  <Sparkles size={14} className="text-blue-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  <strong className="text-dark">8 agences</strong> au Burkina
                </span>
              </div>
            </div>
          </div>

          {/* ─── COLONNE DROITE : PHOTO + CARTE 3D ─── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
            {/* Carte FINACOM 3D floating en arrière-plan */}
            <div
              className="absolute z-0 hidden lg:block"
              style={{
                top: '15%',
                right: '-10%',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0) rotate(8deg)' : 'translateY(40px) rotate(8deg)',
                transition: 'opacity 1200ms ease-out 1500ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) 1500ms',
              }}
            >
              <div
                className="w-[260px] h-[164px] rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 shadow-[0_30px_60px_-15px_rgba(27,122,61,0.4)] border border-white/10 overflow-hidden"
                style={{
                  animation: 'cardFloat 8s ease-in-out infinite',
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1200px) rotateY(${(mousePos.x - 0.5) * 15}deg) rotateX(${(0.5 - mousePos.y) * 8}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background:
                      'radial-gradient(circle at 80% 20%, rgba(212,160,23,0.5) 0%, transparent 50%)',
                  }}
                />
                <div className="relative flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white/50 text-[8px] uppercase tracking-widest mb-0.5">
                      FINACOM
                    </div>
                    <div className="text-white font-bold text-xs">Carte Avenir</div>
                  </div>
                  <img
                    src="/logo-finacom-removebg-preview.png"
                    alt=""
                    className="h-6 w-auto opacity-90"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div className="relative w-8 h-6 rounded bg-gradient-to-br from-accent-300 to-accent-600 mb-3" />
                <div className="relative text-white/90 font-mono text-[11px] tracking-[0.2em] mb-2">
                  •••• •••• •••• 2024
                </div>
                <div className="relative flex items-end justify-between text-[8px]">
                  <span className="text-white">VOTRE NOM</span>
                  <div className="flex items-center gap-0.5">
                    <div className="w-4 h-4 rounded-full bg-accent-500/80" />
                    <div className="w-4 h-4 rounded-full bg-primary-300/60 -ml-2" />
                  </div>
                </div>
                {/* Shimmer */}
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

            {/* Photo principale dans cadre doré rond */}
            <div
              className="relative z-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-6deg)',
                transition: 'opacity 1200ms ease-out 800ms, transform 1400ms cubic-bezier(0.34, 1.56, 0.64, 1) 800ms',
              }}
            >
              {/* Halo doré derrière */}
              <div className="absolute inset-0 bg-accent-500/30 rounded-full blur-3xl scale-110" />

              {/* Cadre doré */}
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] xl:w-[440px] xl:h-[440px] rounded-full overflow-hidden">
                {/* Bord doré gradient */}
                <div className="absolute inset-0 rounded-full p-[6px] bg-gradient-to-br from-accent-300 via-accent-500 to-accent-700 shadow-[0_30px_80px_-15px_rgba(212,160,23,0.5)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={HERO_IMAGE}
                      alt="Cliente FINACOM"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        animation: 'cardFloat 10s ease-in-out infinite',
                        transform: loaded ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 25000ms ease-out',
                      }}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                </div>

                {/* Anneau extérieur doré (pointillé) */}
                <div
                  className="absolute -inset-3 rounded-full border-2 border-dashed border-accent-400/40"
                  style={{ animation: 'spin-slow 40s linear infinite' }}
                />
              </div>

              {/* Petit badge "Cliente FINACOM" */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white shadow-xl border border-gray-100 flex items-center gap-2 whitespace-nowrap"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
                  transition: 'opacity 800ms ease-out 2000ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 2000ms',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-dark">
                  Aïssata K., cliente depuis 2019
                </span>
              </div>

              {/* Badge stats flottant top-left */}
              <div
                className="absolute -top-4 -left-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 hidden sm:flex items-center gap-3"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'opacity 800ms ease-out 1800ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1800ms',
                  animation: loaded ? 'cardFloat 7s ease-in-out 2s infinite' : 'none',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-primary-700" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-0.5">
                    Agréé
                  </div>
                  <div className="text-dark font-extrabold text-sm leading-tight">
                    BCEAO
                  </div>
                </div>
              </div>

              {/* Badge stats flottant bottom-right */}
              <div
                className="absolute -bottom-2 -right-4 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl px-4 py-3 shadow-xl hidden sm:flex items-center gap-3"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 800ms ease-out 2200ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 2200ms',
                  animation: loaded ? 'cardFloat 8s ease-in-out 1s infinite reverse' : 'none',
                }}
              >
                <div>
                  <div className="text-[9px] uppercase tracking-wider font-bold text-white/70 leading-none mb-0.5">
                    Croissance
                  </div>
                  <div className="text-white font-extrabold text-xl leading-tight tabular-nums">
                    +23%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ SCROLL HINT ═══════════ */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 group flex flex-col items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 800ms ease-out 2400ms',
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
          Faire défiler
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
