import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Quote,
} from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';
import SectionKicker from './SectionKicker';

// Aperçu compact des valeurs (3 chips)
const VALUES = [
  { icon: ShieldCheck, label: 'Intégrité' },
  { icon: Users, label: "Esprit d'équipe" },
  { icon: Heart, label: 'Amour du prochain' },
];

// 3 KPIs synthétiques
const KEY_NUMBERS = [
  { value: '50+', label: "Années d'engagement", sub: 'via l\'ODE depuis 1972' },
  { value: '50 000', label: 'Clients actifs', sub: 'Urbains et ruraux' },
  { value: '8', label: 'Agences', sub: 'à Ouagadougou & Koudougou' },
];

export default function AboutPreview() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Décor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ─── Gauche : photo + slogan flottant ─── */}
          <RevealOnScroll direction="left" className="lg:col-span-5">
            <div className="relative">
              {/* Halo doux */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/15 to-accent-500/15 rounded-[2rem] blur-3xl" />

              {/* Photo — paysans africains joyeux */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-primary-900/15 ring-1 ring-white">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100" />
                <img
                  src="https://media.istockphoto.com/id/1478140327/photo/portrait-of-a-man-in-the-countryside-harvesting-fruit-spondias-siriguela-seriguela-ciriguela.jpg?s=2048x2048&w=is&k=20&c=0kqqlXC27iSoq7U6kSeFH7SDC7-SZBjz9mZ2YesvmAU="
                  alt="FINACOM accompagne avec joie les paysans burkinabè"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {/* Léger gradient bas pour ancrer */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
              </div>

              {/* Carte slogan flottante */}
              <div className="absolute -bottom-6 -right-6 max-w-[280px] bg-white rounded-2xl p-5 shadow-2xl shadow-primary-900/15 border border-gray-100">
                <Quote
                  size={20}
                  className="text-accent-500 mb-2"
                  strokeWidth={2.5}
                />
                <p className="text-sm text-dark font-semibold italic leading-snug">
                  « Une institution de microfinance moderne au service du développement. »
                </p>
              </div>

              {/* Badge expérience */}
              <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-primary-700 text-white shadow-xl">
                <div className="text-2xl font-extrabold text-accent-400 leading-none">50+</div>
                <div className="text-[10px] text-white/70 mt-0.5">Années · ODE</div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ─── Droite : contenu condensé ─── */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <SectionKicker icon={Sparkles} label="À propos de FINACOM" accent="primary" />
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
                Une finance{' '}
                <span className="text-gradient-green">proche, moderne</span> et durable.
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                Depuis 1972 via l'<strong className="text-dark">ODE</strong>, et aujourd'hui
                en tant que branche financière de la <strong className="text-dark">FEME</strong>,
                FINACOM accompagne chaque Burkinabè — <strong className="text-dark">urbain
                comme rural</strong> — vers de meilleures conditions de vie grâce à
                des solutions d'épargne et de crédit modernes.
              </p>
            </RevealOnScroll>

            {/* 3 valeurs en chips */}
            <RevealOnScroll delay={150}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Nos valeurs
                </span>
                <span className="w-6 h-px bg-gray-300" />
                {VALUES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm"
                  >
                    <Icon size={13} className="text-primary-600" />
                    <span className="text-sm font-semibold text-dark">{label}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* 3 KPIs synthèse */}
            <StaggerChildren
              className="grid grid-cols-3 gap-4 lg:gap-6 mb-10 pb-8 border-b border-gray-200"
              stagger={120}
            >
              {KEY_NUMBERS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl lg:text-4xl font-extrabold text-dark mb-1 tabular-nums tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs lg:text-sm font-bold text-dark mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-snug">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </StaggerChildren>

            {/* CTA → page À propos complète */}
            <RevealOnScroll delay={400}>
              <Link
                to="/a-propos"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-dark hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary-900/10 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Découvrir notre histoire complète</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <p className="text-xs text-gray-400 mt-3">
                Histoire · Mission · Valeurs · Axes stratégiques · Gouvernance
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
