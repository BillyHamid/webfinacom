import {
  ShieldCheck,
  Users,
  Heart,
  Target,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Quote,
  BookOpen,
  Building2,
  Sprout,
  MapPin,
  Briefcase,
  Award,
  Handshake,
  Network,
  CheckCircle2,
} from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';
import SectionKicker from './SectionKicker';

// ─── Valeurs ────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Intégrité',
    short: 'Gestion droite & transparente',
    desc: "Nous mettons un point d'honneur à la transparence dans toutes nos opérations. Chaque décision est guidée par la rigueur et l'honnêteté — c'est la fondation de la confiance que nous bâtissons avec chaque client, chaque partenaire, chaque communauté.",
    pillar: 'Confiance',
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    short: 'La force du collectif',
    desc: "Nos conseillers, nos agences, notre direction — tous partagent une même exigence de service. Le résultat : une expérience cohérente et humaine, où chaque collaborateur se mobilise pour faire avancer vos projets.",
    pillar: 'Cohésion',
  },
  {
    icon: Heart,
    title: 'Amour du prochain',
    short: 'Au cœur de notre mission',
    desc: "Servir avec humanité, écouter avec respect, accompagner avec patience. C'est notre héritage évangélique transformé en finance utile : remettre l'humain au centre, urbain comme rural, du plus modeste au plus ambitieux.",
    pillar: 'Humanité',
  },
];

// ─── Axes stratégiques ──────────────────────────────────────────────
const STRATEGIC_AXES = [
  {
    num: 'AS1',
    icon: Building2,
    title: 'Pérennité institutionnelle',
    desc: "Consolider la pérennité de FINACOM par sa transformation institutionnelle et le renforcement de ses fonds propres.",
    pillars: [
      'Transformation institutionnelle',
      'Renforcement des fonds propres',
      'Conformité réglementaire',
    ],
  },
  {
    num: 'AS2',
    icon: Users,
    title: 'Optimisation des ressources humaines',
    desc: "Aligner effectifs, valeurs et compétences à la charge opérationnelle — pour l'efficacité et la qualité de service.",
    pillars: [
      "Alignement effectifs & charge",
      'Formation continue',
      "Culture d'excellence",
    ],
  },
  {
    num: 'AS3',
    icon: TrendingUp,
    title: "Consolidation des acquis",
    desc: "Pérenniser les parts de marché, performances financières, notoriété et rang — tout en maîtrisant la qualité du portefeuille de crédits.",
    pillars: [
      'Parts de marché',
      'Performances financières',
      'Qualité du portefeuille',
    ],
  },
];

// ─── Timeline détaillée ─────────────────────────────────────────────
const TIMELINE = [
  {
    year: '1972',
    title: "Création de l'ODE",
    desc: "L'Office de Développement des Eglises Evangéliques est créé par la FEME. Première organisation non gouvernementale de développement burkinabè avec une vocation socio-spirituelle.",
    icon: BookOpen,
  },
  {
    year: '1975',
    title: 'Premières initiatives microfinance',
    desc: "Lancement des crédits par délégation et du CAARF (Crédit d'Appui aux Activités Rémunératrices des Femmes). Les femmes au cœur de l'autonomisation.",
    icon: Sprout,
  },
  {
    year: '2000+',
    title: 'Création de FINACOM',
    desc: "Émergence d'un réseau autonome de microfinance, branche financière de la FEME. Statut d'association avec pour objet la collecte d'épargne et l'octroi de crédit.",
    icon: Handshake,
  },
  {
    year: "Aujourd'hui",
    title: 'Acteur majeur reconnu',
    desc: "FINACOM est agréée BCEAO. 8 agences interconnectées, 50 000+ clients actifs, une gamme moderne de produits digitaux : FINACOM+, DCOLLECT, BANK TO WALLET, africards.",
    icon: TrendingUp,
  },
];

// ─── Zones d'intervention ───────────────────────────────────────────
const REGIONS = [
  { name: 'Ouagadougou', agencies: 7, badge: 'Capitale' },
  { name: 'Centre-Ouest', agencies: 1, badge: 'Région', city: 'Koudougou' },
];

// ─── Structure de gouvernance ───────────────────────────────────────
const GOVERNANCE_LAYERS = [
  {
    icon: BookOpen,
    name: 'FEME',
    full: 'Fédération des Églises et Missions Évangéliques',
    role: 'Vision spirituelle & sociale',
    year: 'Maison-mère',
  },
  {
    icon: Building2,
    name: 'ODE',
    full: "Office de Développement des Églises Évangéliques",
    role: 'ONG de développement',
    year: 'Créée en 1972',
  },
  {
    icon: TrendingUp,
    name: 'FINACOM',
    full: 'Microfinance Communautaire',
    role: 'Branche financière · Association agréée BCEAO',
    year: "Aujourd'hui",
    highlighted: true,
  },
];

