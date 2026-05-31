import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1556740758-90de940a6ed6?w=800&h=500&fit=crop',
    category: 'Inclusion Financière',
    date: '12 Avril 2026',
    title: 'FINACOM lance un nouveau programme d\'éducation financière pour les femmes',
    excerpt: 'Un programme ambitieux destiné aux femmes entrepreneures des zones rurales pour renforcer leurs compétences en gestion financière et développer l\'autonomie économique.',
    readTime: '5 min',
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
    category: 'Innovation',
    date: '5 Avril 2026',
    title: 'Partenariat stratégique pour le Mobile Banking',
    excerpt: 'FINACOM signe un accord avec les opérateurs télécom pour étendre ses services de mobile money.',
    readTime: '3 min',
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&h=400&fit=crop',
    category: 'Développement',
    date: '28 Mars 2026',
    title: 'Ouverture de 5 nouvelles agences en zone rurale',
    excerpt: 'FINACOM poursuit son expansion avec l\'ouverture de nouvelles agences pour rapprocher les services financiers.',
    readTime: '4 min',
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    category: 'Formation',
    date: '15 Mars 2026',
    title: 'Session de formation sur la gestion des risques',
    excerpt: 'Une formation dédiée aux agents de crédit pour améliorer l\'évaluation et la gestion des risques.',
    readTime: '3 min',
    featured: false,
  },
];

export default function News() {
  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured);

  return (
    <section id="news" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
                Actualités
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark leading-tight tracking-tight">
                Dernières{' '}
                <span className="text-gradient-green">nouvelles</span>
              </h2>
            </div>
            <a href="#" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-semibold hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300">
              Toutes les actualités
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </RevealOnScroll>

        {/* Featured + Grid layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured article */}
          <RevealOnScroll direction="left">
            <article className="group relative rounded-3xl overflow-hidden h-full min-h-[420px] cursor-pointer">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/60 text-xs">
                    <Calendar size={12} /> {featured.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-lg">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent-400 text-sm font-semibold group-hover:text-accent-300 transition-colors">
                  Lire l'article
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </RevealOnScroll>

          {/* Other articles stacked */}
          <div className="flex flex-col gap-4">
            {others.map((article, index) => (
              <RevealOnScroll key={index} delay={index * 100} direction="right">
                <article className="group flex gap-5 p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-gray-50 font-medium text-gray-500">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {article.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-dark group-hover:text-primary-600 transition-colors leading-snug mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="text-xs text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
                      Lire <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
