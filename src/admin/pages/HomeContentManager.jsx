import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Save, Sparkles, Info } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const PAGE = 'home';

// Sections affichées dans l'ordre de la page d'accueil, avec les champs
// éditables de chacune (titres, sous-titres, paragraphes clés uniquement —
// les éléments visuels comme les icônes, cartes produits ou animations
// restent gérés dans le code).
const SECTIONS = [
  {
    title: 'Hero (bandeau principal)',
    note: "Le grand titre animé (\"Faire grandir vos projets, ensemble.\") n'est pas éditable ici — seuls le petit label, le texte d'accompagnement et la citation le sont.",
    fields: [
      { key: 'hero_kicker', label: 'Petit label au-dessus du titre', type: 'input' },
      { key: 'hero_body', label: 'Paragraphe sous le titre', type: 'textarea' },
      { key: 'hero_quote', label: 'Citation (encart latéral)', type: 'textarea' },
    ],
  },
  {
    title: 'Section "À propos"',
    fields: [
      { key: 'about_heading', label: 'Titre', type: 'input' },
      { key: 'about_body', label: 'Paragraphe', type: 'textarea' },
      { key: 'about_quote', label: 'Citation (carte flottante sur la photo)', type: 'textarea' },
    ],
  },
  {
    title: 'Section "Produits et services"',
    fields: [
      { key: 'services_heading', label: 'Titre', type: 'input' },
    ],
  },
  {
    title: 'Section "Banque digitale"',
    fields: [
      { key: 'digital_kicker', label: 'Badge ("100% Digital")', type: 'input' },
      { key: 'digital_heading', label: 'Titre', type: 'input' },
      { key: 'digital_body', label: 'Paragraphe', type: 'textarea' },
    ],
  },
  {
    title: 'Section "Témoignages"',
    fields: [
      { key: 'testimonials_heading', label: 'Titre', type: 'input' },
      { key: 'testimonials_body', label: 'Sous-titre', type: 'textarea' },
    ],
  },
  {
    title: 'Section "Appel à l\'action" (bas de page)',
    fields: [
      { key: 'cta_badge', label: 'Badge', type: 'input' },
      { key: 'cta_heading', label: 'Titre', type: 'input' },
      { key: 'cta_body', label: 'Paragraphe', type: 'textarea' },
    ],
  },
];

export default function HomeContentManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    supabase
      .from('page_content')
      .select('field_key, value')
      .eq('page', PAGE)
      .then(({ data, error }) => {
        if (error) {
          setLoadError(error.message);
        } else {
          const map = {};
          (data || []).forEach((row) => {
            map[row.field_key] = row.value;
          });
          setValues(map);
        }
        setLoading(false);
      });
  }, []);

  const setField = (key, value) => setValues((v) => ({ ...v, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = SECTIONS.flatMap((section) =>
        section.fields.map((f) => ({ page: PAGE, field_key: f.key, value: values[f.key] || '' }))
      );
      const { error } = await supabase.from('page_content').upsert(rows, { onConflict: 'page,field_key' });
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert(`Échec de l'enregistrement : ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TopBar
        title="Contenu — Accueil"
        subtitle="Titres et textes principaux de la page d'accueil"
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <div className="p-6 max-w-3xl">
        {loadError && (
          <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-sm">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              Impossible de charger le contenu ({loadError}). Vérifie que la migration{' '}
              <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">supabase/004_page_content.sql</code> a bien été exécutée.
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-sm text-gray-400 py-8 text-center">Chargement...</div>
        ) : (
          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={15} className="text-primary-500" />
                  <h3 className="text-sm font-bold text-dark">{section.title}</h3>
                </div>
                {section.note && <p className="text-xs text-gray-400 mb-4">{section.note}</p>}
                <div className={`space-y-4 ${section.note ? '' : 'mt-4'}`}>
                  {section.fields.map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        {f.label}
                      </label>
                      {f.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={values[f.key] || ''}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none transition-colors"
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[f.key] || ''}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg disabled:opacity-60 ${
                  saved
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/15'
                }`}
              >
                {saved ? (
                  <><Save size={16} /> Enregistré !</>
                ) : (
                  <><Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
