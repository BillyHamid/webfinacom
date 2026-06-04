import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Nos produits et services', to: '/produits-et-services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Médiathèque', to: '/mediatheque' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Sur la page d'accueil, on garde le mode "transparent" en haut (hero sombre derrière).
  // Sur les pages internes, le MiniHero est aussi sombre — donc même comportement.
  const isDarkHeroBehind = true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset mobile menu sur changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.08)] border-b border-white/50'
            : isDarkHeroBehind
              ? 'bg-transparent'
              : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group relative z-10"
            >
              <div className="relative">
                <img
                  src="/logo-finacom.png"
                  alt="FINACOM"
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                    scrolled ? 'text-primary-700' : 'text-white'
                  }`}
                >
                  FINACOM
                </span>
                <span
                  className={`block text-[9px] uppercase tracking-[0.25em] -mt-0.5 font-medium transition-colors duration-300 ${
                    scrolled ? 'text-accent-600' : 'text-accent-300'
                  }`}
                >
                  Finance Communautaire
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 xl:px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                      scrolled
                        ? isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        : isActive
                          ? 'text-white bg-white/15'
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                to="/contact"
                className={`px-3 xl:px-4 py-2 text-[13px] font-semibold rounded-lg border whitespace-nowrap transition-all duration-300 ${
                  scrolled
                    ? 'border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50'
                    : 'border-white/25 text-white hover:bg-white/10 hover:border-white/40'
                }`}
              >
                Espace Client
              </Link>
              <Link
                to="/contact"
                className="px-4 xl:px-5 py-2.5 text-[13px] font-semibold rounded-lg bg-accent-500 text-white hover:bg-accent-600 whitespace-nowrap transition-all duration-300 shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 hover:-translate-y-px active:translate-y-0"
              >
                Ouvrir un compte
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`lg:hidden relative z-10 p-2.5 rounded-xl transition-all duration-300 ${
                isOpen
                  ? 'bg-gray-100 text-dark'
                  : scrolled
                    ? 'text-dark hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — full overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl transition-transform duration-500 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-primary-300"
                >
                  Espace Client
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3.5 rounded-xl bg-accent-500 text-white font-semibold shadow-lg shadow-accent-500/20"
                >
                  Ouvrir un compte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
