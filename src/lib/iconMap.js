import {
  Users, MapPin, Banknote, Building2, TrendingUp, Award, Globe, Star, Heart, ShieldCheck,
} from 'lucide-react';

export const ICON_MAP = {
  Users, MapPin, Banknote, Building2, TrendingUp, Award, Globe, Star, Heart, ShieldCheck,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP).map((name) => ({ value: name, label: name }));
export const DEFAULT_ICON = Star;

export const COLOR_HUES = ['primary', 'accent', 'blue', 'emerald'];
export const COLOR_OPTIONS = COLOR_HUES.map((hue) => ({ value: hue, label: hue }));

// Classes Tailwind écrites en toutes lettres : le scanner JIT de Tailwind ne
// génère que les classes qui apparaissent littéralement dans le code source,
// pas celles construites dynamiquement (ex: `bg-${hue}-50` ne fonctionne pas).
export const COLOR_CLASSES = {
  primary: { bg50: 'bg-primary-50', bg500: 'bg-primary-500', text500: 'text-primary-500', text600: 'text-primary-600' },
  accent: { bg50: 'bg-accent-50', bg500: 'bg-accent-500', text500: 'text-accent-500', text600: 'text-accent-600' },
  blue: { bg50: 'bg-blue-50', bg500: 'bg-blue-500', text500: 'text-blue-500', text600: 'text-blue-600' },
  emerald: { bg50: 'bg-emerald-50', bg500: 'bg-emerald-500', text500: 'text-emerald-500', text600: 'text-emerald-600' },
};

export function getColorClasses(hue) {
  return COLOR_CLASSES[hue] || COLOR_CLASSES.primary;
}
