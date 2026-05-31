import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Plus, Search, Eye, Pencil, Trash2, Globe, Clock, Image,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function NewsManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const { articles, setArticles } = useData();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deleteArticle = (id) => setArticles(articles.filter((a) => a.id !== id));

  if (showForm) {
    return (
      <>
        <TopBar title="Nouvel article" subtitle="Créer un article d'actualité" onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Titre</label>
              <input type="text" placeholder="Titre de l'article..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Catégorie</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 bg-white">
                  <option>Inclusion Financière</option>
                  <option>Innovation</option>
                  <option>Développement</option>
                  <option>Formation</option>
                  <option>Institution</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Statut</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 bg-white">
                  <option>Brouillon</option>
                  <option>Publié</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Image de couverture</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
                <Image size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">Glissez une image ou <span className="text-primary-600 font-medium">parcourir</span></p>
                <p className="text-[11px] text-gray-300 mt-1">PNG, JPG jusqu'à 5 MB</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Contenu</label>
              <textarea rows={10} placeholder="Écrivez votre article ici..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none leading-relaxed" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
              <button className="px-5 py-2.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium">Enregistrer brouillon</button>
              <button className="px-5 py-2.5 text-sm bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold shadow-lg shadow-primary-600/15">Publier</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Gestion des Actualités" subtitle={`${articles.length} articles`} onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="p-6">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-100 flex-1 sm:w-72 focus-within:border-primary-300 transition-colors">
              <Search size={15} className="text-gray-300" />
              <input type="text" placeholder="Rechercher un article..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-dark placeholder-gray-300 outline-none w-full" />
            </div>
            <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden">
              {[{ label: 'Tous', value: 'all' }, { label: 'Publiés', value: 'published' }, { label: 'Brouillons', value: 'draft' }].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilterStatus(f.value)}
                  className={`px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    filterStatus === f.value ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/15">
            <Plus size={16} />
            Nouvel article
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Article</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Catégorie</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Statut</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Date</th>
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((article) => (
                  <tr key={article.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${article.image ? 'bg-primary-50' : 'bg-gray-50'}`}>
                          <Image size={16} className={article.image ? 'text-primary-400' : 'text-gray-300'} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-dark truncate max-w-xs">{article.title}</p>
                          <p className="text-[11px] text-gray-400">{article.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-[11px] font-medium text-gray-600">{article.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                        article.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {article.status === 'published' ? <Globe size={10} /> : <Clock size={10} />}
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400 hidden md:table-cell">{article.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"><Eye size={15} /></button>
                        <button onClick={() => setShowForm(true)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteArticle(article.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
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
