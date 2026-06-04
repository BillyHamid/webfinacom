import { useState } from 'react';
import {
  Video,
  Image as ImageIcon,
  FileText,
  Play,
  Download,
  Eye,
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
  FileType,
  Film,
} from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

// ─── Médias par catégorie ───────────────────────────────────────────
// TODO : remplacer par les vrais contenus FINACOM
const MEDIA_LIBRARY = {
  videos: {
    label: 'Vidéos',
    icon: Video,
    accent: 'rose',
    items: [
      {
        title: 'Présentation FINACOM',
        desc: 'Découvrez en 2 minutes l\'histoire, les missions et les valeurs de FINACOM.',
        thumb: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
        duration: '2:14',
        date: '15 Mars 2025',
        featured: true,
      },
      {
        title: 'Témoignage : le crédit communautaire de campagne',
        desc: 'Un groupement agricole de Koudougou raconte son expérience.',
        thumb: 'https://images.unsplash.com/photo-1592982537447-7440770faae0?auto=format&fit=crop&w=800&q=80',
        duration: '3:47',
        date: '02 Février 2025',
      },
      {
        title: 'Tutoriel : utiliser FINACOM+',
        desc: 'Pas-à-pas pour installer et utiliser l\'application bancaire mobile.',
        thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        duration: '4:12',
        date: '20 Janvier 2025',
      },
      {
        title: 'Inauguration agence Bassinko',
        desc: 'Reportage sur l\'ouverture de notre 8e agence à Ouagadougou.',
        thumb: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?auto=format&fit=crop&w=800&q=80',
        duration: '5:03',
        date: '10 Décembre 2024',
      },
    ],
  },
  photos: {
    label: 'Photos',
    icon: ImageIcon,
    accent: 'blue',
    items: [
      {
        title: 'Journée portes ouvertes — Siège',
        desc: 'Visite des locaux, ateliers et rencontres avec nos conseillers.',
        thumb: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
        count: '28 photos',
        date: '05 Mars 2025',
        featured: true,
      },
      {
        title: 'Équipe FINACOM 2025',
        desc: 'Le portrait collectif de nos équipes à travers les 8 agences.',
        thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        count: '42 photos',
        date: '01 Février 2025',
      },
      {
        title: 'Rentrée Daar daré',
        desc: 'Cérémonie de remise des carnets d\'épargne quotidienne dans les écoles.',
        thumb: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80',
        count: '36 photos',
        date: '15 Octobre 2024',
      },
      {
        title: 'Campagne agricole Centre-Ouest',
        desc: 'Les bénéficiaires du crédit communautaire de campagne en action.',
        thumb: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
        count: '24 photos',
        date: '20 Septembre 2024',
      },
    ],
  },
  documents: {
    label: 'Documents',
    icon: FileText,
    accent: 'accent',
    items: [
      {
        title: 'Rapport annuel 2024',
        desc: 'Synthèse de l\'année, chiffres clés, performances et perspectives.',
        type: 'PDF',
        size: '4,2 Mo',
        pages: '64 pages',
        date: '15 Avril 2025',
        featured: true,
      },
      {
        title: 'Brochure FINACOM+',
        desc: 'Découvrez toutes les fonctionnalités de notre application mobile.',
        type: 'PDF',
        size: '1,8 Mo',
        pages: '12 pages',
        date: '05 Mars 2025',
      },
      {
        title: "Conditions générales d'épargne",
        desc: 'Tous les termes et conditions de nos produits d\'épargne (DAV, DAT, Daar daré).',
        type: 'PDF',
        size: '480 Ko',
        pages: '8 pages',
        date: '01 Janvier 2025',
      },
      {
        title: 'Charte qualité de service',
        desc: 'Notre engagement envers nos clients — délais, recours, transparence.',
        type: 'PDF',
        size: '320 Ko',
        pages: '6 pages',
        date: '10 Octobre 2024',
      },
      {
        title: 'Grille tarifaire 2025',
        desc: 'Tous les tarifs et conditions de nos produits et services.',
        type: 'PDF',
        size: '210 Ko',
        pages: '4 pages',
        date: '20 Janvier 2025',
      },
      {
        title: "Statuts de l'association FINACOM",
        desc: 'Document institutionnel — objet, gouvernance, fonctionnement.',
        type: 'PDF',
        size: '1,1 Mo',
        pages: '24 pages',
        date: '12 Juin 2023',
      },
    ],
  },
};

