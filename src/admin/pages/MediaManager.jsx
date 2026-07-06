import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Plus, Trash2, Pencil, Image as ImageIcon, Video, FileText, Star, X,
} from 'lucide-react';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';
import { uploadFile } from '../../lib/uploadFile';

const TYPES = [
  { value: 'video', label: 'Vidéos', icon: Video },
  { value: 'photo', label: 'Photos', icon: ImageIcon },
  { value: 'document', label: 'Documents', icon: FileText },
];

const emptyForm = {
  media_type: 'video', title: '', description: '', thumbnail_url: '', file_url: '',
  is_featured: false, published_at: new Date().toISOString().slice(0, 10),
  duration: '', count: '', doc_size: '', doc_pages: '',
};

export default function MediaManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const { data: items, loading, create, update, remove } = useSupabaseTable('media_items', {
    orderBy: 'created_at',
    ascending: false,
  });
  const [activeType, setActiveType] = useState('video');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);

  const filtered = items.filter((i) => i.media_type === activeType);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, media_type: activeType });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      media_type: item.media_type,
      title: item.title || '',
      description: item.description || '',
      thumbnail_url: item.thumbnail_url || '',
      file_url: item.file_url || '',
      is_featured: item.is_featured || false,
      published_at: item.published_at || new Date().toISOString().slice(0, 10),
      duration: item.meta?.duration || '',
      count: item.meta?.count || '',
      doc_size: item.meta?.size || '',
      doc_pages: item.meta?.pages || '',
    });
    setShowForm(true);
  };

  const deleteItem = async (id) => {
    if (!confirm('Supprimer ce média ?')) return;
    await remove(id);
  };

  const handleThumbChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    try {
      const url = await uploadFile(file, 'media/thumbnails');
      setForm((f) => ({ ...f, thumbnail_url: url }));
    } catch (err) {
      alert(`Échec de l'upload : ${err.message}`);
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const url = await uploadFile(file, 'media/files');
      const sizeKo = file.size / 1024;
      const size = sizeKo > 1024 ? `${(sizeKo / 1024).toFixed(1)} Mo` : `${Math.round(sizeKo)} Ko`;
      setForm((f) => ({ ...f, file_url: url, doc_size: f.doc_size || size }));
    } catch (err) {
      alert(`Échec de l'upload : ${err.message}`);
    } finally {
      setUploadingFile(false);
    }
  };

  const save = async () => {
    if (!form.title.trim()) {
      alert('Le titre est requis.');
      return;
    }
    setSaving(true);
    try {
      let meta = {};
      if (form.media_type === 'video') meta = { duration: form.duration };
      if (form.media_type === 'photo') meta = { count: form.count };
      if (form.media_type === 'document') meta = { type: 'PDF', size: form.doc_size, pages: form.doc_pages };

      const values = {
        media_type: form.media_type,
        title: form.title,
        description: form.description,
        thumbnail_url: form.thumbnail_url,
        file_url: form.file_url,
        is_featured: form.is_featured,
        published_at: form.published_at,
        meta,
      };
      if (editingId) await update(editingId, values);
      else await create(values);
      setShowForm(false);
    } catch (err) {
      alert(`Échec de l'enregistrement : ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (showForm) {
    return (
      <>
        <TopBar title={editingId ? 'Modifier le média' : 'Nouveau média'} subtitle="Médiathèque" onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</label>
              <div className="flex bg-gray-50 border border-gray-100 rounded-xl overflow-hidden w-fit">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setForm((f) => ({ ...f, media_type: t.value }))}
                    className={`px-4 py-2 text-xs font-medium transition-colors ${form.media_type === t.value ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Image / miniature</label>
              {form.thumbnail_url ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 w-fit">
                  <img src={form.thumbnail_url} alt="" className="h-32 w-auto object-cover" />
                  <button onClick={() => setForm((f) => ({ ...f, thumbnail_url: '' }))} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors cursor-pointer w-fit px-12">
                  <input type="file" accept="image/*" className="hidden" onChange={handleThumbChange} disabled={uploadingThumb} />
                  <ImageIcon size={24} className="mx-auto text-gray-300 mb-1" />
                  <p className="text-xs text-gray-400">{uploadingThumb ? 'Envoi...' : 'Choisir une image'}</p>
                </label>
              )}
            </div>

            {form.media_type === 'document' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fichier (PDF)</label>
                {form.file_url ? (
                  <div className="flex items-center gap-2 text-sm text-primary-600">
                    <FileText size={16} /> Fichier chargé ({form.doc_size})
                    <button onClick={() => setForm((f) => ({ ...f, file_url: '' }))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm cursor-pointer hover:border-primary-300 transition-colors">
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} disabled={uploadingFile} />
                    {uploadingFile ? 'Envoi...' : 'Choisir un fichier PDF'}
                  </label>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              {form.media_type === 'video' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Durée</label>
                  <input type="text" placeholder="2:14" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                </div>
              )}
              {form.media_type === 'photo' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nombre de photos</label>
                  <input type="number" placeholder="28" value={form.count} onChange={(e) => setForm((f) => ({ ...f, count: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                </div>
              )}
              {form.media_type === 'document' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nombre de pages</label>
                  <input type="text" placeholder="64 pages" value={form.doc_pages} onChange={(e) => setForm((f) => ({ ...f, doc_pages: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date de publication</label>
                <input type="date" value={form.published_at} onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer w-fit">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="rounded border-gray-300 text-primary-600 focus:ring-primary-400" />
              Mettre à la une
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
              <button disabled={saving} onClick={save} className="px-5 py-2.5 text-sm bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold shadow-lg shadow-primary-600/15 disabled:opacity-60">
                {editingId ? 'Enregistrer' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Médiathèque" subtitle={`${items.length} médias`} onToggleSidebar={() => setCollapsed(!collapsed)} />
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium transition-colors ${activeType === t.value ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/15">
            <Plus size={16} />
            Ajouter
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading && <div className="text-sm text-gray-400 px-1">Chargement...</div>}
          {!loading && filtered.length === 0 && <div className="text-sm text-gray-400 px-1">Aucun média dans cette catégorie</div>}
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
              <div className="relative aspect-video bg-gray-50">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FileText size={28} />
                  </div>
                )}
                {item.is_featured && (
                  <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider">
                    <Star size={9} /> Une
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-500 hover:text-primary-600"><Pencil size={13} /></button>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-500 hover:text-red-500"><Trash2 size={13} /></button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-dark truncate">{item.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {new Date(item.published_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
