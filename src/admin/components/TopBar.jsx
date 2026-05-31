import { Bell, Search, ChevronDown, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

export default function TopBar({ title, subtitle, onToggleSidebar }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: 'Nouveau utilisateur inscrit', time: 'Il y a 5 min', unread: true },
    { id: 2, text: 'Article "Forum 2026" publié', time: 'Il y a 1h', unread: true },
    { id: 3, text: 'Document téléchargé 15 fois', time: 'Il y a 3h', unread: false },
  ];

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-dark tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-400 -mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 w-64 group focus-within:border-primary-300 focus-within:bg-white transition-all">
          <Search size={15} className="text-gray-300 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-dark placeholder-gray-300 outline-none w-full"
          />
          <kbd className="hidden lg:inline text-[10px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <span className="text-sm font-semibold text-dark">Notifications</span>
                <span className="text-[11px] text-primary-600 font-medium cursor-pointer hover:underline">Tout marquer lu</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 ${n.unread ? 'bg-primary-50/30' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-primary-500' : 'bg-transparent'}`} />
                    <div>
                      <p className="text-sm text-dark">{n.text}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-50 text-center">
                <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Voir tout</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-dark leading-tight">Admin FINACOM</p>
              <p className="text-[10px] text-gray-400">Administrateur</p>
            </div>
            <ChevronDown size={14} className="text-gray-300 hidden sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 py-2">
              {['Mon profil', 'Préférences', 'Journal d\'activité'].map((item) => (
                <button key={item} className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-dark transition-colors">
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
