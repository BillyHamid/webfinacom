import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import TopBar from './TopBar';
import { useOutletContext } from 'react-router-dom';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';
import { uploadFile } from '../../lib/uploadFile';

/**
 * Gestionnaire CRUD générique pour les contenus "marketing" homogènes
 * (témoignages, partenaires, chiffres-clés...). Le formulaire et la liste
 * sont générés à partir de `fields` — pas besoin de recréer une page par entité.
 *
 * field: { key, label, type: 'text'|'textarea'|'number'|'select'|'checkbox'|'image', options?, required? }
 */
export default function GenericCollectionManager({ table, title, subtitle, orderBy = 'sort_order', ascending = true, fields, columns }) {
  const { collapsed, setCollapsed } = useOutletContext();
  const { data: items, loading, create, update, remove } = useSupabaseTable(table, { orderBy, ascending });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [uploadingKey, setUploadingKey] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = () => Object.fromEntries(fields.map((f) => [f.key, f.default ?? (f.type === 'checkbox' ? false : '')]));

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, item[f.key] ?? f.default ?? ''])));
    setShowForm(true);
  };

  const deleteItem = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    await remove(id);
  };

  const handleImageChange = async (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(key);
    try {
      const url = await uploadFile(file, table);
      setForm((f) => ({ ...f, [key]: url }));
    } catch (err) {
      alert(`Échec de l'upload : ${err.message}`);
    } finally {
      setUploadingKey(null);
    }
  };

  const save = async () => {
    const missing = fields.find((f) => f.required && !String(form[f.key] || '').trim());
    if (missing) {
      alert(`Le champ "${missing.label}" est requis.`);
      return;
    }
    setSaving(true);
    try {
      const values = Object.fromEntries(
        fields.map((f) => [f.key, f.type === 'number' ? Number(form[f.key]) || 0 : form[f.key]])
      );
      if (editingId) await update(editingId, values);
      else await create(values);
      setShowForm(false);
    } catch (err) {
      alert(`Échec de l'enregistrement : ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const displayColumns = columns || fields.filter((f) => f.type !== 'textarea' && f.type !== 'image').slice(0, 3).map((f) => f.key);

  if (showForm) {
    return (
      <>
        <TopBar title={editingId ? `Modifier — ${title}` : `Nouveau — ${title}`} subtitle={subtitle} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{f.label}</label>
                {f.type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none"
                  />
                )}
                {f.type === 'select' && (
                  <select
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 bg-white"
                  >
                    {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                )}
                {f.type === 'checkbox' && (
                  <input
                    type="checkbox"
                    checked={!!form[f.key]}
                    onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-400"
                  />
                )}
                {f.type === 'image' && (
                  form[f.key] ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 w-fit">
                      <img src={form[f.key]} alt="" className="h-24 w-auto object-contain bg-gray-50 p-2" />
                      <button onClick={() => setForm((v) => ({ ...v, [f.key]: '' }))} className="absolute top-1 right-1 p-1 rounded-lg bg-black/50 text-white hover:bg-black/70">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-sm cursor-pointer hover:border-primary-300 transition-colors">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(f.key, e)} disabled={uploadingKey === f.key} />
                      <ImageIcon size={16} className="text-gray-300" />
                      {uploadingKey === f.key ? 'Envoi...' : 'Choisir une image'}
                    </label>
                  )
                )}
                {(f.type === 'text' || f.type === 'number' || !f.type) && (
                  <input
                    type={f.type === 'number' ? 'number' : 'text'}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors"
                  />
                )}
              </div>
            ))}
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
      <TopBar title={title} subtitle={subtitle || `${items.length} éléments`} onToggleSidebar={() => setCollapsed(!collapsed)} />
      <div className="p-6">
        <div className="flex justify-end mb-6">
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/15">
            <Plus size={16} />
            Ajouter
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {displayColumns.map((col) => {
                    const f = fields.find((x) => x.key === col);
                    return (
                      <th key={col} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">
                        {f?.label || col}
                      </th>
                    );
                  })}
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={displayColumns.length + 1} className="px-5 py-8 text-center text-sm text-gray-400">Chargement...</td></tr>
                )}
                {!loading && items.length === 0 && (
                  <tr><td colSpan={displayColumns.length + 1} className="px-5 py-8 text-center text-sm text-gray-400">Aucun élément</td></tr>
                )}
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    {displayColumns.map((col) => (
                      <td key={col} className="px-5 py-4 text-sm text-dark truncate max-w-xs">{String(item[col] ?? '')}</td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
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
