import { useCountUp } from '../hooks/useCountUp';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';
import { useSupabaseTable } from '../hooks/useSupabaseTable';
import { ICON_MAP, DEFAULT_ICON, getColorClasses } from '../lib/iconMap';
import Loader from './Loader';

function MetricCard({ icon, value, suffix, label, description, color }) {
  const Icon = ICON_MAP[icon] || DEFAULT_ICON;
  const { bg50, bg500, text500 } = getColorClasses(color);
  const { count, ref } = useCountUp(value, 2500);

  return (
    <div ref={ref} className="relative group">
      <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${bg50} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={26} className={text500} />
        </div>

        {/* Value */}
        <div className={`text-4xl sm:text-5xl font-extrabold ${text500} mb-2 tracking-tight`}>
          {count.toLocaleString('fr-FR')}{suffix}
        </div>

        {/* Label */}
        <div className="text-base font-bold text-dark mb-1">{label}</div>
        <div className="text-xs text-gray-400">{description}</div>

        {/* Bottom accent */}
        <div className={`h-1 w-12 ${bg500} rounded-full mx-auto mt-5 opacity-30 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`} />
      </div>
    </div>
  );
}

export default function Metrics() {
  const { data: metrics, loading } = useSupabaseTable('key_metrics', { orderBy: 'sort_order' });

  if (loading) {
    return (
      <section id="metrics" className="py-28 bg-mesh-1">
        <Loader fullScreen={false} label="" />
      </section>
    );
  }

  if (metrics.length === 0) return null;

  return (
    <section id="metrics" className="py-28 bg-mesh-1 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
            Nos Chiffres Clés
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            La confiance en{' '}
            <span className="text-gradient-green">chiffres</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Depuis plus de 15 ans, FINACOM œuvre pour l'inclusion financière
            au Burkina Faso avec des résultats concrets et mesurables.
          </p>
        </RevealOnScroll>

        {/* Metrics Grid */}
        <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6" stagger={120}>
          {metrics.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
