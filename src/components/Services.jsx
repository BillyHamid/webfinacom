import { PiggyBank, Landmark, Smartphone, BarChart3, ArrowUpRight, Zap } from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';

const services = [
  {
    icon: PiggyBank,
    title: 'Épargne',
    description: 'Des produits d\'épargne sécurisés et rémunérés, adaptés à tous les profils. Constituez votre capital en toute confiance.',
    features: ['Épargne à vue', 'Dépôt à terme', 'Plan épargne projet'],
    gradient: 'from-primary-500 to-primary-700',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    accentColor: 'bg-primary-500',
  },
  {
    icon: Landmark,
    title: 'Crédits',
    description: 'Des solutions de financement flexibles pour vos projets personnels, agricoles ou commerciaux à des taux compétitifs.',
    features: ['Crédit personnel', 'Crédit agricole', 'Crédit PME/PMI'],
    gradient: 'from-accent-500 to-accent-700',
    iconBg: 'bg-accent-50',
    iconColor: 'text-accent-600',
    accentColor: 'bg-accent-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Money',
    description: 'Accédez à vos comptes et effectuez vos transactions depuis votre téléphone mobile, partout et à tout moment.',
    features: ['Transferts instantanés', 'Paiement factures', 'Recharges mobile'],
    gradient: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accentColor: 'bg-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Conseil Financier',
    description: 'Bénéficiez d\'un accompagnement personnalisé pour gérer efficacement vos finances et atteindre vos objectifs.',
    features: ['Formation en gestion', 'Coaching financier', 'Accompagnement projet'],
    gradient: 'from-emerald-500 to-emerald-700',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentColor: 'bg-emerald-500',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
            <Zap size={12} />
            Nos Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Des solutions financières{' '}
            <span className="text-gradient-green">adaptées</span> à vos besoins
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            FINACOM propose une gamme complète de services financiers pour accompagner
            les particuliers et les entreprises dans leur développement.
          </p>
        </RevealOnScroll>

        {/* Services Grid */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={120}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-transparent overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] cursor-pointer"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                {/* Top accent line */}
                <div className={`h-1 ${service.accentColor} opacity-0 group-hover:opacity-0 transition-opacity`} />

                <div className="relative z-10 p-7">
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} group-hover:bg-white/15 flex items-center justify-center mb-6 transition-all duration-500`}>
                    <Icon size={26} className={`${service.iconColor} group-hover:text-white transition-colors duration-500`} />
                  </div>

                  <h3 className="text-xl font-bold text-dark group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 group-hover:text-white/70 leading-relaxed mb-5 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Feature pills */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-white/60 transition-colors duration-500"
                      >
                        <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-white/40 transition-colors" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-primary-600 group-hover:text-white/90 text-sm font-semibold transition-all duration-500">
                    En savoir plus
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
