import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Smartphone,
  Globe,
  Bell,
  Zap,
  Check,
  TrendingUp,
  User,
  Building2,
  PiggyBank,
  Info,
  HelpCircle,
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
          {/* ═══════════ GAUCHE : Phone mockup avec notifications ═══════════ */}
          <RevealOnScroll direction="left" className="relative">
            <div className="relative flex items-center justify-center min-h-[600px]">
              {/* Halo doux derrière le phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-accent-500/15 rounded-full blur-3xl scale-75" />

              {/* PHONE MOCKUP */}
              <div
                className="relative w-[280px] sm:w-[320px] lg:w-[300px] xl:w-[340px]"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(10,38,21,0.25))',
                  animation: 'cardFloat 8s ease-in-out infinite',
                }}
              >
                {/* Phone frame (notched) */}
                <div className="relative aspect-[9/19] rounded-[2.5rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 border border-gray-700">
                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white">
                    {/* Notch / status bar */}
                    <div className="relative h-7 bg-white flex items-center justify-between px-6 pt-2 text-[10px] text-gray-700">
                      <span className="font-bold tabular-nums">15:53</span>
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-2 rounded-sm bg-gray-700" />
                        <span className="w-3 h-2 rounded-sm bg-gray-700" />
                      </div>
                    </div>

                    {/* App content — réplique FINACOM+ */}
                    <div className="relative h-[calc(100%-1.75rem)] overflow-hidden">
                      {/* Header gradient */}
                      <div
                        className="relative px-5 pt-5 pb-8"
                        style={{
                          background:
                            'radial-gradient(circle at 80% 0%, #fef3c7 0%, #f0fdf4 50%, #ffffff 100%)',
                        }}
                      >
                        {/* Logo FINACOM */}
                        <div className="mb-4">
                          <img
                            src="/logo-finacom.png"
                            alt=""
                            className="h-7 w-auto"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>

                        {/* Titre */}
                        <h3 className="text-[20px] font-extrabold text-primary-900 leading-tight mb-1">
                          Bienvenue 👋
                        </h3>
                        <p className="text-[11px] text-gray-500 mb-5">
                          Accédez à vos comptes
                        </p>

                        {/* Carte compte principal */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(27,122,61,0.15)] border border-primary-50">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="text-[14px] font-extrabold text-primary-700">
                                Compte principal
                              </div>
                              <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                                TYRTYE-7474764
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-accent-500 text-white text-[9px] font-bold">
                              Courant
                            </span>
                          </div>
                          <button className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary-200 text-primary-700 text-[10px] font-semibold">
                            <span>📋</span> Voir mes relevés
                          </button>
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="px-5 -mt-3 mb-5">
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { icon: User, label: 'Gestionnaire' },
                            { icon: User, label: 'Mon profil' },
                            { icon: Building2, label: 'Agences' },
                          ].map((q, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center gap-1 shadow-md"
                            >
                              <q.icon size={18} className="text-white" />
                              <div className="text-[9px] text-white font-medium">
                                {q.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section Explorer */}
                      <div className="px-5">
                        <div className="text-[14px] font-extrabold text-primary-900 mb-3">
                          Explorer
                        </div>
                        <div className="space-y-2">
                          {[
                            {
                              icon: Info,
                              title: 'À propos',
                              desc: 'Découvrez notre mission et notre histoire',
                            },
                            {
                              icon: HelpCircle,
                              title: 'FAQ',
                              desc: 'Questions fréquentes et support',
                            },
                          ].map((row, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50"
                            >
                              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                                <row.icon size={14} className="text-accent-700" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-bold text-primary-900 leading-tight">
                                  {row.title}
                                </div>
                                <div className="text-[9px] text-gray-500 leading-tight">
                                  {row.desc}
                                </div>
                              </div>
                              <span className="text-gray-300">›</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notch (top) */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
              </div>

              {/* Notification flottante 1 — "Virement reçu" */}
              <div
                className="absolute top-[15%] -left-2 sm:-left-8 z-20 bg-white rounded-xl shadow-2xl shadow-primary-900/15 border border-gray-100 p-3 flex items-center gap-3 max-w-[180px]"
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

              {/* Notification flottante 2 — "Alerte SMS" */}
              <div
                className="absolute bottom-[20%] -right-2 sm:-right-8 z-20 bg-white rounded-xl shadow-2xl shadow-primary-900/15 border border-gray-100 p-3 flex items-center gap-3"
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

              {/* Notification flottante 3 — "Solde" */}
              <div
                className="absolute top-[55%] -left-4 sm:-left-12 z-20 bg-primary-700 text-white rounded-xl shadow-2xl shadow-primary-900/20 p-3 flex items-center gap-3"
                style={{ animation: 'cardFloat 8s ease-in-out -1s infinite' }}
              >
                <div className="w-9 h-9 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={15} className="text-primary-900" />
                </div>
                <div>
                  <div className="text-[10px] text-white/70 leading-none mb-1">
                    Épargne · ce mois
                  </div>
                  <div className="text-sm font-extrabold text-accent-400 tabular-nums">
                    +12,8 %
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ═══════════ DROITE : Titre + features + CTAs ═══════════ */}
          <div>
            <RevealOnScroll>
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="text-accent-600 text-[11px] uppercase tracking-[0.25em] font-extrabold">
                  100% Digital
                </span>
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
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-dark font-semibold text-sm transition-all duration-300"
              >
                <Download size={16} className="text-primary-700" />
                <span>Télécharger l'app</span>
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
