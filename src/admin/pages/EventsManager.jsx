import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Plus, MapPin, Clock, Users, Pencil, Trash2,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';

const EVENT_TYPES = ['Conférence', 'Formation', 'Assemblée', 'Événement'];
const COLORS = ['bg-primary-500', 'bg-accent-500', 'bg-blue-500', 'bg-emerald-500'];

const emptyForm = {
  title: '', event_date: '', time_range: '', location: '',
  type: EVENT_TYPES[0], capacity: '', description: '', color: COLORS[0],
};

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

function MiniCalendar({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const startDay = (firstDayOfMonth(year, month) + 6) % 7; // Monday start
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const eventDays = events.map((e) => {
    const d = new Date(`${e.event_date}T00:00:00`);
    return { day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), color: e.color };
  }).filter((e) => e.month === month && e.year === year);

  const today = new Date();
  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-dark">{monthNames[month]} {year}</h3>
        <div className="flex gap-1">
          <button onClick={prev} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={next} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const event = eventDays.find((e) => e.day === day);
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          return (
            <div
              key={day}
              className={`relative w-full aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-default ${
                isToday ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {day}
              {event && (
                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${event.color}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EventsManager() {
  const { collapsed, setCollapsed } = useOutletContext();
  const { data: events, loading, create, update, remove } = useSupabaseTable('events', {
    orderBy: 'event_date',
    ascending: true,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title || '',
      event_date: event.event_date || '',
      time_range: event.time_range || '',
      location: event.location || '',
      type: event.type || EVENT_TYPES[0],
      capacity: event.capacity ?? '',
      description: event.description || '',
      color: event.color || COLORS[0],
    });
    setShowForm(true);
  };

  const deleteEvent = async (id) => {
    if (!confirm('Supprimer cet événement ?')) return;
    await remove(id);
  };

  const save = async () => {
    if (!form.title.trim() || !form.event_date) {
      alert("Le nom et la date de l'événement sont requis.");
      return;
    }
    setSaving(true);
    try {
      const values = { ...form, capacity: Number(form.capacity) || 0 };
      if (editingId) {
        await update(editingId, values);
      } else {
        await create(values);
      }
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
        <TopBar title={editingId ? "Modifier l'événement" : 'Nouvel événement'} subtitle="Créer un événement" onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="p-6 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nom de l'événement</label>
              <input
                type="text"
                placeholder="Ex: Forum de l'Inclusion Financière"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Horaires</label>
                <input
                  type="text"
                  placeholder="09:00 - 17:00"
                  value={form.time_range}
                  onChange={(e) => setForm((f) => ({ ...f, time_range: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lieu</label>
                <input
                  type="text"
                  placeholder="Ville, Salle..."
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 bg-white"
                >
                  {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Capacité</label>
                <input
                  type="number"
                  placeholder="200 (0 = entrée libre)"
                  value={form.capacity}
                  onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Couleur</label>
                <select
                  value={form.color}
                  onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 bg-white"
                >
                  {COLORS.map((c) => <option key={c} value={c}>{c.replace('bg-', '').replace('-500', '')}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Décrivez l'événement..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
              <button disabled={saving} onClick={save} className="px-5 py-2.5 text-sm bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold shadow-lg shadow-primary-600/15 disabled:opacity-60">
                {editingId ? "Enregistrer" : "Créer l'événement"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Gestion des Événements" subtitle={`${events.length} événements`} onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="p-6">
        <div className="flex justify-end mb-6">
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/15">
            <Plus size={16} />
            Nouvel événement
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Events list */}
          <div className="lg:col-span-2 space-y-4">
            {loading && <div className="text-sm text-gray-400 px-1">Chargement...</div>}
            {!loading && events.length === 0 && <div className="text-sm text-gray-400 px-1">Aucun événement</div>}
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${event.color} flex flex-col items-center justify-center text-white flex-shrink-0`}>
                    <span className="text-lg font-bold leading-none">{new Date(`${event.event_date}T00:00:00`).getDate()}</span>
                    <span className="text-[9px] uppercase tracking-wider">{new Date(`${event.event_date}T00:00:00`).toLocaleString('fr-FR', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-gray-50 text-[10px] font-medium text-gray-500 mb-1 inline-block">{event.type}</span>
                        <h3 className="text-sm font-bold text-dark group-hover:text-primary-600 transition-colors">{event.title}</h3>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(event)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => deleteEvent(event.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12} />{event.time_range}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{event.location}</span>
                      {event.capacity > 0 && <span className="flex items-center gap-1"><Users size={12} />{event.capacity} places</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div>
            <MiniCalendar events={events} />
          </div>
        </div>
      </div>
    </>
  );
}
