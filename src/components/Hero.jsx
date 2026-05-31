import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Users, TrendingUp, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const delay = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translate3d(0,0,0)' : 'translate3d(0,30px,0)',
    transition: `all 800ms cubic-bezier(0.22, 1, 0.36, 1) ${ms}ms`,
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-noise">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Animated mesh gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-accent-500/10 blur-[120px] animate-gradient" style={{ backgroundSize: '200% 200%' }} />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary-400/15 blur-[100px] animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-400/8 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Decorative circles */}
      <div className="absolute top-20 right-[15%] w-3 h-3 rounded-full bg-accent-400/30 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-white/20 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[30%] left-[5%] w-4 h-4 rounded-full bg-accent-400/20 animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content — 7 cols */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div style={delay(100)} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-sm font-medium mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-400" />
              </span>
              <span className="text-white/80">Institution de Microfinance agréée — Burkina Faso</span>
            </div>

            <h1 style={delay(250)} className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-white leading-[1.08] mb-7 tracking-tight">
              Votre avenir financier{' '}
              <br className="hidden sm:block" />
              commence{' '}
              <span className="relative inline-block">
                <span className="text-gradient-gold">ici</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 5C120 8 160 10 198 4" stroke="#d4a017" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
            </h1>

            <p style={delay(400)} className="text-base sm:text-lg text-white/55 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              FINACOM accompagne les communautés burkinabè vers l'autonomie financière
              à travers des solutions d'épargne, de crédit et d'accompagnement
              financier innovantes et accessibles à tous.
            </p>

            {/* CTAs */}
            <div style={delay(550)} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent-500 text-white font-bold text-[15px] transition-all duration-300 hover:bg-accent-600 shadow-[0_8px_30px_rgba(212,160,23,0.3)] hover:shadow-[0_12px_40px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 active:translate-y-0 animate-pulse-glow"
              >
                Ouvrir un compte
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold text-[15px] transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
              >
                Découvrir nos services
              </a>
            </div>

            {/* Trust indicators */}
            <div style={delay(700)} className="flex flex-wrap gap-x-8 gap-y-3 mt-12 justify-center lg:justify-start">
              {[
                { icon: Shield, text: 'Agréé par la BCEAO' },
                { icon: Users, text: '50 000+ clients actifs' },
                { icon: TrendingUp, text: '15 ans d\'expertise' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center">
                    <Icon size={14} className="text-accent-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right side — 5 cols: premium card stack */}
          <div className="hidden lg:block lg:col-span-5" style={delay(400)}>
            <div className="relative ml-8">
              {/* Background glow */}
              <div className="absolute -inset-8 bg-accent-500/10 rounded-[40px] blur-3xl" />

              {/* Main card */}
              <div className="relative rounded-3xl glass p-8 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <img src="/logo-finacom.png" alt="" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">FINACOM</h3>
                    <p className="text-white/40 text-xs">Votre partenaire financier de confiance</p>
                  </div>
                </div>

                {/* Mini chart visual */}
                <div className="mb-8 p-4 rounded-2xl bg-white/5">
                  <div className="flex items-end justify-between gap-1 h-20">
                    {[35, 45, 30, 55, 42, 60, 48, 70, 55, 75, 65, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-500"
                        style={{
                          height: `${h}%`,
                          background: i >= 10 ? 'linear-gradient(to top, #d4a017, #f6b93b)' : 'rgba(255,255,255,0.1)',
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-white/30">
                    <span>Jan</span><span>Juin</span><span>Déc</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {[
                    { label: 'Épargne collectée', value: '5.2 Mds', unit: 'FCFA', trend: '+18%', color: 'text-accent-400' },
                    { label: 'Crédits accordés', value: '8.7 Mds', unit: 'FCFA', trend: '+23%', color: 'text-accent-400' },
                    { label: 'Taux de remboursement', value: '97.3', unit: '%', trend: '+1.2%', color: 'text-primary-300' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-3 border-t border-white/8 group/stat">
                      <span className="text-white/40 text-sm">{stat.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-primary-300 font-medium opacity-0 group-hover/stat:opacity-100 transition-opacity">{stat.trend}</span>
                        <span className={`${stat.color} font-bold`}>{stat.value} <span className="text-xs font-normal opacity-60">{stat.unit}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="px-5 py-3.5 rounded-2xl bg-white shadow-2xl shadow-black/10">
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Croissance</div>
                  <div className="text-primary-600 font-extrabold text-xl">+23%</div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-6 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="px-5 py-3.5 rounded-2xl bg-white shadow-2xl shadow-black/10">
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Présence</div>
                  <div className="text-accent-600 font-extrabold text-xl">13 régions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#partners" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group">
          <span className="text-[11px] uppercase tracking-widest font-medium">Découvrir</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>

      {/* Bottom wave - improved */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 100L48 92C96 84 192 68 288 60C384 52 480 52 576 56C672 60 768 68 864 72C960 76 1056 76 1152 72C1248 68 1344 60 1392 56L1440 52V100H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
