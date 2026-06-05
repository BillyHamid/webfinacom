import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_IMAGE = '/hero-about.jpg';

// Mots rotatifs animés (identique à Hero 1)
const ROTATING_WORDS = ['projets,', 'rêves,', 'ambitions,', 'commerces,'];
const WORD_DURATION = 2800; // ms

export default function HeroEditorial() {
  const [loaded, setLoaded] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Rotation des mots dans le titre
  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length),
      WORD_DURATION
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-primary-900 flex items-center"
    >
      {/* ── Photo de fond avec Ken Burns ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900" />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: loaded ? 'scale(1.08)' : 'scale(1.02)',
            transition: 'transform 20000ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Voiles sombres pour la lisibilité — pas teintés vert */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* ── Accent vertical doré à gauche ── */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-400/40 to-transparent hidden lg:block" />
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-px h-28 bg-gradient-to-b from-transparent via-accent-400 to-transparent hidden lg:block" />


      {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-32">
        <div className="max-w-4xl">
          {/* Kicker */}
          <div
            className="inline-flex items-center gap-3 mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease-out 400ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 400ms',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
            </span>
            <span className="text-accent-400 text-[11px] uppercase tracking-[0.35em] font-bold">
              Microfinance moderne · Burkina Faso
            </span>
          </div>

          {/* Titre éditorial massif — avec mot rotatif animé */}
          <h1
            className="text-white font-extrabold tracking-tight leading-[0.95] mb-10"
            style={{ letterSpacing: '-0.035em' }}
          >
            {/* Ligne 1 — "Faire grandir" */}
            <div className="overflow-hidden" style={{ paddingBottom: '0.1em' }}>
              <span
                className="inline-block text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.75rem]"
                style={{
                  transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                  opacity: loaded ? 1 : 0,
                  transition:
                    'transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, opacity 700ms ease-out 600ms',
                }}
              >
                Faire grandir
              </span>
            </div>

            {/* Ligne 2 — "vos [mot rotatif]" */}
            <div className="overflow-hidden" style={{ paddingBottom: '0.1em' }}>
              <span
                className="inline-block text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.75rem]"
                style={{
                  transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                  opacity: loaded ? 1 : 0,
                  transition:
                    'transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 780ms, opacity 700ms ease-out 780ms',
                }}
              >
                vos{' '}
                <span
                  className="relative inline-block align-baseline overflow-hidden"
                  style={{
                    minWidth: '11ch',
                    height: '1.05em',
                    verticalAlign: 'bottom',
                  }}
                >
                  {ROTATING_WORDS.map((w, i) => (
                    <span
                      key={w}
                      className="absolute left-0 top-0 whitespace-nowrap"
                      style={{
                        opacity: i === wordIdx ? 1 : 0,
                        transform: `translateY(${
                          i === wordIdx ? '0' : i < wordIdx ? '-40%' : '40%'
                        })`,
                        transition:
                          'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </span>
              </span>
            </div>

            {/* Ligne 3 — "ensemble." en accent italique doré */}
            <div className="overflow-hidden" style={{ paddingBottom: '0.1em' }}>
              <span
                className="inline-block"
                style={{
                  transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                  opacity: loaded ? 1 : 0,
                  transition:
                    'transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 960ms, opacity 700ms ease-out 960ms',
                }}
              >
                <span className="relative inline-block">
                  <span
                    className="text-accent-400 italic"
                    style={{
                      fontSize: 'calc(1.05 * (2.75rem))',
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    <span className="text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.75rem]">
                      ensemble
                    </span>
                  </span>
                  {/* Soulignement doré qui se dessine */}
                  <svg
                    className="absolute left-0 -bottom-2 w-full"
                    viewBox="0 0 300 14"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{ height: '0.18em' }}
                  >
                    <path
                      d="M2 7 Q 80 2 150 6 T 298 5"
                      stroke="#f6b93b"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="380"
                      strokeDashoffset={loaded ? 0 : 380}
                      style={{
                        transition:
                          'stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1) 1500ms',
                      }}
                    />
                  </svg>
                </span>
                <span className="text-white text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.75rem]">
                  .
                </span>
              </span>
            </div>
          </h1>

          {/* Texte éditorial */}
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-7">
              <p
                className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition:
                    'opacity 800ms ease-out 1200ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms',
                }}
              >
                Chaque franc épargné. Chaque crédit accordé. Chaque commerce
                financé. <span className="text-accent-400 font-semibold">FINACOM</span>{' '}
                accompagne les Burkinabè vers l'autonomie financière depuis
                plus de 50 ans.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 hidden lg:flex items-end">
              <div
                className="border-l-2 border-accent-400/40 pl-4 italic text-white/55 text-sm leading-relaxed"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateX(0)' : 'translateX(20px)',
                  transition:
                    'opacity 800ms ease-out 1400ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1400ms',
                }}
              >
                « Une institution de microfinance moderne au service du
                développement. »
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-start"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 800ms ease-out 1500ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1500ms',
            }}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-5 rounded-md bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-base lg:text-lg transition-all duration-300 shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Ouvrir un compte</span>
              <ArrowRight
                size={20}
                className="relative transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-6 py-5 text-white font-semibold text-base lg:text-lg transition-all duration-300"
            >
              <span className="relative">
                Découvrir nos solutions
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent-400 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
              </span>
              <ArrowRight
                size={18}
                className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════ SCROLL INDICATOR BAS-DROITE ═══════════ */}
      <a
        href="#about"
        className="absolute bottom-8 right-4 sm:right-6 lg:right-12 z-10 group hidden md:flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 800ms ease-out 2200ms',
        }}
      >
        <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold rotate-90 mb-8 origin-center group-hover:text-accent-400 transition-colors">
          Découvrir
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent-400/40 to-accent-400 animate-pulse" />
        <ChevronDown
          size={16}
          className="text-accent-400 animate-bounce group-hover:scale-110 transition-transform"
        />
      </a>
    </section>
  );
}
