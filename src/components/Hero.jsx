import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Quote } from 'lucide-react';

// ─── Témoignages rotatifs ────────────────────────────────────────────
// TODO: Remplacer photos & verbatim par les vraies clientes FINACOM
const TESTIMONIALS = [
  {
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1000&q=80',
    quote: "Avec le crédit commercial FINACOM, j'ai pu agrandir ma boutique.",
    name: 'Aïssata K.',
    role: 'Commerçante · Goughin',
  },
  {
    photo:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
    quote: "Le Daar daré me permet d'épargner chaque jour, à mon rythme.",
    name: 'Fatim T.',
    role: 'Artisane · Saaba',
  },
  {
    photo:
      'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1000&q=80',
    quote: "Le crédit agricole de campagne soutient mes récoltes chaque saison.",
    name: 'Boureima O.',
    role: 'Agriculteur · Koudougou',
  },
];

// ─── Mots rotatifs dans le titre ─────────────────────────────────────
const ROTATING_WORDS = ['projets,', 'rêves,', 'ambitions,', 'commerces,'];

const TESTIMONIAL_DURATION = 5500; // ms
const WORD_DURATION = 2800; // ms

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [activeSegment, setActiveSegment] = useState('particuliers');
  const [wordIdx, setWordIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Rotation des mots du titre
  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length),
      WORD_DURATION
    );
    return () => clearInterval(t);
  }, []);

  // Rotation des témoignages (pause au survol)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length),
      TESTIMONIAL_DURATION
    );
    return () => clearInterval(t);
  }, [paused]);

  const fade = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
    transition: `opacity 700ms ease-out ${ms}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${ms}ms`,
  });

  const segments = [
    { id: 'particuliers', label: 'Particuliers', desc: 'Épargne, crédit & compte courant' },
    { id: 'professionnels', label: 'Professionnels', desc: 'Artisans, commerçants & TPE' },
    { id: 'entreprises', label: 'Entreprises', desc: 'Financement PME & institutions' },
    { id: 'diaspora', label: 'Diaspora', desc: "Transferts & investissements à l'international" },
  ];

  return (
    <section id="hero" className="relative bg-primary-900 overflow-hidden">
      {/* ── Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1000px 700px at 15% 10%, rgba(27,122,61,0.55) 0%, transparent 60%), radial-gradient(ellipse 800px 600px at 95% 90%, rgba(212,160,23,0.14) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/80 pointer-events-none" />

      {/* ── Contenu ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-36 pb-12 lg:pb-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center lg:min-h-[calc(100vh-220px)]">
          {/* ─── COLONNE GAUCHE ─── */}
          <div className="lg:col-span-7">
            {/* Titre — avec mot rotatif */}
            <h1
              style={fade(180)}
              className="text-white font-extrabold leading-[1.02] tracking-tight text-[2.5rem] sm:text-[3.25rem] lg:text-[4.25rem] xl:text-[4.5rem] mb-7"
            >
              Faire grandir
              <br />
              vos{' '}
              <span
                className="relative inline-block align-baseline overflow-hidden"
                style={{
                  minWidth: '10ch',
                  height: '1.1em',
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
              <br />
              <span className="text-accent-400 relative inline-block">
                ensemble
                {/* Soulignement animé qui se dessine */}
                <svg
                  className="absolute left-0 -bottom-1 lg:-bottom-2 w-full pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: '0.4em' }}
                >
                  <path
                    d="M2 7 Q 50 2 100 5 T 198 4"
                    stroke="#f6b93b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="280"
                    strokeDashoffset={loaded ? 0 : 280}
                    style={{
                      transition:
                        'stroke-dashoffset 1300ms cubic-bezier(0.65, 0, 0.35, 1) 1200ms',
                    }}
                  />
                </svg>
              </span>
              .
            </h1>

            {/* Lede */}
            <p
              style={fade(280)}
              className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-10"
            >
              FINACOM accompagne chaque foyer burkinabè — <strong className="text-white/90 font-semibold">urbain comme rural</strong> —
              vers de meilleures conditions de vie, grâce à une offre rentable, pérenne et résolument
              moderne de produits et services financiers.
            </p>

            {/* CTAs */}
            <div
              style={fade(380)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 lg:mb-14"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-[15px] transition-all duration-300 shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                {/* Brillance qui passe au survol */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Ouvrir un compte</span>
                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md border border-white/25 hover:border-white/50 hover:bg-white/[0.04] text-white font-semibold text-[15px] transition-all duration-300"
              >
                Découvrir nos solutions
              </a>
            </div>

          </div>

          {/* ─── COLONNE DROITE — Carousel de témoignages ─── */}
          <div
            className="lg:col-span-5 relative hidden lg:block"
            style={fade(320)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              {/* Halo */}
              <div
                className="absolute -inset-4 bg-accent-500/10 rounded-[2rem] blur-3xl"
                style={{
                  animation: 'pulse-glow 4s ease-in-out infinite',
                }}
              />

              {/* CADRE PHOTO — carousel */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                {/* Fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900" />

                {/* Photos empilées avec crossfade */}
                {TESTIMONIALS.map((t, i) => (
                  <img
                    key={i}
                    src={t.photo}
                    alt={`Témoignage de ${t.name}, ${t.role}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: i === testimonialIdx ? 1 : 0,
                      transform: `scale(${i === testimonialIdx ? 1.02 : 1.08})`,
                      transition:
                        'opacity 900ms ease-in-out, transform 8000ms ease-out',
                    }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-primary-900/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-transparent to-transparent" />

                {/* Citation rotative */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <Quote
                    size={28}
                    className="text-accent-400 mb-3 opacity-80"
                    strokeWidth={1.5}
                  />
                  <div className="relative" style={{ minHeight: '5.5rem' }}>
                    {TESTIMONIALS.map((t, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          opacity: i === testimonialIdx ? 1 : 0,
                          transform: `translateY(${
                            i === testimonialIdx ? '0' : '12px'
                          })`,
                          transition:
                            'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                          pointerEvents: i === testimonialIdx ? 'auto' : 'none',
                        }}
                      >
                        <p className="text-white text-lg font-semibold leading-snug max-w-sm">
                          « {t.quote} »
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pagination + progress */}
                  <div className="flex items-center gap-2 mt-5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className="relative h-1 flex-1 rounded-full bg-white/15 overflow-hidden cursor-pointer"
                        aria-label={`Témoignage ${i + 1}`}
                      >
                        <span
                          className="absolute inset-y-0 left-0 bg-accent-400 rounded-full"
                          style={{
                            width:
                              i < testimonialIdx
                                ? '100%'
                                : i === testimonialIdx
                                ? '100%'
                                : '0%',
                            animation:
                              i === testimonialIdx && !paused
                                ? `progressFill ${TESTIMONIAL_DURATION}ms linear`
                                : 'none',
                          }}
                          key={`${i}-${testimonialIdx}-${paused}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ─── BANDE DE SEGMENTS ─── */}
      <div style={fade(580)} className="relative z-10 mt-20 lg:mt-28">
        <div className="bg-black/25 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
              {segments.map((seg, i) => (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id)}
                  className={`group relative text-left py-6 px-5 lg:px-6 transition-all duration-300 ${
                    activeSegment === seg.id
                      ? 'bg-white/[0.06]'
                      : 'hover:bg-white/[0.03]'
                  } ${i > 0 ? 'lg:border-l border-white/10' : ''} ${
                    i % 2 === 1 ? 'border-l border-white/10 lg:border-l' : ''
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                      activeSegment === seg.id
                        ? 'bg-accent-400'
                        : 'bg-transparent'
                    }`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className={`text-sm lg:text-[15px] font-bold mb-1 transition-colors ${
                          activeSegment === seg.id
                            ? 'text-white'
                            : 'text-white/75 group-hover:text-white'
                        }`}
                      >
                        {seg.label}
                      </div>
                      <div className="text-[11px] lg:text-xs text-white/45 leading-snug">
                        {seg.desc}
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`mt-0.5 transition-all duration-300 flex-shrink-0 ${
                        activeSegment === seg.id
                          ? 'text-accent-400 translate-x-0'
                          : 'text-white/30 group-hover:text-white/60 -translate-x-1 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
