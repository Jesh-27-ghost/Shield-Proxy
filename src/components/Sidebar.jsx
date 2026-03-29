import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: 'dashboard' },
  { path: '/clients', label: 'Clients', icon: 'group' },
  { path: '/alerts', label: 'Alerts', icon: 'security', badge: 5 },
  { path: '/analytics', label: 'Analytics', icon: 'analytics' },
  { path: '/simulator', label: 'Attack Simulator', icon: 'biotech' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-[#0c0e10]/80 backdrop-blur-2xl border-r border-[#ffffff]/10">
      <div className="p-8">
        <h1 className="text-2xl font-normal italic font-headline text-[#00FF9D]">ShieldProxy</h1>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-body">V-01 Secure Access</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map(({ path, label, icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-300 ${
                isActive
                  ? 'bg-[#00FF9D]/10 text-[#00FF9D] border-l-4 border-[#00FF9D]'
                   : 'text-slate-400 hover:bg-[#00FF9D]/5 hover:text-[#00FF9D]'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            <span className="uppercase tracking-widest text-xs font-medium font-body">{label}</span>
            {badge && (
              <span className="ml-auto bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-sm">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-8 border-t border-white/5 space-y-2">
        <button className="w-full bg-primary text-on-primary px-4 py-3 text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_15px_#a0ffc3] transition-all duration-300">
          Authorize
        </button>
        <div className="pt-4 space-y-1">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 text-slate-400 text-xs hover:text-[#00FF9D]"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            <span className="uppercase tracking-tighter">Settings</span>
          </NavLink>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 text-xs hover:text-error text-left">
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="uppercase tracking-tighter">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
