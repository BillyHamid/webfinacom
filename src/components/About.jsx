import { CheckCircle2, Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { RevealOnScroll, StaggerChildren } from '../hooks/useScrollReveal';

const values = [
  { icon: Target, title: 'Proximité', desc: 'Nous sommes au plus près de nos communautés dans chaque région du Burkina Faso.' },
  { icon: Eye, title: 'Transparence', desc: 'Une gestion rigoureuse et transparente au service de nos sociétaires.' },
  { icon: Heart, title: 'Solidarité', desc: 'L\'entraide et le développement communautaire au cœur de notre mission.' },
];

const milestones = [
  'Institution agréée par la BCEAO',
  'Réseau de 45+ points de service',
  'Taux de remboursement de 97.3%',
  'Plus de 8 milliards FCFA financés',
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Visual */}
          <RevealOnScroll direction="left">
            <div className="relative">
              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
                      alt="Équipe FINACOM"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                    <img
                      src="https://images.unsplash.com/photo-1556740758-90de940a6ed6?w=400&h=400&fit=crop"
                      alt="Service client"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
                      alt="Accompagnement"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                    <img
                      src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&h=300&fit=crop"
                      alt="Communauté"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-6">
                <div className="px-8 py-5 rounded-2xl bg-primary-700 text-white shadow-2xl shadow-primary-900/30">
                  <div className="text-3xl font-extrabold text-accent-400">15+</div>
                  <div className="text-sm text-white/60">Années d'expérience</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — Content */}
          <div>
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
                À propos de nous
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-6 leading-tight tracking-tight">
                Construire un avenir{' '}
                <span className="text-gradient-green">financier inclusif</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Depuis sa création, FINACOM s'est engagée dans la promotion de l'inclusion
                financière au Burkina Faso. Notre réseau couvre l'ensemble des 13 régions
                du pays, offrant des services financiers de proximité aux populations
                rurales et urbaines.
              </p>
            </RevealOnScroll>

            {/* Milestones */}
            <RevealOnScroll delay={200}>
              <div className="space-y-3 mb-10">
                {milestones.map((item) => (
                  <div key={item} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <CheckCircle2 size={14} className="text-primary-500" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Values */}
            <StaggerChildren className="grid grid-cols-3 gap-4 mb-10" stagger={100}>
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-4 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div className="text-sm font-bold text-dark mb-1">{title}</div>
                  <div className="text-[11px] text-gray-400 leading-relaxed">{desc}</div>
                </div>
              ))}
            </StaggerChildren>

            <RevealOnScroll delay={400}>
              <a href="#metrics" className="group inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors">
                Voir nos chiffres clés
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
