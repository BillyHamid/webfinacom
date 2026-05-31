import { ArrowRight, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

export default function CTABanner() {
  return (
    <section className="py-28 relative overflow-hidden bg-noise">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900" />

      {/* Animated orbs */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-primary-400/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium mb-10">
            <Sparkles size={14} className="text-accent-400" />
            <span className="text-white/70">Rejoignez plus de 50 000 clients satisfaits</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-7 tracking-tight">
            Ensemble, construisons votre{' '}
            <span className="text-gradient-gold">avenir financier</span>
          </h2>

          <p className="text-base sm:text-lg text-white/45 leading-relaxed mb-12 max-w-2xl mx-auto">
            Que vous soyez un particulier, un entrepreneur ou une association,
            FINACOM a la solution qu'il vous faut. Ouvrez votre compte dès aujourd'hui
            et rejoignez notre communauté.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-xl bg-accent-500 text-white font-bold text-base transition-all duration-300 hover:bg-accent-600 shadow-[0_8px_30px_rgba(212,160,23,0.35)] hover:shadow-[0_12px_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Ouvrir un compte gratuit
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+22625000000"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-xl glass text-white font-semibold text-base transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
            >
              Appelez-nous maintenant
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
