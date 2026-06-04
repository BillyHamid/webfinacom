import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Building2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

// ─── 8 Agences FINACOM (issues du brief) ────────────────────────────
const AGENCIES = [
  {
    id: 'siege',
    name: 'Siège FINACOM',
    city: 'Ouagadougou',
    badge: 'Siège social',
    desc: "Direction générale, services centraux et agence principale.",
    mapsUrl: 'https://maps.app.goo.gl/fsrjQBCzqLcww7mf9',
    isHQ: true,
  },
  {
    id: 'goughin',
    name: 'Agence Goughin',
    city: 'Ouagadougou',
    desc: "Au cœur du quartier Goughin, à proximité du grand marché.",
    mapsUrl: 'https://maps.app.goo.gl/oshkkG2iTnG32TTL7',
  },
  {
    id: 'saaba',
    name: 'Agence Saaba',
    city: 'Ouagadougou',
    desc: "Pour les habitants de Saaba et environs.",
    mapsUrl: 'https://maps.app.goo.gl/Fn9yQaTQR1246ejW7',
  },
  {
    id: 'sankar-yaare',
    name: 'Agence Sankar Yaare',
    city: 'Ouagadougou',
    desc: "Au service des activités économiques du quartier Sankar Yaare.",
    mapsUrl: 'https://maps.app.goo.gl/qw6fe5T2ZBqmzhsA8',
  },
  {
    id: 'bassinko',
    name: 'Agence Bassinko',
    city: 'Ouagadougou',
    desc: "Agence de proximité dans la zone nord de la capitale.",
    mapsUrl: 'https://maps.app.goo.gl/uj1wSt33z37tdDov7',
  },
  {
    id: 'koudougou',
    name: 'Agence Koudougou',
    city: 'Koudougou',
    badge: 'Région du Centre-Ouest',
    desc: "Notre antenne régionale du Centre-Ouest, à Koudougou.",
    mapsUrl: 'https://maps.app.goo.gl/4SD78n8j4taRscYq6',
  },
  {
    id: 'yagma',
    name: 'Agence Yagma',
    city: 'Ouagadougou',
    desc: "Au service du secteur de Yagma et alentours.",
    mapsUrl: 'https://maps.app.goo.gl/GXv6qcwzBtb7Uzrz8',
  },
  {
    id: 'kilwin',
    name: 'Agence Kilwin',
    city: 'Ouagadougou',
    desc: "Une agence proche pour les habitants du quartier Kilwin.",
    mapsUrl: 'https://maps.app.goo.gl/1JQdvysrYZC39NW3A',
  },
];

