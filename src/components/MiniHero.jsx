import { useState, useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * MiniHero — bandeau d'introduction de page
 *
 * Props :
 * - kicker      : petit label majuscule en doré (ex: "À propos de FINACOM")
 * - title       : titre principal (sans le mot accentué)
 * - highlight   : mot accentué doré dans le titre
 * - description : sous-titre / lede
 * - breadcrumb  : libellé de la page courante dans le fil d'ariane
 * - imageUrl    : URL d'une photo de fond (full-bleed avec overlay vert)
 * - children    : contenu optionnel à droite (badges, illustration, etc.)
 */
export default function MiniHero({
  kicker,
  title,
  highlight,
  description,
  breadcrumb,
  imageUrl,
  children,
}) {
  const [zoomed, setZoomed] = useState(false);

  // Déclenche le Ken Burns au montage
  useEffect(() => {
    const t = setTimeout(() => setZoomed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative pt-36 lg:pt-44 pb-24 lg:pb-32 bg-primary-900 overflow-hidden min-h-[420px] lg:min-h-[520px]">
      {/* ── Photo de fond (si fournie) avec Ken Burns ── */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            style={{
              transform: zoomed ? 'scale(1.12)' : 'scale(1)',
              transition: 'transform 18000ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Voile sombre — uniquement pour la lisibilité du texte (pas de teinte verte) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* ── Décors radials/grille — seulement si pas d'image ── */}
      {!imageUrl && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 900px 600px at 10% 0%, rgba(27,122,61,0.5) 0%, transparent 60%), radial-gradient(ellipse 700px 500px at 95% 100%, rgba(212,160,23,0.14) 0%, transparent 55%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '90px 90px',
            }}
          />
        </>
      )}

      {/* Accent décoratif doré */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-accent-400 to-transparent opacity-60 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Fil d'Ariane ── */}
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Home size={13} />
            Accueil
          </Link>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-white/90 font-medium">{breadcrumb}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* ── Contenu principal ── */}
          <div className={children ? 'lg:col-span-8' : 'lg:col-span-12 max-w-3xl'}>
            {/* Kicker */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent-400" />
              <span className="text-accent-400 text-[11px] uppercase tracking-[0.25em] font-bold">
                {kicker}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[3.75rem] mb-5">
              {title}{' '}
              {highlight && (
                <span className="text-accent-400 relative inline-block">
                  {highlight}
                  <svg
                    className="absolute left-0 -bottom-1 lg:-bottom-1.5 w-full pointer-events-none"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{ height: '0.4em' }}
                  >
                    <path
                      d="M2 7 Q 50 2 100 5 T 198 4"
                      stroke="#f6b93b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </span>
              )}
              .
            </h1>

            {/* Description */}
            {description && (
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {/* ── Bloc droit optionnel ── */}
          {children && (
            <div className="lg:col-span-4 flex justify-end">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
