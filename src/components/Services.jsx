import { useState } from 'react';
import {
  PiggyBank,
  HandCoins,
  Smartphone,
  Briefcase,
  Wallet,
  Landmark,
  Sprout,
  Users,
  Globe,
  CreditCard,
  Send,
  ShieldCheck,
  FileText,
  Calculator,
  Banknote,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Check,
  Star,
  MessageSquare,
  Repeat,
  Sparkles,
  UserPlus,
  Search,
  ClipboardCheck,
  Rocket,
  HelpCircle,
  MapPin,
  Award,
  Clock,
  Plus,
  Minus,
} from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';

// ─── PRODUITS PHARES (6 services digitaux à mettre en avant) ────────
// Interprétations à vérifier — corriger si besoin
const FEATURED_PRODUCTS = [
  {
    badge: 'App mobile',
    name: 'FINACOM+',
    tagline: "Votre banque dans la poche",
    desc: "L'application FINACOM pour consulter vos comptes, faire vos virements et piloter votre épargne depuis votre téléphone.",
    icon: Smartphone,
    accent: 'from-primary-500 to-primary-700',
  },
  {
    badge: 'Collecte de proximité',
    name: 'DCOLLECT',
    tagline: 'La collecte décentralisée',
    desc: "Notre service de collecte d'épargne au plus près de vous, via nos agents de proximité dans les marchés, quartiers et villages.",
    icon: HandCoins,
    accent: 'from-accent-500 to-accent-700',
  },
  {
    badge: 'Transfert instantané',
    name: 'BANK TO WALLET',
    tagline: 'De votre compte à votre mobile',
    desc: "Transférez en quelques secondes l'argent de votre compte FINACOM vers votre portefeuille Orange Money ou Coris Money.",
    icon: Repeat,
    accent: 'from-blue-500 to-blue-700',
  },
  {
    badge: 'Interopérabilité UEMOA',
    name: 'PI-SPI',
    tagline: 'Paiement instantané UEMOA',
    desc: "Recevez et envoyez des paiements instantanés vers toute banque de la zone UEMOA via le système SPI.",
    icon: Zap,
    accent: 'from-purple-500 to-purple-700',
  },
  {
    badge: 'Sans internet',
    name: 'SMS Banking',
    tagline: 'Vos comptes par SMS',
    desc: "Consultez votre solde, recevez vos relevés et confirmez vos opérations par simple SMS — partout, sans connexion internet.",
    icon: MessageSquare,
    accent: 'from-emerald-500 to-emerald-700',
  },
  {
    badge: 'Carte prépayée',
    name: 'africards',
    tagline: 'La carte africaine prépayée',
    desc: "Rechargez et payez vos achats en magasin et en ligne, partout en Afrique de l'Ouest avec votre carte africards FINACOM.",
    icon: CreditCard,
    accent: 'from-rose-500 to-rose-700',
  },
];