export default function Contact() {
  const [activeAgency, setActiveAgency] = useState(AGENCIES[0]);

  return (
    <section id="contact" className="py-24 lg:py-28 bg-white relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════ HEADER ═══════════ */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-5 uppercase tracking-[0.15em]">
            <MapPin size={12} />
            Nos agences
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Une agence FINACOM <span className="text-gradient-green">près de chez vous</span>.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Retrouvez-nous dans <strong className="text-dark">8 agences</strong> entièrement
            interconnectées — à Ouagadougou et à Koudougou — pour effectuer vos opérations
            dans tout le réseau FINACOM.
          </p>
        </RevealOnScroll>

        {/* ═══════════ SPLIT : MAP + INFOS AGENCE ACTIVE ═══════════ */}
        <RevealOnScroll className="mb-16">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* MAP */}
            <div className="lg:col-span-3 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10 ring-1 ring-gray-200 bg-gray-50 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                <iframe
                  key={activeAgency.id}
                  title={`Carte de ${activeAgency.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    activeAgency.name + ' ' + activeAgency.city + ', Burkina Faso'
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay anti-clic accidentel (optionnel) */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-lg text-xs font-bold text-primary-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
                  </span>
                  {activeAgency.name}
                </div>
              </div>
            </div>

            {/* Carte d'infos de l'agence active */}
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-8 lg:p-10 text-white shadow-2xl shadow-primary-900/20 overflow-hidden h-full">
                {/* Décor */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    {activeAgency.isHQ ? (
                      <Building2 size={18} className="text-accent-400" />
                    ) : (
                      <MapPin size={18} className="text-accent-400" />
                    )}
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent-400">
                      {activeAgency.badge || activeAgency.city}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 tracking-tight leading-tight">
                    {activeAgency.name}
                  </h3>

                  <p className="text-white/75 text-sm leading-relaxed mb-8">
                    {activeAgency.desc}
                  </p>

                  {/* Infos pratiques */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className="text-accent-400 flex-shrink-0 mt-0.5"
                      />
                      <div className="text-sm">
                        <div className="text-white/60 text-[11px] uppercase tracking-wider mb-0.5">
                          Localisation
                        </div>
                        <div className="text-white font-medium">{activeAgency.city}, Burkina Faso</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock
                        size={16}
                        className="text-accent-400 flex-shrink-0 mt-0.5"
                      />
                      <div className="text-sm">
                        <div className="text-white/60 text-[11px] uppercase tracking-wider mb-0.5">
                          Horaires
                        </div>
                        <div className="text-white font-medium">Lun–Ven · 7h30–17h00</div>
                        <div className="text-white/60 text-xs">Sam · 7h30–12h00</div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={activeAgency.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                    >
                      <Navigation size={15} />
                      Itinéraire
                      <ExternalLink size={13} className="opacity-60" />
                    </a>
                    <a
                      href={activeAgency.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/25 hover:border-white/50 hover:bg-white/5 text-white font-semibold text-sm transition-all duration-300"
                    >
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ═══════════ GRILLE DES 8 AGENCES ═══════════ */}
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles size={11} />
                Le réseau FINACOM
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-dark leading-tight">
                <span className="text-primary-600">8 agences</span> entièrement interconnectées.
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Cliquez pour explorer
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENCIES.map((agency) => {
              const isActive = agency.id === activeAgency.id;
              return (
                <button
                  key={agency.id}
                  onClick={() => setActiveAgency(agency)}
                  className={`group relative text-left rounded-2xl p-5 border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-primary-500 bg-primary-50/40 shadow-lg shadow-primary-500/10 -translate-y-1'
                      : 'border-gray-100 bg-white hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Badge HQ */}
                  {agency.isHQ && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider shadow">
                      Siège
                    </div>
                  )}

                  {/* Indicateur actif */}
                  {isActive && (
                    <span className="absolute top-0 left-5 right-5 h-1 bg-primary-600 rounded-b-full" />
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? 'bg-primary-600'
                          : 'bg-primary-50 group-hover:bg-primary-100'
                      }`}
                    >
                      {agency.isHQ ? (
                        <Building2
                          size={18}
                          className={isActive ? 'text-white' : 'text-primary-600'}
                        />
                      ) : (
                        <MapPin
                          size={18}
                          className={isActive ? 'text-white' : 'text-primary-600'}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-0.5">
                        {agency.city}
                      </div>
                      <div className="text-[15px] font-bold text-dark leading-tight">
                        {agency.name.replace('Agence ', '').replace('Siège ', '')}
                      </div>
                    </div>
                  </div>

                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {agency.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-semibold transition-colors ${
                        isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600'
                      }`}
                    >
                      Voir l'agence
                    </span>
                    <ArrowUpRight
                      size={13}
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-primary-600 translate-x-0'
                          : 'text-gray-300 -translate-x-1 group-hover:text-primary-600 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* ═══════════ BLOCS DE CONTACT GLOBAL ═══════════ */}
        <RevealOnScroll className="mt-16">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary-700" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                  Standard
                </div>
                <div className="text-sm font-bold text-dark">Service clientèle</div>
                <div className="text-xs text-gray-500 mt-1">Du lundi au vendredi, 8h–17h</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-accent-700" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                  Courriel
                </div>
                <div className="text-sm font-bold text-dark">contact@finacom.bf</div>
                <div className="text-xs text-gray-500 mt-1">Réponse sous 24h ouvrées</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Building2 size={18} className="text-blue-700" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                  Siège social
                </div>
                <div className="text-sm font-bold text-dark">Ouagadougou, Burkina Faso</div>
                <a
                  href={AGENCIES[0].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 hover:underline mt-1 inline-block"
                >
                  Itinéraire au siège →
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
