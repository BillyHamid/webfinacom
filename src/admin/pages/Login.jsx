import { useState } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    const from = location.state?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError('Email ou mot de passe incorrect.');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* ═══════════ PANNEAU VISUEL (masqué sur mobile) ═══════════ */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary-900">
        <div className="absolute inset-0">
          <img
            src="/about-hero-team.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/85 to-primary-900/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-primary-900/40" />
        </div>

        {/* Décor */}
        <div className="absolute -top-20 -right-20 w-[350px] h-[350px] bg-accent-500/15 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-primary-400/20 rounded-full blur-[90px]" />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <img
              src="/logo-finacom-removebg-preview.png"
              alt="FINACOM"
              className="h-11 w-auto"
            />
            <div>
              <div className="text-white font-bold tracking-tight">FINACOM</div>
              <div className="text-[10px] text-accent-400 uppercase tracking-[0.2em] -mt-0.5">
                Finance communautaire
              </div>
            </div>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] font-semibold text-accent-400 uppercase tracking-[0.15em] mb-6">
              <ShieldCheck size={13} />
              Espace administrateur
            </div>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Pilotez le site FINACOM en toute simplicité.
            </h2>
            <p className="text-white/70 text-sm xl:text-base leading-relaxed max-w-sm">
              Contenus, actualités, médiathèque, paramètres — tout le back-office
              du réseau, réservé à l'équipe FINACOM.
            </p>
          </div>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors w-fit"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            Retour au site public
          </Link>
        </div>
      </div>

      {/* ═══════════ FORMULAIRE ═══════════ */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm">
          {/* Logo (mobile uniquement) */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <img
              src="/logo-finacom-removebg-preview.png"
              alt="FINACOM"
              className="h-14 w-auto mb-3"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-dark tracking-tight mb-1.5">
              Connexion
            </h1>
            <p className="text-sm text-gray-400">
              Accédez au tableau de bord FINACOM.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div
              className={`grid transition-all duration-300 ease-out ${
                error ? 'grid-rows-[1fr] opacity-100 mb-1' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-primary-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(27,122,61,0.08)] transition-all duration-200">
                <Mail size={17} className="text-gray-300 flex-shrink-0" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@finacom.bf"
                  className="w-full text-sm outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-primary-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(27,122,61,0.08)] transition-all duration-200">
                <Lock size={17} className="text-gray-300 flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm outline-none bg-transparent placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group w-full flex items-center justify-center gap-2 py-3.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-300">
            Accès réservé à l'équipe FINACOM. Un problème de connexion ?{' '}
            <a href="mailto:contact@finacom.bf" className="text-gray-400 hover:text-primary-600 font-medium transition-colors">
              Contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
