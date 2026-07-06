import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { useSupabaseTable } from '../hooks/useSupabaseTable';
import Loader from './Loader';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { data: testimonials, loading } = useSupabaseTable('testimonials', { orderBy: 'sort_order' });

  if (loading) {
    return (
      <section className="py-28 bg-white">
        <Loader fullScreen={false} label="" />
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));
  const current = testimonials[active];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[100px] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-5 uppercase tracking-[0.15em]">
            Témoignages
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark mb-5 leading-tight tracking-tight">
            Ce que disent{' '}
            <span className="text-gradient-green">nos clients</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Découvrez les témoignages de ceux qui ont fait confiance à FINACOM
            pour concrétiser leurs projets.
          </p>
        </RevealOnScroll>

        {/* Testimonial cards */}
        <RevealOnScroll delay={200}>
          <div className="max-w-4xl mx-auto">
            {/* Active testimonial */}
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 sm:p-12 mb-8">
              <Quote size={48} className="absolute top-8 right-8 text-primary-100" />

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl ${current.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {current.initials}
                </div>
                <div>
                  <div className="font-bold text-dark text-lg">{current.name}</div>
                  <div className="text-sm text-gray-400">{current.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent-400 fill-accent-400" />
                  ))}
                </div>
              </div>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed italic">
                "{current.content}"
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-primary-500' : 'w-2 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-all duration-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-xl bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white transition-all duration-300 shadow-lg shadow-primary-500/20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