// ─── TAXONOMIE COMPLÈTE — 4 catégories produits & services ──────────
const CATEGORIES = [
  {
    id: 'epargne',
    label: "Produits d'épargne",
    icon: PiggyBank,
    accent: 'primary',
    headline: "Faites fructifier votre épargne, à votre rythme.",
    description:
      "Quatre formules d'épargne adaptées à chaque profil — du dépôt libre à l'épargne quotidienne 'Daar daré', en passant par les placements à terme rémunérés.",
    products: [
      {
        icon: Wallet,
        name: 'Compte de Dépôt à Vue (DAV)',
        desc: "Versements et retraits sans contrainte, opérations quotidiennes et accès à votre épargne à tout moment.",
      },
      {
        icon: Landmark,
        name: 'Compte de Dépôt à Terme (DAT)',
        desc: "Placez votre épargne sur une durée déterminée et bénéficiez d'un taux d'intérêt préférentiel garanti.",
      },
      {
        icon: PiggyBank,
        name: 'Daar daré (épargne journalière)',
        desc: "L'épargne quotidienne spécialisée FINACOM — épargnez petit à petit, chaque jour, vers un grand projet.",
      },
      {
        icon: ShieldCheck,
        name: 'Dépôts spécifiques',
        desc: "Dépôts de garanties financières liés à une demande de crédit — sécurisés et clairement encadrés.",
      },
    ],
  },
  {
    id: 'credit',
    label: 'Produits de crédit',
    icon: HandCoins,
    accent: 'accent',
    headline: "Un crédit pensé pour faire grandir vos projets.",
    description:
      "Trois familles de crédit pour accompagner vos projets — du commerce à l'exploitation agricole, en passant par les besoins du salarié.",
    products: [
      {
        icon: Briefcase,
        name: 'Crédit commercial',
        desc: "Financement du fonds de roulement, stocks, équipement et investissement pour les commerçants et entrepreneurs.",
      },
      {
        icon: Users,
        name: 'Crédit aux salariés',
        desc: "Prêts personnels et trésorerie pour les salariés des secteurs public et privé, remboursés sur salaire domicilié.",
      },
      {
        icon: Sprout,
        name: 'Crédit agricole',
        desc: "Financement adapté aux saisons agricoles : intrants, équipement, élevage et transformation.",
      },
      {
        icon: Users,
        name: 'Crédit communautaire de campagne',
        desc: "Financement collectif pour les groupements agricoles solidaires — la force du collectif au service de la récolte.",
      },
    ],
  },
  {
    id: 'digital',
    label: 'Services digitaux',
    icon: Smartphone,
    accent: 'blue',
    headline: 'Votre banque, partout, à tout moment.',
    description:
      "Une gamme complète de services numériques pour gérer vos finances depuis votre téléphone, avec ou sans internet — y compris en partenariat avec UBA et les principaux opérateurs mobile money.",
    products: [
      {
        icon: Smartphone,
        name: 'FINACOM+',
        desc: "L'application mobile FINACOM : consultation, virements et pilotage de vos comptes en quelques clics.",
        featured: true,
      },
      {
        icon: HandCoins,
        name: 'DCOLLECT',
        desc: "Service de collecte décentralisée d'épargne, via nos agents de proximité au cœur des communautés.",
        featured: true,
      },
      {
        icon: Repeat,
        name: 'BANK TO WALLET',
        desc: "Transferts instantanés entre votre compte FINACOM et votre portefeuille mobile money.",
        featured: true,
      },
      {
        icon: Zap,
        name: 'PI-SPI',
        desc: "Paiement instantané interopérable dans la zone UEMOA via le Système de Paiement Instantané.",
        featured: true,
      },
      {
        icon: MessageSquare,
        name: 'SMS Banking',
        desc: "Vos opérations bancaires par simple SMS — accessible partout, sans connexion internet.",
        featured: true,
      },
      {
        icon: CreditCard,
        name: 'africards',
        desc: "La carte prépayée africaine pour vos paiements quotidiens en magasin et en ligne.",
        featured: true,
      },
      {
        icon: CreditCard,
        name: 'Cartes VISA',
        desc: "En partenariat avec United Bank for Africa (UBA) — retraits et paiements internationaux.",
      },
      {
        icon: Send,
        name: 'Orange Money',
        desc: "Service mobile money en partenariat — versements, retraits et transferts instantanés.",
      },
      {
        icon: Send,
        name: 'Coris Money',
        desc: "Service mobile money en partenariat — versements et retraits depuis votre téléphone.",
      },
    ],
  },
  {
    id: 'rattaches',
    label: 'Services rattachés',
    icon: Briefcase,
    accent: 'emerald',
    headline: 'Tous les services financiers liés à vos comptes.',
    description:
      "Les services qui facilitent l'usage quotidien de vos produits d'épargne et de crédit — virements, attestations, engagements par signature.",
    products: [
      {
        icon: Banknote,
        name: 'Virements de salaires',
        desc: "Réception automatique de votre salaire (secteurs public et privé) directement sur votre compte FINACOM.",
      },
      {
        icon: Banknote,
        name: 'Virements de pensions',
        desc: "Réception de vos pensions de retraite CNSS et CARFO sans déplacement supplémentaire.",
      },
      {
        icon: FileText,
        name: "Carnets d'Ordre de Paiement (ODP)",
        desc: "Mis à votre disposition pour faciliter vos opérations de retrait dans tout le réseau FINACOM.",
      },
      {
        icon: ShieldCheck,
        name: 'Engagements par signature',
        desc: "Cautions de soumissions de marchés et attestations de ligne de crédit pour vos appels d'offres.",
      },
      {
        icon: FileText,
        name: 'Attestations bancaires',
        desc: "Délivrance d'attestations de solde, RIB, attestations de compte et de capacité financière, confirmations de solde.",
      },
      {
        icon: Calculator,
        name: 'Interconnexion agences',
        desc: "Réseau FINACOM entièrement interconnecté — accédez à votre argent dans toute agence et tout guichet.",
      },
    ],
  },
];

