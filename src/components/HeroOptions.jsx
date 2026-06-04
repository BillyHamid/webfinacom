import { useState, useEffect } from 'react';
import {
  ArrowRight,
  PiggyBank,
  Calculator,
  Smartphone,
  MapPin,
  Sparkles,
  TrendingUp,
  Check,
  ShieldCheck,
  Wallet,
  HandCoins,
  Star,
  ArrowUpRight,
} from 'lucide-react';

// 4 actions principales — coeur de l'ergonomie
const QUICK_ACTIONS = [
  {
    icon: PiggyBank,
    label: 'Ouvrir un compte',
    desc: 'En quelques minutes',
    href: '#contact',
    accent: 'primary',
  },
  {
    icon: Calculator,
    label: 'Simuler un crédit',
    desc: 'Voir mes mensualités',
    href: '#services',
    accent: 'accent',
  },
  {
    icon: Smartphone,
    label: "Télécharger l'app",
    desc: 'FINACOM+ sur mobile',
    href: '#services',
    accent: 'blue',
  },
  {
    icon: MapPin,
    label: 'Trouver une agence',
    desc: '8 agences au Burkina',
    href: '#contact',
    accent: 'emerald',
  },
];

// 3 cartes produits empilées
const PRODUCT_CARDS = [
  {
    badge: 'NOUVEAU',
    icon: Smartphone,
    title: 'FINACOM+',
    subtitle: 'Banque mobile',
    desc: 'Consultation, virements, factures — tout depuis votre téléphone.',
    metric: '4.8★',
    metricLabel: 'Note Play Store',
    gradient: 'from-primary-600 to-primary-800',
    bgGradient: 'from-primary-50 to-white',
  },
  {
    badge: 'POPULAIRE',
    icon: HandCoins,
    title: 'Crédit Agricole',
    subtitle: "Soutien de campagne",
    desc: "Financement saisonnier adapté aux groupements et exploitations.",
    metric: '+23%',
    metricLabel: 'Croissance 2024',
    gradient: 'from-accent-500 to-accent-700',
    bgGradient: 'from-accent-50 to-white',
  },
  {
    badge: 'PHARE',
    icon: Wallet,
    title: 'Compte Avenir',
    subtitle: 'Épargne rémunérée',
    desc: "À partir de 5 000 FCFA. Intérêts capitalisés dès le 1er jour.",
    metric: '4,5%',
    metricLabel: "Taux d'intérêt",
    gradient: 'from-emerald-500 to-emerald-700',
    bgGradient: 'from-emerald-50 to-white',
  },
];

const ACTION_COLORS = {
  primary: {
    bg: 'bg-primary-50',
    bgActive: 'bg-primary-600',
    text: 'text-primary-700',
    border: 'border-primary-200',
    shadow: 'shadow-primary-500/20',
  },
  accent: {
    bg: 'bg-accent-50',
    bgActive: 'bg-accent-500',
    text: 'text-accent-700',
    border: 'border-accent-200',
    shadow: 'shadow-accent-500/20',
  },
  blue: {
    bg: 'bg-blue-50',
    bgActive: 'bg-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-200',
    shadow: 'shadow-blue-500/20',
  },
  emerald: {
    bg: 'bg-emerald-50',
    bgActive: 'bg-emerald-600',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-500/20',
  },
};

