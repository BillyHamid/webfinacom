import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Globe,
  Bell,
  Zap,
  Check,
  TrendingUp,
} from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const FEATURES = [
  {
    icon: Smartphone,
    title: 'Application Mobile',
    desc: 'iOS et Android — gérez tout depuis votre smartphone.',
  },
  {
    icon: Globe,
    title: 'Internet Banking',
    desc: 'Accès sécurisé à vos comptes via navigateur web 24h/24.',
  },
  {
    icon: Bell,
    title: 'Alertes temps réel',
    desc: 'SMS et email instantanés pour chaque mouvement.',
  },
  {
    icon: Zap,
    title: 'Paiement de factures',
    desc: 'SONABEL, ONEA, téléphone — payez en un clic.',
  },
];

export default function FinacomPlusShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Décor */}
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-primary-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-accent-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ═══════════ GAUCHE : 3 phones en cascade avec formes décoratives ═══════════ */}
          <RevealOnScroll direction="left" className="relative">
            <div className="relative flex items-center justify-center min-h-[560px]">
              {/* ─── Formes décoratives en arrière-plan ─── */}
              {/* Grosse forme dorée top-right */}
              <div
                className="absolute -top-12 -right-8 w-64 h-64 bg-accent-500/30 rounded-full blur-2xl"
                aria-hidden="true"
              />
              {/* Grosse forme verte right */}
              <div
                className="absolute top-1/2 -right-12 w-80 h-80 bg-primary-500/25 rounded-[40%] blur-2xl -translate-y-1/2"
                aria-hidden="true"
              />
              {/* Petit cercle doré top-left */}
              <div
                className="absolute top-12 left-0 w-20 h-20 rounded-full bg-accent-400/60"
                aria-hidden="true"
              />
              {/* Petit cercle vert bottom-left */}
              <div
                className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-primary-500/70"
                aria-hidden="true"
              />

              {/* ─── 3 phones en cascade ─── */}
              <div className="relative flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                {/* Phone GAUCHE — décalé bas, plus petit */}
                <PhoneMockup
                  width="w-[130px] sm:w-[150px] lg:w-[160px]"
                  translateY="translate-y-10"
                  objectPosition="top"
                  shadowIntensity={0.18}
                />

                {/* Phone CENTRE — principal, plus grand */}
                <PhoneMockup
                  width="w-[170px] sm:w-[200px] lg:w-[220px]"
                  translateY=""
                  objectPosition="center"
                  shadowIntensity={0.3}
                  emphasized
                />

                {/* Phone DROITE — décalé bas, plus petit */}
                <PhoneMockup
                  width="w-[130px] sm:w-[150px] lg:w-[160px]"
                  translateY="translate-y-10"
                  objectPosition="bottom"
                  shadowIntensity={0.18}
                />
              </div>

              {/* ─── Notification flottante "Virement reçu" ─── */}
              <div
                className="absolute top-[12%] left-0 sm:-left-4 z-30 bg-white rounded-xl shadow-2xl shadow-primary-900/15 border border-gray-100 p-3 flex items-center gap-3 max-w-[180px]"
                style={{ animation: 'cardFloat 7s ease-in-out -2s infinite' }}
              >
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-emerald-600" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 leading-none mb-1">
                    Virement reçu
                  </div>
                  <div className="text-sm font-extrabold text-dark tabular-nums">
                    +150 000 F
                  </div>
                </div>
              </div>

              {/* ─── Notification flottante "Alerte SMS" ─── */}
              <div
                className="absolute bottom-[10%] right-0 sm:-right-4 z-30 bg-white rounded-xl shadow-2xl shadow-primary-900/15 border border-gray-100 p-3 flex items-center gap-3"
                style={{ animation: 'cardFloat 7s ease-in-out -4s infinite' }}
              >
                <div className="w-9 h-9 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <Bell size={15} className="text-accent-600" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 leading-none mb-1">
                    Alerte SMS
                  </div>
                  <div className="text-sm font-extrabold text-dark">Activé</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ═══════════ DROITE : Titre + features + CTAs ═══════════ */}
          <div>
            <RevealOnScroll>
              {/* Kicker */}
              <div
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-accent-100 shadow-sm text-accent-700 text-[13px] font-extrabold uppercase tracking-[0.18em] mb-6 animate-kicker"
              >
                <Zap size={15} />
                100% Digital
              </div>

              {/* Titre */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
                Votre banque dans{' '}
                <span className="text-primary-700">votre poche</span>.
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                Accédez à vos comptes, effectuez vos virements et payez vos
                factures depuis votre smartphone ou votre ordinateur.{' '}
                <strong className="text-dark">Simple, rapide, sécurisé.</strong>
              </p>
            </RevealOnScroll>

            {/* Features list */}
            <RevealOnScroll delay={200} className="space-y-3 mb-10">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                      <Icon size={20} className="text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm lg:text-base font-bold text-dark mb-0.5 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-500 leading-snug">
                        {feature.desc}
                      </p>
                    </div>
                    <Check
                      size={20}
                      className="text-accent-500 flex-shrink-0"
                      strokeWidth={3}
                    />
                  </div>
                );
              })}
            </RevealOnScroll>

            {/* CTAs */}
            <RevealOnScroll delay={400} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/produits-et-services"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-800 hover:to-primary-900 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-primary-700/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explorer la banque digitale</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#contact"
                aria-label="Télécharger sur Google Play"
                className="group inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-black hover:bg-gray-900 border border-gray-300 hover:border-gray-400 text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              >
                {/* Logo Google Play — SVG officiel Material Design */}
                <svg
                  viewBox="0 0 512 512"
                  className="w-8 h-8 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path fill="#34A853" d="M64 32v448l216-224z" />
                  <path fill="#4285F4" d="M64 32l216 224 80-83z" />
                  <path fill="#FBBC04" d="M280 256l80 83 88-91-88-91z" />
                  <path fill="#EA4335" d="M64 480l216-224 80 83z" />
                </svg>

                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase tracking-wider font-medium text-white/80">
                    GET IT ON
                  </span>
                  <span className="text-lg font-semibold text-white -mt-0.5">
                    Google Play
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sous-composant — Mockup phone réutilisable
// ═══════════════════════════════════════════════════════════════════
function PhoneMockup({ width, translateY, objectPosition, shadowIntensity = 0.25, emphasized = false }) {
  const notchSize = emphasized ? 'w-14 h-3.5' : 'w-10 h-2.5';
  return (
    <div
      className={`relative ${width} ${translateY} flex-shrink-0`}
      style={{
        filter: `drop-shadow(0 30px 60px rgba(10,38,21,${shadowIntensity}))`,
        zIndex: emphasized ? 20 : 10,
      }}
    >
      {/* Phone frame */}
      <div className="relative aspect-[9/19] rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-1.5 border border-gray-700">
        <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-white">
          {/* Fallback gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 80% 0%, #fef3c7 0%, #f0fdf4 50%, #ffffff 100%)',
            }}
          />
          <img
            src="/ecran1.jpeg"
            alt="FINACOM+ application mobile"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
      {/* Notch */}
      <div
        className={`absolute top-2 left-1/2 -translate-x-1/2 ${notchSize} bg-black rounded-full z-10`}
      />
    </div>
  );
}
