import { MapPin, Clock, ArrowRight, Users, CalendarDays } from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';
import { useSupabaseTable } from '../hooks/useSupabaseTable';
import { getColorClasses } from '../lib/iconMap';
import Loader from './Loader';

function deriveColors(color) {
  const hue = (color || 'bg-primary-500').replace('bg-', '').replace(/-\d+$/, '');
  const { bg50, text600 } = getColorClasses(hue);
  return { lightColor: bg50, textColor: text600 };
}

export default function Events() {
  const { data: events, loading } = useSupabaseTable('events', {
    orderBy: 'event_date',
    ascending: true,
  });

  if (loading) {
    return (
      <section id="events" className="py-28 bg-gray-50">
        <Loader fullScreen={false} label="" />
      </section>
    );
  }

  if (events.length === 0) return null;

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
          {events.map((event) => {
            const date = new Date(`${event.event_date}T00:00:00`);
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase();
            const spots = event.capacity > 0 ? `${event.capacity} places` : 'Entrée libre';
            const { lightColor, textColor } = deriveColors(event.color);
            return (
              <div
                key={event.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-[0_10px_40px_-10px_rgba(27,122,61,0.1)] transition-all duration-400 cursor-pointer"
              >
                {/* Date badge */}
                <div className={`flex-shrink-0 w-[72px] h-[72px] rounded-2xl ${event.color} flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <span className="relative text-2xl font-extrabold leading-none">{day}</span>
                  <span className="relative text-[10px] uppercase tracking-widest mt-1 font-semibold opacity-80">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-lg ${lightColor} ${textColor} text-[11px] font-semibold`}>
                      {event.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Users size={11} /> {spots}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary-600 transition-colors mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-[13px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gray-300" />
                      {event.time_range}
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
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
