import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Newspaper, CalendarDays,
  Settings, ChevronLeft, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
  { label: 'Pages', icon: FileText, path: '/admin/pages' },
  { label: 'Actualités', icon: Newspaper, path: '/admin/news' },
  { label: 'Événements', icon: CalendarDays, path: '/admin/events' },
  { label: 'Paramètres', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-gray-100 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <img
          src="/logo-finacom.png"
          alt="FINACOM"
          className={`object-contain flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-9 h-9' : 'w-10 h-10'}`}
        />
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-sm font-bold text-dark tracking-tight">FINACOM</span>
            <span className="block text-[9px] text-gray-400 uppercase tracking-wider -mt-0.5">Back Office</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest px-3 mb-3">
            Menu principal
          </p>
        )}
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
              isActive(path)
                ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon
              size={19}
              className={`flex-shrink-0 transition-colors ${
                isActive(path) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-gray-100 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