export default function HeroOptions() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const [liveCount, setLiveCount] = useState(1247);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Rotation auto des cartes produits
  useEffect(() => {
    if (hoveredCard !== null) return;
    const t = setInterval(
      () => setActiveCard((i) => (i + 1) % PRODUCT_CARDS.length),
      4000
    );
    return () => clearInterval(t);
  }, [hoveredCard]);

  // Compteur live qui varie
  useEffect(() => {
    const t = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const focusedCardIdx = hoveredCard !== null ? hoveredCard : activeCard;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        background:
          'linear-gradient(135deg, #ffffff 0%, #f5fbf3 40%, #fff8e8 100%)',
      }}
    >
      {/* ═══════════ BACKGROUND DÉCORATIF ═══════════ */}

      {/* Halos doux */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-accent-500/15 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Grille très subtile */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(27,122,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,61,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Particules dorées subtiles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => {
          const left = (i * 71 + 13) % 100;
          const top = (i * 43 + 11) % 100;
          const delay = (i * 0.4) % 5;
          const size = i % 3 === 0 ? 3 : 1.5;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-accent-500"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.35,
                animation: `sparkle 4.5s ease-in-out ${delay}s infinite`,
                boxShadow: '0 0 8px rgba(212, 160, 23, 0.4)',
              }}
            />
          );
        })}
      </div>

      {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-32 lg:pt-32 pb-32">
        {/* ─── Top bar : status live + édition ─── */}
        <div
          className="flex items-center justify-between mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 700ms ease-out 100ms, transform 700ms ease-out 100ms',
          }}
        >
          {/* Kicker brand */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-[0_4px_20px_rgba(27,122,61,0.06)]">
            <Sparkles size={13} className="text-accent-500" />
            <span className="text-primary-700 text-[11px] uppercase tracking-[0.2em] font-bold">
              Microfinance moderne
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="text-gray-500 text-[11px] font-medium">
              50 ans · Burkina Faso
            </span>
          </div>

          {/* Live count */}
          <div className="hidden md:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.06)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-gray-500 text-[11px] font-medium">
              <span className="text-dark font-bold tabular-nums">{liveCount}</span>{' '}
              clients en ligne aujourd'hui
            </span>
          </div>
        </div>

        {/* ─── Grid principal ─── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* COLONNE GAUCHE : Titre + Description + Quick Actions */}
          <div className="lg:col-span-7">
            {/* Titre principal — cascade reveal */}
            <h1 className="font-extrabold text-dark leading-[0.98] tracking-[-0.03em] mb-8">
              <div className="overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <span
                  className="inline-block text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem]"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, opacity 700ms ease-out 300ms',
                  }}
                >
                  La microfinance
                </span>
              </div>
              <div className="overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <span
                  className="inline-block"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 500ms, opacity 700ms ease-out 500ms',
                  }}
                >
                  <span className="text-dark text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem]">
                    qui{' '}
                  </span>
                  <span className="relative inline-block">
                    <span
                      className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem]"
                      style={{
                        background: 'linear-gradient(135deg, #1b7a3d 0%, #d4a017 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      vous ressemble
                    </span>
                    {/* Soulignement doré */}
                    <svg
                      className="absolute left-0 -bottom-2 w-full pointer-events-none"
                      viewBox="0 0 300 14"
                      fill="none"
                      preserveAspectRatio="none"
                      style={{ height: '0.15em' }}
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
                            'stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1) 1200ms',
                        }}
                      />
                    </svg>
                  </span>
                  <span className="text-dark text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem]">
                    .
                  </span>
                </span>
              </div>
            </h1>

            {/* Description */}
            <p
              className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mb-10 font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 800ms ease-out 900ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 900ms',
              }}
            >
              Épargne. Crédit. Mobile banking. <strong className="text-dark">FINACOM</strong> met
              50 ans d'expérience au service de chaque Burkinabè, urbain comme rural.
            </p>

            {/* ═══════════ 4 ACTIONS RAPIDES — Coeur ergonomique ═══════════ */}
            <div
              className="mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 800ms ease-out 1100ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms',
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 mb-4 flex items-center gap-2">
                <span className="h-px w-6 bg-gray-300" />
                Que souhaitez-vous faire ?
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                {QUICK_ACTIONS.map((action, i) => {
                  const Icon = action.icon;
                  const color = ACTION_COLORS[action.accent];
                  return (
                    <a
                      key={i}
                      href={action.href}
                      className={`group relative flex flex-col gap-3 p-4 rounded-xl bg-white border-2 ${color.border} hover:${color.bgActive} hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden`}
                      style={{
                        animation: loaded
                          ? `fadeInUp 600ms cubic-bezier(0.22, 1, 0.36, 1) ${1300 + i * 80}ms both`
                          : 'none',
                      }}
                    >
                      {/* Halo de fond au hover */}
                      <div
                        className={`absolute inset-0 ${color.bgActive} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-lg ${color.bg} group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300`}
                        >
                          <Icon
                            size={18}
                            className={`${color.text} group-hover:text-white transition-colors duration-300`}
                          />
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-gray-300 group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </div>

                      <div className="relative">
                        <div className="text-[13px] font-bold text-dark group-hover:text-white transition-colors duration-300 leading-tight">
                          {action.label}
                        </div>
                        <div className="text-[11px] text-gray-500 group-hover:text-white/80 mt-0.5 transition-colors duration-300">
                          {action.desc}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Trust line compact */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 800ms ease-out 1900ms',
              }}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-primary-600" />
                Agréé <strong className="text-dark">BCEAO</strong>
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                <strong className="text-dark tabular-nums">50 000+</strong> clients
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <TrendingUp size={13} className="text-accent-600" />
                <strong className="text-dark tabular-nums">97,3 %</strong> remboursement
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : Stack de 3 cartes produits */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              className="relative w-full"
              style={{
                height: '520px',
                perspective: '1500px',
              }}
            >
              {PRODUCT_CARDS.map((card, i) => {
                const Icon = card.icon;
                const isFocused = i === focusedCardIdx;
                const offset = i - focusedCardIdx;
                const isHidden = Math.abs(offset) > 2;

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActiveCard(i)}
                    className="absolute inset-x-0 cursor-pointer"
                    style={{
                      top: '50%',
                      zIndex: PRODUCT_CARDS.length - Math.abs(offset),
                      transform: `translateY(calc(-50% + ${offset * 40}px)) scale(${isFocused ? 1 : 0.92 - Math.abs(offset) * 0.04}) translateZ(${-Math.abs(offset) * 50}px)`,
                      opacity: loaded ? (isHidden ? 0 : isFocused ? 1 : 0.7) : 0,
                      transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${loaded ? '0ms' : `${1400 + i * 150}ms`}, opacity 700ms ease-out ${loaded ? '0ms' : `${1400 + i * 150}ms`}`,
                      pointerEvents: isHidden ? 'none' : 'auto',
                    }}
                  >
                    <div
                      className={`relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl bg-gradient-to-br ${card.bgGradient}`}
                      style={{
                        boxShadow: isFocused
                          ? '0 30px 80px -20px rgba(27,122,61,0.25)'
                          : '0 15px 40px -10px rgba(27,122,61,0.12)',
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        className={`h-1.5 w-full bg-gradient-to-r ${card.gradient}`}
                      />

                      <div className="p-7">
                        {/* Header avec badge + métrique */}
                        <div className="flex items-start justify-between mb-5">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${isFocused ? 'scale-110' : ''} transition-transform duration-500`}
                          >
                            <Icon size={24} className="text-white" />
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white shadow-sm border border-gray-100 text-[9px] uppercase tracking-wider font-bold text-gray-600 mb-2">
                              <Star size={9} className="text-accent-500" fill="currentColor" />
                              {card.badge}
                            </div>
                          </div>
                        </div>

                        {/* Titre */}
                        <div className="mb-4">
                          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-1">
                            {card.subtitle}
                          </div>
                          <h3 className="text-2xl font-extrabold text-dark tracking-tight">
                            {card.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                          {card.desc}
                        </p>

                        {/* Métrique + CTA */}
                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                          <div>
                            <div
                              className="text-3xl font-extrabold tabular-nums leading-none mb-1"
                              style={{
                                background: `linear-gradient(135deg, ${card.accent === 'primary' ? '#1b7a3d' : card.accent === 'accent' ? '#d4a017' : '#10b981'} 0%, ${card.accent === 'primary' ? '#14532d' : card.accent === 'accent' ? '#92400e' : '#047857'} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              {card.metric}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                              {card.metricLabel}
                            </div>
                          </div>

                          <a
                            href="#services"
                            className={`group/cta inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${card.gradient} shadow-lg hover:scale-110 transition-transform duration-300`}
                          >
                            <ArrowRight
                              size={18}
                              className="text-white transition-transform duration-300 group-hover/cta:translate-x-0.5"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Indicateurs pagination */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {PRODUCT_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    aria-label={`Carte ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === focusedCardIdx
                        ? 'w-8 bg-primary-600'
                        : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
