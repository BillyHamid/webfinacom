import { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * ErrorBoundary — filet de sécurité global.
 *
 * Sans ça, la moindre erreur JavaScript dans le rendu (ex: un conflit avec
 * une extension de navigateur comme Grammarly ou un traducteur automatique,
 * qui modifie le DOM en même temps que React) fait planter TOUTE
 * l'application en écran blanc, sans aucun moyen de s'en sortir sans
 * rafraîchir manuellement la page.
 *
 * Avec ce composant, seule la zone concernée affiche un message de secours
 * avec un bouton "Réessayer" qui réinitialise l'affichage sans recharger
 * toute la page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erreur interceptée par ErrorBoundary :', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
            <AlertTriangle size={26} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-dark mb-1">Un problème d'affichage est survenu</p>
            <p className="text-xs text-gray-400 max-w-sm">
              Cela peut venir d'une extension de navigateur (traducteur, bloqueur de pub...).
              Essaie de réessayer, ou recharge la page si le problème persiste.
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
          >
            <RotateCcw size={15} />
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
