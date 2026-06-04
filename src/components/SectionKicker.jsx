import { Sparkles } from 'lucide-react';

const ACCENTS = {
  primary: 'bg-primary-50 text-primary-700 border-primary-100',
  accent: 'bg-accent-50 text-accent-700 border-accent-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
};

/**
 * Kicker standardisé pour les débuts de section.
 * Plus grand qu'avant + animation d'entrée bouncy + glow doré subtil.
 */
export default function SectionKicker({
  icon: Icon = Sparkles,
  label,
  accent = 'primary',
  className = '',
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border bg-white shadow-sm ${ACCENTS[accent]} text-[13px] font-extrabold uppercase tracking-[0.18em] mb-6 animate-kicker ${className}`}
    >
      <Icon size={15} className="flex-shrink-0" />
      <span>{label}</span>
    </div>
  );
}