export default function About() {
  return (
    <section id="about" className="bg-gray-50 relative overflow-hidden">
      {/* Décoration globale */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — MISSION + ANCRAGE                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de section */}
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-14">
            <SectionKicker icon={Target} label="Notre mission" accent="accent" />
            <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark mb-5 leading-tight">
              Améliorer les conditions de vie par une{' '}
              <span className="text-primary-600">finance utile</span>.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              FINACOM contribue à améliorer les conditions de vie de ses clients et usagers —
              urbains comme ruraux — à travers une offre rentable et pérenne de produits et
              services financiers souples, modernes et accessibles à tous.
            </p>
          </RevealOnScroll>

          {/* Split visuel + ancrage */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
                        alt="Équipe FINACOM"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                      <img
                        src="https://images.unsplash.com/photo-1556740758-90de940a6ed6?w=400&h=400&fit=crop"
                        alt="Service client"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
                        alt="Accompagnement"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <img
                        src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&h=300&fit=crop"
                        alt="Communauté"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-6">
                  <div className="px-8 py-5 rounded-2xl bg-primary-700 text-white shadow-2xl shadow-primary-900/30">
                    <div className="text-3xl font-extrabold text-accent-400 leading-none">
                      50+
                    </div>
                    <div className="text-xs text-white/70 mt-1">
                      Années d'engagement
                      <br />
                      via l'ODE
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Slogan + ancrage */}
            <div>
              <RevealOnScroll>
                {/* Slogan officiel */}
                <div className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 mb-6">
                  <Quote
                    size={28}
                    className="text-accent-500 mb-3"
                    strokeWidth={2.5}
                  />
                  <p className="text-lg sm:text-xl text-dark font-semibold italic leading-snug">
                    Une institution de microfinance moderne au service du
                    développement.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                    Slogan officiel FINACOM
                  </div>
                </div>

                {/* Ancrage institutionnel */}
                <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent-500 flex items-center justify-center">
                      <Network size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-accent-400 font-bold mb-1">
                        Ancrage institutionnel
                      </div>
                      <h4 className="text-base font-extrabold mb-2">
                        Branche financière de la FEME
                      </h4>
                      <p className="text-sm text-white/75 leading-relaxed">
                        FINACOM est une <strong className="text-white">association</strong>{' '}
                        ayant pour objet la collecte de l'épargne et l'octroi de crédit.
                        Sa structure mère est l'<strong className="text-white">ODE</strong>,
                        ONG de développement créée en 1972 par la{' '}
                        <strong className="text-white">FEME</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — HISTORIQUE (Timeline horizontale détaillée)         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 bg-white relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <SectionKicker icon={BookOpen} label="Notre histoire" accent="primary" />
            <h3 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
              <span className="text-gradient-green">Cinquante ans</span> au service du développement.
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              De la création de l'ODE en 1972 à FINACOM aujourd'hui — un demi-siècle
              d'engagement au cœur des communautés burkinabè.
            </p>
          </RevealOnScroll>

          {/* Timeline — 4 jalons en grid */}
          <div className="relative">
            {/* Ligne de fond horizontale */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <RevealOnScroll key={item.year} delay={i * 120} className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Cercle avec icône */}
                      <div className="relative w-32 h-32 mb-6">
                        <div className="absolute inset-0 rounded-full bg-white shadow-lg border-2 border-primary-100" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                          <Icon size={32} className="text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-accent-400/30 blur-xl scale-75" />
                      </div>

                      <div className="text-2xl font-extrabold text-accent-600 mb-2 tabular-nums">
                        {item.year}
                      </div>
                      <h4 className="text-lg font-bold text-dark mb-3">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — CITATION (Pleine largeur, mot du président)         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center">
            <Quote
              size={48}
              className="text-accent-500 mx-auto mb-8 opacity-80"
              strokeWidth={1.5}
            />
            <blockquote className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-dark leading-tight mb-8 tracking-tight max-w-4xl mx-auto">
              "Notre mission dépasse la microfinance.
              Nous portons l'espoir d'une autonomie financière digne pour chaque
              foyer burkinabè — qu'il vienne du marché de Ouagadougou, des plaines
              de Koudougou ou de la diaspora."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-accent-400" />
              <div className="text-sm text-gray-600">
                <div className="font-bold text-dark">Direction Générale FINACOM</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                  Mot d'orientation
                </div>
              </div>
              <div className="w-12 h-px bg-accent-400" />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — VALEURS (Cards riches éditoriales)                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 bg-white relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <SectionKicker icon={Heart} label="Nos valeurs" accent="accent" />
            <h3 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
              Trois principes qui guident <span className="text-accent-600">chacun de nos actes</span>.
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Notre engagement chrétien et notre vocation sociale convergent vers
              une finance pensée pour servir, pas pour exploiter.
            </p>
          </RevealOnScroll>

          {/* Cards éditoriales détaillées */}
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" stagger={140}>
            {VALUES.map(({ icon: Icon, title, short, desc, pillar }, i) => (
              <div
                key={title}
                className="group relative rounded-3xl bg-white border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Numéro grand en filigrane */}
                <div className="absolute top-4 right-5 text-7xl font-black text-gray-100 leading-none pointer-events-none select-none">
                  0{i + 1}
                </div>

                {/* Halo gradient au hover */}
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={28} className="text-white" />
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-600 mb-2">
                    Pilier : {pillar}
                  </div>
                  <h4 className="text-2xl font-extrabold text-dark mb-2 tracking-tight">
                    {title}
                  </h4>
                  <p className="text-sm text-primary-700 font-semibold mb-4 italic">
                    {short}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — GOUVERNANCE (Pyramide hiérarchique FEME>ODE>FINACOM)*/}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <SectionKicker icon={Network} label="Notre structure" accent="primary" />
            <h3 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
              Une <span className="text-primary-600">gouvernance ancrée</span> et claire.
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              FINACOM s'inscrit dans une lignée institutionnelle solide qui garantit
              sa mission et ses valeurs.
            </p>
          </RevealOnScroll>

          {/* Diagramme hiérarchique vertical */}
          <div className="relative">
            <StaggerChildren className="space-y-4" stagger={150}>
              {GOVERNANCE_LAYERS.map((layer, i) => {
                const Icon = layer.icon;
                const isLast = i === GOVERNANCE_LAYERS.length - 1;
                return (
                  <div key={layer.name} className="relative">
                    <div
                      className={`relative rounded-2xl border-2 transition-all duration-300 ${
                        layer.highlighted
                          ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white border-accent-400 shadow-2xl shadow-primary-900/20'
                          : 'bg-white text-dark border-gray-100 hover:border-primary-200 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-5 p-5 lg:p-6">
                        {/* Numéro de niveau */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg ${
                            layer.highlighted
                              ? 'bg-accent-500 text-primary-900'
                              : 'bg-primary-50 text-primary-700'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </div>

                        {/* Icône */}
                        <div
                          className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                            layer.highlighted
                              ? 'bg-white/10 backdrop-blur'
                              : 'bg-primary-100'
                          }`}
                        >
                          <Icon
                            size={26}
                            className={layer.highlighted ? 'text-accent-400' : 'text-primary-700'}
                          />
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`text-xl lg:text-2xl font-extrabold tracking-tight ${
                                layer.highlighted ? 'text-white' : 'text-dark'
                              }`}
                            >
                              {layer.name}
                            </h4>
                            {layer.highlighted && (
                              <span className="px-2 py-0.5 rounded-full bg-accent-500 text-primary-900 text-[9px] font-bold uppercase tracking-wider">
                                Vous êtes ici
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-sm font-medium mb-1 ${
                              layer.highlighted ? 'text-white/80' : 'text-gray-700'
                            }`}
                          >
                            {layer.full}
                          </div>
                          <div
                            className={`text-xs ${
                              layer.highlighted ? 'text-accent-400' : 'text-primary-600'
                            }`}
                          >
                            {layer.role}
                          </div>
                        </div>

                        {/* Année / badge */}
                        <div
                          className={`hidden sm:block flex-shrink-0 text-right ${
                            layer.highlighted ? 'text-white/60' : 'text-gray-400'
                          }`}
                        >
                          <div className="text-[10px] uppercase tracking-wider font-bold">
                            {layer.year}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connecteur entre les niveaux */}
                    {!isLast && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-6 bg-gradient-to-b from-primary-200 to-primary-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — AXES STRATÉGIQUES (cartes sombres avec piliers)     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 bg-white relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <SectionKicker icon={Target} label="Axes stratégiques" accent="primary" />
            <h3 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
              Trois priorités pour <span className="text-primary-600">2024–2028</span>.
            </h3>
          </RevealOnScroll>

          <StaggerChildren className="grid lg:grid-cols-3 gap-5" stagger={140}>
            {STRATEGIC_AXES.map(({ num, icon: Icon, title, desc, pillars }, i) => (
              <div
                key={num}
                className="group relative rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-7 text-white overflow-hidden hover:shadow-2xl hover:shadow-primary-900/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="absolute -right-4 -bottom-8 text-[8rem] font-extrabold text-white/[0.04] leading-none tracking-tighter pointer-events-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl group-hover:bg-accent-500/20 transition-colors duration-700" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                      <Icon
                        size={22}
                        className="text-accent-400 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent-400">
                      {num}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white mb-3 leading-tight">
                    {title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-5">{desc}</p>

                  {/* Piliers détaillés */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {pillars.map((pillar) => (
                      <div
                        key={pillar}
                        className="flex items-center gap-2 text-xs text-white/80"
                      >
                        <CheckCircle2
                          size={12}
                          className="text-accent-400 flex-shrink-0"
                        />
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — ZONES D'INTERVENTION (Mini map + grid)              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <SectionKicker icon={MapPin} label="Zones d'intervention" accent="accent" />
            <h3 className="text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
              Présents au cœur des <span className="text-accent-600">communautés</span>.
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              <strong className="text-dark">8 agences</strong> interconnectées au Burkina Faso
              — vous trouvez toujours FINACOM près de chez vous.
            </p>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Carte stylisée du Burkina */}
            <RevealOnScroll direction="left">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl bg-white shadow-xl border border-gray-100 p-8 overflow-hidden">
                {/* Pattern décoratif */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: 'linear-gradient(rgba(27,122,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,61,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />

                {/* SVG illustration Burkina simplifié */}
                <div className="relative flex flex-col items-center justify-center h-full">
                  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                    {/* Forme stylisée */}
                    <path
                      d="M40 70 Q 50 50 80 50 L 130 55 Q 160 60 165 80 L 170 120 Q 168 145 145 155 L 100 165 Q 70 165 50 145 L 35 110 Q 30 85 40 70 Z"
                      fill="url(#mapGradient)"
                      stroke="#1b7a3d"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="mapGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#dcfce7" />
                        <stop offset="100%" stopColor="#bbf7d0" />
                      </linearGradient>
                    </defs>

                    {/* Pin Ouagadougou (centre) */}
                    <g>
                      <circle cx="100" cy="105" r="14" fill="#d4a017" opacity="0.3" className="animate-pulse" />
                      <circle cx="100" cy="105" r="8" fill="#d4a017" />
                      <circle cx="100" cy="105" r="4" fill="white" />
                    </g>
                    <text x="115" y="108" fontSize="9" fontWeight="bold" fill="#0a2615">
                      Ouagadougou
                    </text>
                    <text x="115" y="118" fontSize="7" fill="#6b7280">
                      7 agences
                    </text>

                    {/* Pin Koudougou (ouest) */}
                    <g>
                      <circle cx="65" cy="115" r="10" fill="#1b7a3d" opacity="0.3" className="animate-pulse" />
                      <circle cx="65" cy="115" r="5" fill="#1b7a3d" />
                    </g>
                    <text x="20" y="135" fontSize="8" fontWeight="bold" fill="#0a2615">
                      Koudougou
                    </text>
                  </svg>
                </div>
              </div>
            </RevealOnScroll>

            {/* Cartes régions */}
            <RevealOnScroll direction="right" className="space-y-4">
              {REGIONS.map((region, i) => (
                <div
                  key={region.name}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                        <MapPin size={18} className="text-primary-700" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
                          {region.badge}
                        </div>
                        <h4 className="text-xl font-extrabold text-dark leading-tight">
                          {region.name}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-primary-600 tabular-nums leading-none">
                        {region.agencies}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                        {region.agencies > 1 ? 'agences' : 'agence'}
                      </div>
                    </div>
                  </div>
                  {region.city && (
                    <div className="text-sm text-gray-500 pt-3 border-t border-gray-100">
                      Antenne régionale : <strong className="text-dark">{region.city}</strong>
                    </div>
                  )}
                </div>
              ))}

              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MapPin size={16} />
                Voir nos 8 agences
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 8 — CTA FINAL                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-24 bg-white relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <Award size={40} className="text-accent-500 mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-extrabold text-dark mb-4 leading-tight">
              Prêt à faire grandir vos projets avec FINACOM ?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Découvrez notre gamme complète de produits et services — épargne,
              crédit, mobile banking — et trouvez la solution adaptée à votre vie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/produits-et-services"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Découvrir nos produits & services
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-gray-300 hover:border-primary-500 text-dark hover:bg-primary-50 font-semibold text-sm transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
