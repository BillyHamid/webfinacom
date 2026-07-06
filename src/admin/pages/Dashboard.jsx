import TopBar from '../components/TopBar';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';
import {
  FileText, CalendarDays, Newspaper, Clock,
  Activity, ArrowUpRight, Globe, PenLine, MapPin, Tag,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const CATEGORY_COLORS = [
  '#1b7a3d', '#d4a017', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b',
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white px-3 py-2.5 rounded-xl shadow-lg border border-gray-100 text-xs">
      <p className="font-semibold text-dark mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 mt-0.5" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.fill }} />
          {p.name}: <span className="font-semibold ml-1">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { collapsed, setCollapsed } = useOutletContext();
  const navigate = useNavigate();
  const { data: articles } = useSupabaseTable('articles', { orderBy: 'created_at', ascending: false });
  const { data: events } = useSupabaseTable('events', { orderBy: 'event_date', ascending: true });
  const { data: pages } = useSupabaseTable('pages', { orderBy: 'updated_at', ascending: false });

  // --- Indicateurs calculés depuis les vraies données ---
  const publishedArticles = articles.filter((a) => a.status === 'published').length;
  const draftArticles = articles.filter((a) => a.status === 'draft').length;

  const today = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= today).length;
  const publishedPages = pages.filter((p) => p.status === 'published').length;
  const totalDrafts = draftArticles + pages.filter((p) => p.status === 'draft').length;

  const stats = [
    {
      label: 'Articles publiés',
      value: publishedArticles,
      suffix: `/ ${articles.length}`,
      change: draftArticles > 0 ? `${draftArticles} brouillon${draftArticles > 1 ? 's' : ''}` : 'Tous publiés',
      up: draftArticles === 0,
      icon: Newspaper,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      path: '/admin/news',
    },
    {
      label: 'Événements à venir',
      value: upcomingEvents,
      suffix: `/ ${events.length} total`,
      change: upcomingEvents > 0 ? `${upcomingEvents} planifié${upcomingEvents > 1 ? 's' : ''}` : 'Aucun à venir',
      up: upcomingEvents > 0,
      icon: CalendarDays,
      color: 'text-accent-600',
      bg: 'bg-accent-50',
      path: '/admin/events',
    },
    {
      label: 'Pages publiées',
      value: publishedPages,
      suffix: `/ ${pages.length}`,
      change: `${pages.length - publishedPages} brouillon${pages.length - publishedPages > 1 ? 's' : ''}`,
      up: publishedPages === pages.length,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      path: '/admin/pages',
    },
    {
      label: 'Brouillons en attente',
      value: totalDrafts,
      suffix: 'contenus',
      change: totalDrafts > 0 ? 'À réviser' : 'Tout est publié',
      up: totalDrafts === 0,
      icon: PenLine,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      path: '/admin/news',
    },
  ];

  // --- Données graphiques issues du contexte ---
  // Publications par mois (articles + événements)
  const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const monthlyMap = {};
  articles.forEach((a) => {
    const d = new Date(a.published_at || a.created_at);
    const key = MONTHS[d.getMonth()];
    if (!monthlyMap[key]) monthlyMap[key] = { articles: 0, events: 0 };
    monthlyMap[key].articles += 1;
  });
  events.forEach((e) => {
    const d = new Date(`${e.event_date}T00:00:00`);
    const key = MONTHS[d.getMonth()];
    if (!monthlyMap[key]) monthlyMap[key] = { articles: 0, events: 0 };
    monthlyMap[key].events += 1;
  });
  const monthOrder = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const publicationData = monthOrder
    .filter((m) => monthlyMap[m])
    .map((m) => ({ name: m, articles: monthlyMap[m]?.articles || 0, evenements: monthlyMap[m]?.events || 0 }));

  // Événements par type
  const typeMap = {};
  events.forEach((e) => {
    typeMap[e.type] = (typeMap[e.type] || 0) + 1;
  });
  const eventTypeData = Object.entries(typeMap).map(([name, total]) => ({ name, total }));

  // Prochains événements triés par date
  const upcomingEventsList = events
    .filter((e) => new Date(e.event_date) >= today)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  // Activité récente depuis les vraies données
  const recentActivity = [
    ...articles.slice(0, 3).map((a) => ({
      action: a.status === 'published' ? 'Article publié' : 'Brouillon créé',
      detail: `"${a.title}"`,
      time: new Date(a.published_at || a.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      color: a.status === 'published' ? 'bg-primary-500' : 'bg-gray-400',
      path: '/admin/news',
    })),
    ...events.slice(0, 2).map((e) => ({
      action: 'Événement ajouté',
      detail: `"${e.title}"`,
      time: new Date(`${e.event_date}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      color: e.color,
      path: '/admin/events',
    })),
  ];

  return (
    <>
      <TopBar
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre plateforme"
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                onClick={() => navigate(stat.path)}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-200 transition-all duration-300 group text-left w-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-3xl font-extrabold text-dark tracking-tight leading-none">{stat.value}</span>
                  <span className="text-sm text-gray-400 mb-0.5">{stat.suffix}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <ArrowUpRight size={13} className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Charts row — données réelles */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Publications par mois — AreaChart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-dark">Publications par mois</h3>
                <p className="text-xs text-gray-400">Articles et événements créés</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" />Articles
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-500 inline-block" />Événements
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={publicationData}>
                <defs>
                  <linearGradient id="gradArticles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b7a3d" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1b7a3d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a017" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="articles" name="Articles" stroke="#1b7a3d" strokeWidth={2.5} fill="url(#gradArticles)" dot={{ r: 4, fill: '#1b7a3d', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="evenements" name="Événements" stroke="#d4a017" strokeWidth={2.5} fill="url(#gradEvents)" dot={{ r: 4, fill: '#d4a017', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Événements par type */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-dark">Événements par type</h3>
              <p className="text-xs text-gray-400">{events.length} événements au total</p>
            </div>
            <div className="space-y-3">
              {eventTypeData.map((item, i) => {
                const pct = Math.round((item.total / events.length) * 100);
                return (
                  <div key={item.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-gray-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                        {item.name}
                      </span>
                      <span className="font-bold text-dark">{item.total}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prochains événements */}
            <div className="mt-6 pt-5 border-t border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Prochains</p>
              <div className="space-y-2.5">
                {upcomingEventsList.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => navigate('/admin/events')}
                    className="w-full text-left group"
                  >
                    <p className="text-xs font-semibold text-dark truncate group-hover:text-primary-600 transition-colors">{e.title}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={9} />
                        {new Date(`${e.event_date}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className="flex items-center gap-1"><MapPin size={9} />{e.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Activité récente */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Activity size={16} className="text-primary-500" />
              <h3 className="text-sm font-bold text-dark">Activité récente</h3>
            </div>
            <div>
              {recentActivity.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 -mx-3 px-3 rounded-lg transition-colors w-full text-left group"
                >
                  <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-dark">
                      <span className="font-semibold">{item.action}</span>
                      <span className="text-gray-400"> — </span>
                      <span className="text-gray-500 truncate">{item.detail}</span>
                    </p>
                    <span className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-400">
                      <Clock size={10} />{item.time}
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="text-gray-200 group-hover:text-primary-400 transition-colors flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Résumé contenus */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-dark mb-5">Contenus par module</h3>
            <div className="space-y-4">
              {[
                { label: 'Actualités', total: articles.length, published: publishedArticles, color: 'bg-primary-500', path: '/admin/news' },
                { label: 'Événements', total: events.length, published: upcomingEvents, color: 'bg-accent-500', path: '/admin/events', pubLabel: 'à venir' },
                { label: 'Pages', total: pages.length, published: publishedPages, color: 'bg-blue-500', path: '/admin/pages' },
              ].map((item) => {
                const pct = Math.round((item.published / item.total) * 100) || 0;
                return (
                  <button key={item.label} onClick={() => navigate(item.path)} className="w-full text-left group">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-gray-600 group-hover:text-primary-600 transition-colors">{item.label}</span>
                      <span className="text-gray-400">
                        <span className="font-semibold text-dark">{item.published}</span>
                        {' '}{item.pubLabel || 'publiés'} / {item.total}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-50 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total contenus</span>
                <span className="font-bold text-dark">{articles.length + events.length + pages.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Brouillons</span>
                <span className="font-semibold text-amber-600">{totalDrafts}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Publiés</span>
                <span className="font-semibold text-emerald-600">{publishedArticles + publishedPages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
