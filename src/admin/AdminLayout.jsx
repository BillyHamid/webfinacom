import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`transition-all duration-300 ${
          collapsed ? 'ml-[72px]' : 'ml-[260px]'
        }`}
      >
        <Outlet context={{ collapsed, setCollapsed }} />
      </div>
    </div>
  );
}