const ACCENT_CLASSES = {
  primary: {
    text: 'text-primary-600',
    bg: 'bg-primary-50',
    bgActive: 'bg-primary-600',
    bgHover: 'group-hover:bg-primary-100',
    border: 'border-primary-200',
    gradient: 'from-primary-500/10 to-primary-700/5',
  },
  accent: {
    text: 'text-accent-600',
    bg: 'bg-accent-50',
    bgActive: 'bg-accent-500',
    bgHover: 'group-hover:bg-accent-100',
    border: 'border-accent-200',
    gradient: 'from-accent-500/10 to-accent-700/5',
  },
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    bgActive: 'bg-blue-600',
    bgHover: 'group-hover:bg-blue-100',
    border: 'border-blue-200',
    gradient: 'from-blue-500/10 to-blue-700/5',
  },
  emerald: {
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    bgActive: 'bg-emerald-600',
    bgHover: 'group-hover:bg-emerald-100',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500/10 to-emerald-700/5',
  },
};

export default function Services() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const activeCategory = CATEGORIES.find((c) => c.id === activeId);
  const activeAccent = ACCENT_CLASSES[activeCategory.accent];
  const ActiveIcon = activeCategory.icon;

  return (
    <section id="services" className="py-24 lg:py-28 bg-white relative overflow-hidden">
      {/* Décoration de fond */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 600px at 80% 20%, rgba(27,122,61,0.04) 0%, transparent 60%), radial-gradient(ellipse 600px 400px at 10% 80%, rgba(212,160,23,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════ HEADER ═══════════ */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
            <Zap size={12} />
            Nos produits et services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Une offre complète, <span className="text-gradient-green">au service de vos projets</span>.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            FINACOM structure son offre autour de quatre familles de produits et services,
            pensées pour répondre à tous les besoins financiers — du particulier à l'entreprise.
          </p>
        </RevealOnScroll>

        {/* ═══════════ SECTION PRODUITS PHARES ═══════════ */}
        <RevealOnScroll className="mb-24">
          {/* Bandeau d'intro phares */}
          <div className="flex items-end justify-between gap-6 mb-8 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Star size={11} fill="currentColor" />
                Nos produits phares
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-dark leading-tight">
                6 services digitaux pour <span className="text-accent-600">moderniser votre rapport à l'argent</span>.
              </h3>
            </div>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Découvrir tous nos services
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Grille des 6 produits phares */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Halo gradient au hover */}
                  <div
                    className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
                  />

                  {/* Top accent bar */}
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${p.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-gray-400">
                        {p.badge}
                      </span>
                    </div>

                    <h4 className="text-xl font-extrabold text-dark mb-1 tracking-tight">
                      {p.name}
                    </h4>
                    <p className="text-[13px] font-semibold text-gray-500 mb-3 italic">
                      {p.tagline}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                      {p.desc}
                    </p>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-dark group-hover:text-primary-600 transition-colors"
                    >
                      En savoir plus
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* ═══════════ DIVIDER ═══════════ */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-400 text-[11px] uppercase tracking-[0.25em] font-bold flex items-center gap-2">
            <Sparkles size={12} className="text-accent-500" />
            Notre offre complète
          </span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* ═══════════ ONGLETS DE CATÉGORIES ═══════════ */}
        <RevealOnScroll className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const accent = ACCENT_CLASSES[cat.accent];
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`group relative text-left rounded-2xl p-4 lg:p-5 border-2 transition-all duration-300 ${
                    isActive
                      ? `${accent.border} bg-gradient-to-br ${accent.gradient} shadow-lg`
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <span
                    className={`absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 ${
                      isActive ? accent.bgActive : 'bg-transparent'
                    }`}
                  />
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div
                      className={`flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive ? accent.bgActive : `${accent.bg} ${accent.bgHover}`
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-white' : accent.text
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-1 transition-colors duration-300 ${
                          isActive ? accent.text : 'text-gray-400'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')} · {cat.products.length} produits
                      </div>
                      <div
                        className={`text-sm lg:text-[15px] font-bold leading-tight transition-colors duration-300 ${
                          isActive ? 'text-dark' : 'text-gray-700 group-hover:text-dark'
                        }`}
                      >
                        {cat.label}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* ═══════════ CONTENU DE LA CATÉGORIE ACTIVE ═══════════ */}
        <div key={activeId} className="animate-fade-in-up">
          {/* En-tête catégorie */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 pb-8 border-b border-gray-100">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${activeAccent.bg} flex items-center justify-center`}
                >
                  <ActiveIcon size={20} className={activeAccent.text} />
                </div>
                <span className={`text-xs uppercase tracking-[0.2em] font-bold ${activeAccent.text}`}>
                  {activeCategory.label}
                </span>
              </div>
              <h3 className="text-2xl lg:text-[2rem] font-extrabold text-dark leading-tight mb-3">
                {activeCategory.headline}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                {activeCategory.description}
              </p>
            </div>
            <a
              href="#contact"
              className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg ${activeAccent.bgActive} text-white font-semibold text-sm whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}
            >
              Parler à un conseiller
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Grille produits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeCategory.products.map((product, i) => {
              const ProductIcon = product.icon;
              return (
                <div
                  key={`${activeId}-${i}`}
                  className="group relative rounded-xl bg-white border border-gray-100 p-6 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Badge "PHARE" pour les 6 produits prioritaires */}
                  {product.featured && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
                      <Star size={9} fill="currentColor" />
                      Phare
                    </div>
                  )}

                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${activeAccent.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}
                  />

                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-xl ${activeAccent.bg} ${activeAccent.bgHover} flex items-center justify-center mb-4 transition-colors duration-300`}
                    >
                      <ProductIcon size={22} className={activeAccent.text} />
                    </div>
                    <h4 className="text-base font-bold text-dark mb-2 pr-12">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {product.desc}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${activeAccent.text} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
                    >
                      <Check size={12} />
                      En savoir plus
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION SUPPLÉMENTAIRE — COMMENT ÇA MARCHE (4 étapes)           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <ProcessSection />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION SUPPLÉMENTAIRE — STATS PAR FAMILLE (Dashboard-style)    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <CategoryStats />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION SUPPLÉMENTAIRE — FAQ ACCORDION                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <FAQSection />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION SUPPLÉMENTAIRE — CTA FINAL                              */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <FinalCTA />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SOUS-COMPOSANTS
// ═══════════════════════════════════════════════════════════════════

const PROCESS_STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Choisissez',
    desc: "Identifiez le produit qui correspond à votre projet : épargne, crédit, transfert ou service rattaché.",
  },
  {
    num: '02',
    icon: ClipboardCheck,
    title: 'Constituez le dossier',
    desc: "Pièces d'identité, justificatifs et formulaire simplifié — la liste exacte vous est fournie selon le produit.",
  },
  {
    num: '03',
    icon: UserPlus,
    title: 'Rencontrez un conseiller',
    desc: 'En agence ou par téléphone, un conseiller FINACOM étudie votre demande sous 48h ouvrées.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Profitez du service',
    desc: "Votre produit est activé. Suivez votre compte via l'app FINACOM+ ou en agence.",
  },
];

function ProcessSection() {
  return (
    <div className="py-20 lg:py-24 border-t border-gray-100 mt-16">
      <RevealOnScroll className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-4">
          <Clock size={11} />
          Comment ça marche
        </div>
        <h3 className="text-3xl lg:text-[2.25rem] font-extrabold text-dark leading-tight">
          Souscrire à un produit FINACOM, <span className="text-primary-600">en 4 étapes</span>.
        </h3>
        <p className="text-gray-500 mt-4 leading-relaxed">
          De la première question au premier versement — un parcours simple,
          rapide et accompagné.
        </p>
      </RevealOnScroll>

      <div className="relative">
        {/* Ligne horizontale de fond */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-primary-200" />

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={120}>
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative text-center">
                {/* Cercle numéroté */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-white shadow-xl border-2 border-primary-100" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                  {/* Numéro flottant */}
                  <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-accent-500 text-primary-900 font-extrabold text-sm flex items-center justify-center shadow-lg">
                    {step.num}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-dark mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </StaggerChildren>
      </div>
    </div>
  );
}

const CATEGORY_KPIS = [
  {
    label: "Produits d'épargne",
    metric: '4',
    sub: 'formules adaptées',
    detail: "DAV · DAT · Daar daré · Dépôts spécifiques",
    color: 'primary',
  },
  {
    label: 'Produits de crédit',
    metric: '4',
    sub: 'types de financement',
    detail: 'Commercial · Salariés · Agricole · Communautaire',
    color: 'accent',
  },
  {
    label: 'Services digitaux',
    metric: '9',
    sub: 'solutions en ligne',
    detail: "Dont 6 phares : FINACOM+, DCOLLECT, PI-SPI…",
    color: 'blue',
  },
  {
    label: 'Services rattachés',
    metric: '6',
    sub: "services complémentaires",
    detail: 'Virements · Attestations · Engagements signés',
    color: 'emerald',
  },
];

function CategoryStats() {
  return (
    <div className="py-20 lg:py-24 border-t border-gray-100">
      <RevealOnScroll className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-4">
          <Sparkles size={11} />
          Vue d'ensemble
        </div>
        <h3 className="text-3xl lg:text-[2.25rem] font-extrabold text-dark leading-tight">
          <span className="text-gradient-green">23 produits & services</span> à votre disposition.
        </h3>
      </RevealOnScroll>

      <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={100}>
        {CATEGORY_KPIS.map((kpi) => {
          const colorClasses = {
            primary: 'from-primary-500 to-primary-700 text-primary-700 bg-primary-50',
            accent: 'from-accent-500 to-accent-700 text-accent-700 bg-accent-50',
            blue: 'from-blue-500 to-blue-700 text-blue-700 bg-blue-50',
            emerald: 'from-emerald-500 to-emerald-700 text-emerald-700 bg-emerald-50',
          };
          const c = colorClasses[kpi.color];
          const [gradient, textColor, bgColor] = c.split(' ').slice(0, 4).join(' ').match(/^(\S+\s\S+\s\S+)\s(\S+)\s(\S+)$/) || [];

          return (
            <div
              key={kpi.label}
              className="relative rounded-2xl bg-white border border-gray-100 p-6 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Bandeau coloré gauche */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${c.split(' ')[0]} ${c.split(' ')[1]}`}
              />

              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                {kpi.label}
              </div>
              <div className={`text-5xl font-extrabold tabular-nums leading-none mb-2 ${c.split(' ')[2]}`}>
                {kpi.metric}
              </div>
              <div className="text-sm font-bold text-dark mb-3">{kpi.sub}</div>
              <div className="text-xs text-gray-500 leading-relaxed pt-3 border-t border-gray-100">
                {kpi.detail}
              </div>
            </div>
          );
        })}
      </StaggerChildren>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: 'Quels documents pour ouvrir un compte ?',
    a: "Une pièce d'identité en cours de validité (CNIB, passeport ou carte consulaire), un justificatif de domicile et un montant minimum d'ouverture (variable selon le type de compte).",
  },
  {
    q: "Combien de temps prend la validation d'un crédit ?",
    a: "Notre engagement : une réponse à votre demande sous 48 heures ouvrées après la complétude de votre dossier. Pour les crédits importants, l'analyse peut prendre jusqu'à 7 jours ouvrés.",
  },
  {
    q: 'Puis-je gérer mes comptes depuis mon téléphone ?',
    a: "Oui, via l'application FINACOM+ disponible sur Android et iOS — ou en envoyant simplement un SMS au numéro court FINACOM (SMS Banking, sans connexion internet).",
  },
  {
    q: 'Quelles sont vos zones d\'intervention ?',
    a: "FINACOM dispose de 8 agences interconnectées au Burkina Faso : 7 à Ouagadougou (Siège, Goughin, Saaba, Sankar Yaare, Bassinko, Yagma, Kilwin) et 1 à Koudougou pour la région du Centre-Ouest.",
  },
  {
    q: 'Vos taux sont-ils compétitifs ?',
    a: "Nos taux d'épargne et de crédit sont régulés dans le cadre des conditions BCEAO et étudiés pour répondre aux réalités du marché burkinabè. Un simulateur est disponible pour chaque produit.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="py-20 lg:py-24 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[11px] font-bold uppercase tracking-wider mb-4">
            <HelpCircle size={11} />
            Questions fréquentes
          </div>
          <h3 className="text-3xl lg:text-[2.25rem] font-extrabold text-dark leading-tight">
            Tout ce qu'il faut savoir, <span className="text-accent-600">simplement</span>.
          </h3>
        </RevealOnScroll>

        <RevealOnScroll className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-primary-200 bg-primary-50/30 shadow-lg'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-bold text-dark flex-1 leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary-600 text-white rotate-180'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-700'
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 animate-fade-in-up">
                    <div className="pt-2 border-t border-primary-200/40">
                      <p className="text-sm text-gray-600 leading-relaxed pt-4">
                        {item.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </RevealOnScroll>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <div className="py-20 lg:py-24 border-t border-gray-100">
      <RevealOnScroll>
        <div className="relative rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-10 lg:p-14 text-center overflow-hidden">
          {/* Décor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <Award size={42} className="text-accent-400 mx-auto mb-6" />
            <h3 className="text-2xl lg:text-4xl font-extrabold text-white mb-4 leading-tight max-w-2xl mx-auto">
              Prêt à faire grandir votre projet avec FINACOM ?
            </h3>
            <p className="text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Nos conseillers vous accompagnent pour trouver la solution
              parfaitement adaptée à votre situation — particulier, professionnel
              ou entreprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm transition-all duration-300 shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-0.5"
              >
                Ouvrir un compte
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
              >
                <MessageSquare size={16} />
                Parler à un conseiller
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
