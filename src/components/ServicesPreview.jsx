import { Link } from 'react-router-dom';
import {
  PiggyBank,
  HandCoins,
  Smartphone,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Star,
  Zap,
} from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import SectionKicker from './SectionKicker';

// 4 familles avec photos thématiques en lien direct avec les offres
const CATEGORIES = [
  {
    icon: PiggyBank,
    kicker: 'Épargner',
    name: "Produits d'épargne",
    count: 4,
    examples: 'DAV · DAT · Daar daré',
    // Bocal de pièces avec plante = épargne qui fructifie
    image:
      'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?auto=format&fit=crop&w=1000&q=80',
    accent: 'primary',
    accentRgb: 'rgba(27,122,61,',
  },
  {
    icon: HandCoins,
    kicker: 'Financer',
    name: 'Produits de crédit',
    count: 4,
    examples: 'Commercial · Agricole · Salariés',
    // Femme africaine récoltant dans un champ = crédit agricole / Malawi
    image:
      'https://images.unsplash.com/photo-1746014929708-fcb859fd3185?auto=format&fit=crop&w=1000&q=80',
    accent: 'accent',
    accentRgb: 'rgba(212,160,23,',
  },
  {
    icon: Smartphone,
    kicker: 'Vivre digital',
    name: 'Services digitaux',
    count: 9,
    examples: 'FINACOM+ · DCOLLECT · BANK TO WALLET',
    // Smartphone tenu en main = mobile banking
    image:
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80',
    accent: 'blue',
    accentRgb: 'rgba(37,99,235,',
    featured: true,
  },
  {
    icon: Briefcase,
    kicker: 'Simplifier',
    name: 'Services rattachés',
    count: 6,
    examples: 'Virements · Attestations · Cautions',
    // Échange client-conseiller au guichet = services en agence
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80',
    accent: 'emerald',
    accentRgb: 'rgba(16,185,129,',
  },
];

// 6 phares en pills compactes
const FEATURED_NAMES = [
  'FINACOM+',
  'DCOLLECT',
  'BANK TO WALLET',
  'PI-SPI',
  'SMS Banking',
  'africards',
];

export default function ServicesPreview() {
  return (
    <section id="services" className="py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Décor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════ HEADER ═══════════ */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-14">
          <SectionKicker icon={Zap} label="Nos produits et services" accent="primary" />
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Une offre structurée en{' '}
            <span className="text-gradient-green">4 familles</span>.
          </h2>
        </RevealOnScroll>

        {/* ═══════════ 4 CARDS PHOTO BG (style page Services) ═══════════ */}
        <RevealOnScroll className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to="/produits-et-services"
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900" />

                {/* Photo background */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Dégradé sombre pour la lisibilité du texte (bas) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                {/* Voile coloré au hover (selon accent) */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, ${cat.accentRgb}0.7) 100%)`,
                  }}
                />

                {/* Badge featured */}
                {cat.featured && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-500 text-primary-900 text-[9px] font-bold uppercase tracking-wider shadow-lg z-10">
                    <Star size={9} fill="currentColor" />
                    Phares
                  </div>
                )}

                {/* Numéro de catégorie en filigrane */}
                <div className="absolute top-4 left-5 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 z-10">
                  0{i + 1} ·{' '}
                  <span className="text-accent-400">{cat.count} produits</span>
                </div>

                {/* Icône en haut */}
                <div className="absolute top-12 right-4 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-500 z-10">
                  <Icon
                    size={24}
                    className="text-white group-hover:text-primary-900 transition-colors duration-500"
                  />
                </div>

                {/* Contenu en bas */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white z-10">
                  <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent-400 mb-2">
                    {cat.kicker}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-extrabold mb-2 leading-tight tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed mb-4 min-h-[2.5rem]">
                    {cat.examples}
                  </p>

                  {/* CTA "Découvrir" */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/15">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-accent-400 transition-colors">
                      Découvrir
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-300">
                      <ArrowUpRight
                        size={14}
                        className="text-white group-hover:text-primary-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </RevealOnScroll>

        {/* ═══════════ MENTION PRODUITS PHARES ═══════════ */}
        <RevealOnScroll className="mb-10">
          <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-3xl p-6 lg:p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center shadow-lg">
                  <Sparkles size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-700 mb-0.5">
                    6 services digitaux phares
                  </div>
                  <div className="text-base font-bold text-dark">
                    Notre engagement modernité
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-wrap gap-2">
                {FEATURED_NAMES.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-dark shadow-sm hover:shadow-md hover:border-accent-300 transition-all"
                  >
                    <Star size={10} className="text-accent-500" fill="currentColor" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ═══════════ CTA → page complète ═══════════ */}
        <RevealOnScroll className="text-center">
          <Link
            to="/produits-et-services"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-dark hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary-900/10 hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Explorer tous nos produits & services</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            23 produits & services · 4 familles · 6 phares digitaux
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
