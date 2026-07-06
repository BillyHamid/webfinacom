import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Plus, Search, FileText, Eye, Pencil, Trash2,
  Globe, Clock,
} from 'lucide-react';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';

const slugify = (title) =>
  title.toLowerCase().trim()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const emptyForm = { title: '', slug: '', content: '' };

export default function PagesManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const { data: pages, loading, create, update, remove } = useSupabaseTable('pages', {
    orderBy: 'updated_at',
    ascending: false,
  });
  const [search, setSearch] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = pages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowEditor(true);
  };

  const openEdit = (page) => {
    setEditingId(page.id);
    setForm({ title: page.title || '', slug: page.slug || '', content: page.content || '' });
    setShowEditor(true);
  };

  const deletePage = async (id) => {
    if (!confirm('Supprimer cette page ?')) return;
    await remove(id);
  };

  const save = async (status) => {
    if (!form.title.trim()) {
      alert('Le titre est requis.');
      return;
    }
    setSaving(true);
    try {
      const values = {
        title: form.title,
        slug: form.slug.trim() || `/${slugify(form.title)}`,
        content: form.content,
        status,
        updated_at: new Date().toISOString(),
      };
      if (editingId) await update(editingId, values);
      else await create(values);
      setShowEditor(false);
    } catch (err) {
      alert(`Échec de l'enregistrement : ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (showEditor) {
    return (
      <>
        <TopBar title={editingId ? 'Éditeur de page' : 'Nouvelle page'} subtitle="Créer ou modifier une page" onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Editor toolbar */}
            <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100 flex-wrap">
              {['B', 'I', 'U', 'S'].map((btn) => (
                <button key={btn} className="w-8 h-8 rounded-lg hover:bg-gray-100 text-sm font-bold text-gray-500 transition-colors">
                  {btn}
                </button>
              ))}
              <div className="w-px h-5 bg-gray-200 mx-1" />
              {['H1', 'H2', 'H3'].map((btn) => (
                <button key={btn} className="px-2 h-8 rounded-lg hover:bg-gray-100 text-xs font-semibold text-gray-500 transition-colors">
                  {btn}
                </button>
              ))}
              <div className="w-px h-5 bg-gray-200 mx-1" />
              {['Liste', 'Lien', 'Image', 'Tableau'].map((btn) => (
                <button key={btn} className="px-2.5 h-8 rounded-lg hover:bg-gray-100 text-xs text-gray-500 transition-colors">
                  {btn}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={() => setShowEditor(false)} className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                  Annuler
                </button>
                <button disabled={saving} onClick={() => save('draft')} className="px-4 py-2 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-60">
                  Brouillon
                </button>
                <button disabled={saving} onClick={() => save('published')} className="px-4 py-2 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-60">
                  Publier
                </button>
              </div>
            </div>

            {/* Title input */}
            <div className="px-6 pt-6">
              <input
                type="text"
                placeholder="Titre de la page..."
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full text-3xl font-bold text-dark placeholder-gray-200 outline-none"
              />
              <input
                type="text"
                placeholder="/slug-de-la-page"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full mt-2 text-sm text-gray-400 placeholder-gray-300 outline-none"
              />
            </div>

            {/* Editor area */}
            <div className="px-6 py-4 min-h-[500px]">
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Commencez à écrire votre contenu ici..."
                className="w-full h-full min-h-[460px] text-base text-gray-600 placeholder-gray-300 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Gestion des Pages" subtitle={`${pages.length} pages au total`} onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="p-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-100 flex-1 sm:w-72 focus-within:border-primary-300 transition-colors">
              <Search size={15} className="text-gray-300" />
              <input
                type="text"
                placeholder="Rechercher une page..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-dark placeholder-gray-300 outline-none w-full"
              />
            </div>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/15"
          >
            <Plus size={16} />
            Nouvelle page
          </button>
        </div>

        {/* Pages table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Page</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Statut</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Dernière modif.</th>
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-400">Chargement...</td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-400">Aucune page</td></tr>
                )}
                {filtered.map((page) => (
                  <tr key={page.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                          <FileText size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-dark">{page.title}</p>
                          <p className="text-[11px] text-gray-400">{page.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                        page.status === 'published'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {page.status === 'published' ? <Globe size={10} /> : <Clock size={10} />}
                        {page.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400 hidden lg:table-cell">
                      {new Date(page.updated_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors" title="Voir">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => openEdit(page)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors" title="Modifier">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => deletePage(page.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Supprimer">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
