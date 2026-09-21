import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Save, Sparkles, Info, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { uploadFile } from '../../lib/uploadFile';
import { PAGE_CONTENT_SCHEMA } from '../../lib/pageContentSchema';

export default function PageContentManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const [activePage, setActivePage] = useState(PAGE_CONTENT_SCHEMA[0].page);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);

  const activeSchema = PAGE_CONTENT_SCHEMA.find((p) => p.page === activePage);

  useEffect(() => {
    setLoading(true);
    setLoadError(null);
    supabase
      .from('page_content')
      .select('field_key, value')
      .eq('page', activePage)
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
  }, [activePage]);

  const setField = (key, value) => setValues((v) => ({ ...v, [key]: value }));

  const handleImageChange = async (key, file) => {
    if (!file) return;
    setUploadingKey(key);
    try {
      const url = await uploadFile(file, `pages/${activePage}`);
      setField(key, url);
    } catch (err) {
      alert(`Échec de l'envoi de l'image : ${err.message}`);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = activeSchema.sections.flatMap((section) =>
        section.fields.map((f) => ({ page: activePage, field_key: f.key, value: values[f.key] || '' }))
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
        title="Contenu des pages"
        subtitle="Titres et textes principaux du site public"
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <div className="p-6 max-w-3xl">
        {/* Onglets par page */}
        <div className="flex items-center gap-1 mb-6 bg-white rounded-2xl border border-gray-100 p-1.5 flex-wrap">
          {PAGE_CONTENT_SCHEMA.map((p) => (
            <button
              key={p.page}
              onClick={() => setActivePage(p.page)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activePage === p.page
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {loadError && (
          <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-sm">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              Impossible de charger le contenu ({loadError}). Vérifie que les migrations Supabase
              (<code className="text-xs bg-amber-100 px-1 py-0.5 rounded">004_page_content.sql</code>,{' '}
              <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">007_page_content_all_pages.sql</code>)
              ont bien été exécutées, et que ton compte figure dans la table <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">admins</code>.
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-sm text-gray-400 py-8 text-center">Chargement...</div>
        ) : (
          <div className="space-y-6">
            {activeSchema.sections.map((section) => (
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
                      {f.type === 'textarea' && (
                        <textarea
                          rows={3}
                          value={values[f.key] || ''}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none transition-colors"
                        />
                      )}
                      {f.type === 'input' && (
                        <input
                          type="text"
                          value={values[f.key] || ''}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors"
                        />
                      )}
                      {f.type === 'image' && (
                        <div className="flex items-center gap-4">
                          <div className="w-28 h-20 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {values[f.key] ? (
                              <img src={values[f.key]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={20} className="text-gray-300" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingKey === f.key}
                                onChange={(e) => handleImageChange(f.key, e.target.files?.[0])}
                              />
                              {uploadingKey === f.key ? (
                                <span className="flex items-center gap-1.5"><Loader2 size={14} className="animate-spin" /> Envoi...</span>
                              ) : values[f.key] ? 'Changer la photo' : 'Choisir une photo'}
                            </label>
                            {values[f.key] && (
                              <button
                                type="button"
                                onClick={() => setField(f.key, '')}
                                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                title="Retirer"
                              >
                                <X size={15} />
                              </button>
                            )}
                          </div>
                        </div>
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