// Couleurs par catégorie
const ACCENT_CLASSES = {
  rose: {
    text: 'text-rose-600',
    bg: 'bg-rose-50',
    bgActive: 'bg-rose-600',
    bgHover: 'group-hover:bg-rose-100',
    border: 'border-rose-200',
    gradient: 'from-rose-500 to-rose-700',
    soft: 'from-rose-500/10 to-rose-700/5',
  },
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    bgActive: 'bg-blue-600',
    bgHover: 'group-hover:bg-blue-100',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-700',
    soft: 'from-blue-500/10 to-blue-700/5',
  },
  accent: {
    text: 'text-accent-600',
    bg: 'bg-accent-50',
    bgActive: 'bg-accent-500',
    bgHover: 'group-hover:bg-accent-100',
    border: 'border-accent-200',
    gradient: 'from-accent-500 to-accent-700',
    soft: 'from-accent-500/10 to-accent-700/5',
  },
};

export default function Media() {
  const [activeId, setActiveId] = useState('videos');
  const active = MEDIA_LIBRARY[activeId];
  const accent = ACCENT_CLASSES[active.accent];
  const ActiveIcon = active.icon;

  return (
    <section id="media" className="py-24 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════ HEADER ═══════════ */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-5 uppercase tracking-[0.15em]">
            <Film size={12} />
            Médiathèque
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Explorez l'univers <span className="text-gradient-green">FINACOM</span> en images.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Vidéos institutionnelles, reportages photos et documents officiels — toutes
            les ressources pour mieux connaître FINACOM et ses produits.
          </p>
        </RevealOnScroll>

        {/* ═══════════ ONGLETS DE CATÉGORIES ═══════════ */}
        <RevealOnScroll className="mb-12">
          <div className="grid grid-cols-3 gap-3 lg:gap-4 max-w-3xl mx-auto">
            {Object.entries(MEDIA_LIBRARY).map(([id, cat]) => {
              const Icon = cat.icon;
              const cAccent = ACCENT_CLASSES[cat.accent];
              const isActive = id === activeId;
              return (
                <button
                  key={id}
                  onClick={() => setActiveId(id)}
                  className={`group relative rounded-2xl p-4 lg:p-5 border-2 transition-all duration-300 ${
                    isActive
                      ? `${cAccent.border} bg-gradient-to-br ${cAccent.soft} shadow-lg`
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <span
                    className={`absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 ${
                      isActive ? cAccent.bgActive : 'bg-transparent'
                    }`}
                  />
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive ? cAccent.bgActive : `${cAccent.bg} ${cAccent.bgHover}`
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-white' : cAccent.text
                        }`}
                      />
                    </div>
                    <div>
                      <div
                        className={`text-sm lg:text-base font-bold leading-tight transition-colors duration-300 ${
                          isActive ? 'text-dark' : 'text-gray-700 group-hover:text-dark'
                        }`}
                      >
                        {cat.label}
                      </div>
                      <div
                        className={`text-[10px] uppercase tracking-wider font-bold mt-1 transition-colors duration-300 ${
                          isActive ? cAccent.text : 'text-gray-400'
                        }`}
                      >
                        {cat.items.length}{' '}
                        {id === 'documents' ? 'fichiers' : id === 'videos' ? 'vidéos' : 'albums'}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* ═══════════ EN-TÊTE DE CATÉGORIE ═══════════ */}
        <div
          key={activeId}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 pb-8 border-b border-gray-200 animate-fade-in-up"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${accent.bg} flex items-center justify-center`}>
                <ActiveIcon size={20} className={accent.text} />
              </div>
              <span className={`text-xs uppercase tracking-[0.2em] font-bold ${accent.text}`}>
                {active.label}
              </span>
            </div>
            <h3 className="text-2xl lg:text-[1.875rem] font-extrabold text-dark leading-tight">
              {activeId === 'videos' && "L'univers FINACOM en mouvement."}
              {activeId === 'photos' && 'Nos moments forts en images.'}
              {activeId === 'documents' && 'Tous nos documents officiels.'}
            </h3>
          </div>
          <a
            href="#contact"
            className={`group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 ${accent.border} ${accent.text} font-semibold text-sm whitespace-nowrap hover:bg-white transition-all duration-300`}
          >
            Tout voir
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* ═══════════ GRILLE DE MÉDIAS ═══════════ */}
        <div key={`grid-${activeId}`} className="animate-fade-in-up">
          {/* VIDÉOS */}
          {activeId === 'videos' && (
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Vidéo featured (large) */}
              <FeaturedVideoCard
                item={MEDIA_LIBRARY.videos.items[0]}
                accent={accent}
              />
              {/* 3 vidéos secondaires */}
              <div className="lg:col-span-5 grid sm:grid-cols-1 gap-4">
                {MEDIA_LIBRARY.videos.items.slice(1).map((v, i) => (
                  <VideoCardSmall key={i} item={v} accent={accent} delay={i * 60} />
                ))}
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {activeId === 'photos' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MEDIA_LIBRARY.photos.items.map((p, i) => (
                <PhotoCard key={i} item={p} accent={accent} delay={i * 70} />
              ))}
            </div>
          )}

          {/* DOCUMENTS */}
          {activeId === 'documents' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MEDIA_LIBRARY.documents.items.map((d, i) => (
                <DocumentCard key={i} item={d} accent={accent} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Cartes spécialisées
// ═══════════════════════════════════════════════════════════════════

function FeaturedVideoCard({ item, accent }) {
  return (
    <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badge VIDEO À LA UNE */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
          <Sparkles size={11} />À la une
        </div>

        {/* Durée */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 backdrop-blur text-white text-xs font-bold tabular-nums">
          <Clock size={11} />
          {item.duration}
        </div>

        {/* Bouton play central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play
              size={28}
              className="text-rose-600 ml-1.5"
              fill="currentColor"
            />
          </div>
        </div>

        {/* Titre overlay en bas */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
          <h4 className="text-white text-xl lg:text-2xl font-extrabold mb-2 leading-tight">
            {item.title}
          </h4>
          <p className="text-white/80 text-sm leading-relaxed mb-3 max-w-md">
            {item.desc}
          </p>
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <Calendar size={11} />
            {item.date}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCardSmall({ item, accent, delay }) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-32 sm:w-40 flex-shrink-0 overflow-hidden">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play
              size={14}
              className="text-rose-600 ml-0.5"
              fill="currentColor"
            />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold tabular-nums">
          {item.duration}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-center">
        <h4 className="text-sm font-bold text-dark mb-1 leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
          {item.desc}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar size={10} />
          {item.date}
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ item, accent, delay }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {item.featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
            <Sparkles size={9} />À la une
          </div>
        )}

        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur text-white text-[10px] font-bold">
          <ImageIcon size={10} />
          {item.count}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white text-sm font-bold mb-1 leading-tight line-clamp-2">
            {item.title}
          </h4>
          <div className="flex items-center gap-1 text-white/70 text-[11px]">
            <Calendar size={10} />
            {item.date}
          </div>
        </div>

        {/* Hover button */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-white shadow-lg text-xs font-bold text-blue-600 inline-flex items-center gap-1.5">
            <Eye size={13} />
            Voir l'album
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({ item, accent, delay }) {
  return (
    <div
      className="group relative rounded-2xl bg-white border border-gray-100 p-6 hover:border-accent-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Halo gradient */}
      <div
        className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${accent.soft} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Badge "À la une" */}
      {item.featured && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
          <Sparkles size={9} />À la une
        </div>
      )}

      <div className="relative">
        {/* Icône type fichier */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-14 h-16 rounded-lg bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg relative`}
          >
            <FileType size={22} className="text-white" />
            {/* Corner fold (effet papier) */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-white/30 rounded-bl-md" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
            {item.type} · {item.size}
          </span>
        </div>

        <h4 className="text-base font-bold text-dark mb-2 pr-10 leading-tight">
          {item.title}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {item.desc}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center gap-4 mb-5 text-[11px] text-gray-400">
          <div className="flex items-center gap-1">
            <FileText size={11} />
            {item.pages}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            {item.date}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href="#"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg ${accent.bgActive} text-white font-bold text-xs hover:opacity-90 transition-all duration-300`}
          >
            <Download size={13} />
            Télécharger
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs transition-all duration-300"
          >
            <Eye size={13} />
            Aperçu
          </a>
        </div>
      </div>
    </div>
  );
}
