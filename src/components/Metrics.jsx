import { useCountUp } from '../hooks/useCountUp';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';
import { Users, MapPin, Banknote, Building2 } from 'lucide-react';

const metrics = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Clients actifs',
    description: 'Particuliers et entreprises',
    color: 'text-primary-500',
    bgColor: 'bg-primary-500',
    lightBg: 'bg-primary-50',
  },
  {
    icon: MapPin,
    value: 13,
    suffix: '',
    label: 'Régions couvertes',
    description: 'Sur tout le territoire national',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500',
    lightBg: 'bg-accent-50',
  },
  {
    icon: Banknote,
    value: 8,
    suffix: ' Mds',
    label: 'FCFA financés',
    description: 'Total des crédits accordés',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
  },
  {
    icon: Building2,
    value: 45,
    suffix: '+',
    label: 'Points de service',
    description: 'Agences et guichets',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
  },
];

function MetricCard({ icon: Icon, value, suffix, label, description, color, bgColor, lightBg }) {
  const { count, ref } = useCountUp(value, 2500);

  return (
    <div ref={ref} className="relative group">
      <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${lightBg} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={26} className={color} />
        </div>

        {/* Value */}
        <div className={`text-4xl sm:text-5xl font-extrabold ${color} mb-2 tracking-tight`}>
          {count.toLocaleString('fr-FR')}{suffix}
        </div>

        {/* Label */}
        <div className="text-base font-bold text-dark mb-1">{label}</div>
        <div className="text-xs text-gray-400">{description}</div>

        {/* Bottom accent */}
        <div className={`h-1 w-12 ${bgColor} rounded-full mx-auto mt-5 opacity-30 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`} />
      </div>
    </div>
  );
}

export default function Metrics() {
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
            <MetricCard key={metric.label} {...metric} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
