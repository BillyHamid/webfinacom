import { MapPin, Clock, ArrowRight, Users, CalendarDays } from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';

const events = [
  {
    day: '22',
    month: 'AVR',
    year: '2026',
    title: 'Forum de l\'Inclusion Financière 2026',
    time: '09:00 - 17:00',
    location: 'Ouagadougou, Salle de conférences FINACOM',
    type: 'Conférence',
    spots: '200 places',
    color: 'bg-primary-500',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  {
    day: '05',
    month: 'MAI',
    year: '2026',
    title: 'Formation en Gestion Financière pour PME',
    time: '08:30 - 13:00',
    location: 'Bobo-Dioulasso, Centre de formation',
    type: 'Formation',
    spots: '50 places',
    color: 'bg-accent-500',
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  {
    day: '18',
    month: 'MAI',
    year: '2026',
    title: 'Assemblée Générale des Sociétaires',
    time: '10:00 - 15:00',
    location: 'Ouagadougou, Siège FINACOM',
    type: 'Assemblée',
    spots: '500 places',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    day: '02',
    month: 'JUIN',
    year: '2026',
    title: 'Journée Portes Ouvertes — Nouvelles Agences',
    time: '08:00 - 18:00',
    location: 'Koudougou, Fada N\'Gourma, Dédougou',
    type: 'Événement',
    spots: 'Entrée libre',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

export default function Events() {
  return (
    <section id="events" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
                <CalendarDays size={12} />
                Événements
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark leading-tight tracking-tight">
                Prochains{' '}
                <span className="text-gradient-green">événements</span>
              </h2>
            </div>
            <a href="#" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-semibold hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300">
              Calendrier complet
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </RevealOnScroll>

        {/* Events List */}
        <StaggerChildren className="grid gap-4" stagger={100}>
          {events.map((event, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-[0_10px_40px_-10px_rgba(27,122,61,0.1)] transition-all duration-400 cursor-pointer"
            >
              {/* Date badge */}
              <div className={`flex-shrink-0 w-[72px] h-[72px] rounded-2xl ${event.color} flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <span className="relative text-2xl font-extrabold leading-none">{event.day}</span>
                <span className="relative text-[10px] uppercase tracking-widest mt-1 font-semibold opacity-80">{event.month}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-lg ${event.lightColor} ${event.textColor} text-[11px] font-semibold`}>
                    {event.type}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Users size={11} /> {event.spots}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary-600 transition-colors mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-[13px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gray-300" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-gray-300" />
                    {event.location}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-primary-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/20">
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
