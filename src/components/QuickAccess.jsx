import { Mail, Monitor, FileText, ArrowUpRight, CreditCard, HelpCircle, Smartphone } from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';

const links = [
  {
    icon: Monitor,
    title: 'Espace Client',
    description: 'Consultez vos comptes et effectuez vos opérations en ligne',
    gradient: 'from-primary-500 to-primary-700',
    href: '#',
  },
  {
    icon: FileText,
    title: 'Demandes en ligne',
    description: 'Soumettez vos demandes de crédit ou d\'ouverture de compte',
    gradient: 'from-accent-500 to-accent-700',
    href: '#',
  },
  {
    icon: CreditCard,
    title: 'Simulateur de Crédit',
    description: 'Estimez vos mensualités et votre capacité d\'emprunt',
    gradient: 'from-blue-500 to-blue-700',
    href: '#',
  },
  {
    icon: Mail,
    title: 'Messagerie',
    description: 'Accédez à votre boîte email professionnelle FINACOM',
    gradient: 'from-emerald-500 to-emerald-700',
    href: '#',
  },
  {
    icon: Smartphone,
    title: 'Mobile Banking',
    description: 'Téléchargez notre application mobile pour gérer vos comptes',
    gradient: 'from-purple-500 to-purple-700',
    href: '#',
  },
  {
    icon: HelpCircle,
    title: 'FAQ & Assistance',
    description: 'Trouvez rapidement les réponses à vos questions',
    gradient: 'from-rose-500 to-rose-700',
    href: '#',
  },
];

export default function QuickAccess() {
  return (
    <section id="quick-access" className="py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
            Accès Rapide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Vos outils à portée{' '}
            <span className="text-gradient-green">de clic</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Accédez directement à nos plateformes et services en ligne.
          </p>
        </RevealOnScroll>

        {/* Quick Access Grid */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" stagger={80}>
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-dark group-hover:text-primary-600 transition-colors text-[15px]">
                      {link.title}
                    </h3>
                    <ArrowUpRight size={15} className="text-gray-200 group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </a>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
