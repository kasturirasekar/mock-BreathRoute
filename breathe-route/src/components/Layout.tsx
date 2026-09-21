import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Activity, BarChart2, ChevronDown } from 'lucide-react';
import { SCHOOL } from '../data';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/overview', icon: <LayoutDashboard size={18} /> },
    { name: 'Routes', path: '/routes', icon: <Map size={18} /> },
    { name: 'Live Journey', path: '/live', icon: <Activity size={18} /> },
    { name: 'Insights', path: '/insights', icon: <BarChart2 size={18} /> },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans text-text">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-[#F7F8F6] flex flex-col justify-between z-50">
        <div>
          <div className="p-6 pb-6">
            <h1 className="text-xl font-bold tracking-tight text-primary">BreatheRoute</h1>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1">Environmental Intelligence</p>
          </div>

          <div className="px-4 mb-6">
            <div className="w-full flex items-center justify-between border border-border bg-white rounded p-3">
              <div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Institution</div>
                <div className="text-xs font-bold text-text truncate">{SCHOOL.name}</div>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>

          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded transition-none text-sm font-semibold ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-200 hover:text-text'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text">System Online</span>
          </div>
          <div className="text-[10px] text-gray-500 leading-tight">
            Environmental network active
          </div>
          <div className="mt-6 pt-4 border-t border-border text-[9px] text-gray-400 uppercase tracking-widest">
            Illustrative environmental intelligence simulation
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-background">
        {children}
      </main>
    </div>
  );
};

export default Layout;
