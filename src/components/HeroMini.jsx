import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Check,
  TrendingUp,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

// 3 notifications qui cyclent — coeur "captivant" du mini hero
const NOTIFICATIONS = [
  {
    icon: Check,
    label: 'Compte ouvert',
    value: 'Compte Avenir activé',
    detail: 'En 3 minutes seulement',
    color: 'emerald',
  },
  {
    icon: TrendingUp,
    label: 'Épargne capitalisée',
    value: '+ 18 750 FCFA',
    detail: 'Daar daré · Janvier 2025',
    color: 'primary',
  },
  {
    icon: CreditCard,
    label: 'Crédit approuvé',
    value: '850 000 FCFA',
    detail: 'Crédit agricole de campagne',
    color: 'accent',
  },
];

const COLOR_MAP = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    gradient: 'from-emerald-500 to-emerald-700',
    ring: 'ring-emerald-200',
  },
  primary: {
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    gradient: 'from-primary-500 to-primary-700',
    ring: 'ring-primary-200',
  },
  accent: {
    bg: 'bg-accent-50',
    text: 'text-accent-700',
    gradient: 'from-accent-500 to-accent-700',
    ring: 'ring-accent-200',
  },
};

export default function HeroMini() {
  const [loaded, setLoaded] = useState(false);
  const [activeNotif, setActiveNotif] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Rotation des notifications toutes les 2.8s
  useEffect(() => {
    const t = setInterval(
      () => setActiveNotif((i) => (i + 1) % NOTIFICATIONS.length),
      2800
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center bg-primary-900"
      style={{ minHeight: '560px' }}
    >
      {/* ═══════════ PHOTO FULL-BLEED ═══════════ */}
      <div className="absolute inset-0">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900" />

        <img
          src="/hero-services.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: '70% center',
            transform: loaded ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 20000ms ease-out',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Gradient sombre élégant — uniquement côté gauche pour le texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        {/* Léger renforcement bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Particules dorées discrètes */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => {
          const left = (i * 67 + 13) % 100;
          const top = (i * 41 + 9) % 100;
          const delay = (i * 0.4) % 4;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-accent-500"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: '2px',
                height: '2px',
                opacity: 0.5,
                animation: `sparkle 4s ease-in-out ${delay}s infinite`,
                boxShadow: '0 0 8px rgba(212, 160, 23, 0.4)',
              }}
            />
          );
        })}
      </div>

      {/* ═══════════ CONTENU ═══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-32 lg:pt-28 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── GAUCHE : Titre + CTAs ─── */}
          <div className="lg:col-span-7">
            {/* Kicker mini */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms',
              }}
            >
              <Sparkles size={11} className="text-accent-400" />
              <span className="text-accent-400 text-[10px] uppercase tracking-[0.25em] font-bold">
                FINACOM · 50 ans
              </span>
            </div>

            {/* Titre 2 lignes */}
            <h1 className="font-extrabold text-white leading-[1.0] tracking-[-0.03em] mb-6">
              <div className="overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <span
                  className="inline-block text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem]"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, opacity 600ms ease-out 200ms',
                  }}
                >
                  Votre projet.
                </span>
              </div>
              <div className="overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <span
                  className="inline-block relative"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 400ms, opacity 600ms ease-out 400ms',
                  }}
                >
                  <span className="text-accent-400 text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                    Notre engagement.
                  </span>
                  {/* Soulignement doré */}
                  <svg
                    className="absolute left-0 -bottom-1 w-full pointer-events-none"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{ height: '0.12em' }}
                  >
                    <path
                      d="M2 6 Q 80 2 150 5 T 298 4"
                      stroke="#d4a017"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="350"
                      strokeDashoffset={loaded ? 0 : 350}
                      style={{
                        transition:
                          'stroke-dashoffset 1300ms cubic-bezier(0.65, 0, 0.35, 1) 1100ms',
                      }}
                    />
                  </svg>
                </span>
              </div>
            </h1>

            {/* Lede courte */}
            <p
              className="text-white/80 text-base lg:text-lg leading-relaxed max-w-lg mb-7 font-light"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 700ms ease-out 700ms, transform 700ms ease-out 700ms',
              }}
            >
              La microfinance moderne du Burkina Faso —{' '}
              <strong className="text-white font-semibold">épargne, crédit, mobile banking</strong>{' '}
              à portée de tous.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 700ms ease-out 900ms, transform 700ms ease-out 900ms',
              }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm lg:text-base transition-all duration-300 shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/50 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Ouvrir un compte</span>
                <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold text-sm lg:text-base transition-all"
              >
                <span className="relative">
                  Découvrir nos solutions
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-400 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
                <ArrowRight size={16} className="text-accent-400 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Trust mini */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 700ms ease-out 1200ms',
              }}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-accent-400" />
                Agréé <strong className="text-white">BCEAO</strong>
              </div>
              <span className="w-px h-3 bg-white/20" />
              <div>
                <strong className="text-white tabular-nums">50 000+</strong> clients
              </div>
              <span className="w-px h-3 bg-white/20" />
              <div>
                <strong className="text-white">8</strong> agences
              </div>
            </div>
          </div>

          {/* ─── DROITE : Photo cadrée + Notification card overlay ─── */}
          <div
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 900ms ease-out 600ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 600ms',
            }}
          >
            <div className="relative w-full max-w-md">
              {/* Halo doux derrière */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/15 to-accent-500/20 rounded-[2.5rem] blur-3xl" />

              {/* PHOTO PRINCIPALE — cadre arrondi avec bordure dorée */}
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20 ring-1 ring-white"
                style={{
                  animation: 'cardFloat 8s ease-in-out infinite',
                }}
              >
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100" />

                <img
                  src="/hero-services.jpg"
                  alt="Cliente FINACOM"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: loaded ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 25000ms ease-out',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Cadre doré épais */}
                <div className="absolute inset-0 rounded-3xl ring-[5px] ring-accent-500/80 pointer-events-none" />
              </div>

              {/* NOTIFICATION CARD — overlap en bas */}
              <div
                className="absolute -bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl shadow-primary-900/20 border border-gray-100 overflow-hidden"
                style={{
                  animation: 'cardFloat 7s ease-in-out -1.5s infinite',
                }}
              >
                {/* Header notification style "Apple" */}
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 backdrop-blur-md border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <img src="/logo-finacom-removebg-preview.png" alt="" className="h-5 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <span className="text-[11px] font-bold text-dark uppercase tracking-wider">
                      FINACOM
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">à l'instant</span>
                </div>

                {/* Contenu — change selon notif active */}
                <div className="relative" style={{ minHeight: '180px' }}>
                  {NOTIFICATIONS.map((notif, i) => {
                    const NotifIcon = notif.icon;
                    const color = COLOR_MAP[notif.color];
                    const isActive = i === activeNotif;
                    return (
                      <div
                        key={i}
                        className="absolute inset-0 p-6 flex flex-col justify-center"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                          transition:
                            'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icône avec gradient */}
                          <div
                            className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <NotifIcon size={26} className="text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-[10px] uppercase tracking-[0.18em] font-bold ${color.text} mb-1`}>
                              {notif.label}
                            </div>
                            <div className="text-xl font-extrabold text-dark mb-1 tracking-tight tabular-nums">
                              {notif.value}
                            </div>
                            <div className="text-xs text-gray-500">{notif.detail}</div>
                          </div>
                        </div>

                        {/* Mini-progress décoratif */}
                        <div className="flex items-center gap-1 mt-5">
                          {NOTIFICATIONS.map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1 rounded-full transition-all duration-500 ${
                                idx === activeNotif
                                  ? `flex-[2] ${color.gradient.replace('from-', 'bg-').split(' ')[0]}`
                                  : 'flex-1 bg-gray-200'
                              }`}
                              style={{
                                background: idx === activeNotif
                                  ? `linear-gradient(to right, ${notif.color === 'emerald' ? '#10b981' : notif.color === 'primary' ? '#1b7a3d' : '#d4a017'}, ${notif.color === 'emerald' ? '#047857' : notif.color === 'primary' ? '#14532d' : '#92400e'})`
                                  : undefined,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mini badge live en haut-droite */}
              <div className="absolute -top-3 -right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-lg border border-emerald-100">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-700">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
