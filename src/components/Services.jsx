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
import SectionKicker from './SectionKicker';

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
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
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
          <SectionKicker icon={Zap} label="Nos produits et services" accent="primary" />
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Une offre complète, <span className="text-gradient-green">au service de vos projets</span>.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            FINACOM structure son offre autour de quatre familles de produits et services,
            pensées pour répondre à tous les besoins financiers — du particulier à l'entreprise.
          </p>
        </RevealOnScroll>

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
        {/* SECTION SUPPLÉMENTAIRE — FAQ ACCORDION                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <FAQSection />
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
        <SectionKicker icon={Clock} label="Comment ça marche" accent="blue" />
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
          <SectionKicker icon={HelpCircle} label="Questions fréquentes" accent="accent" />
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

