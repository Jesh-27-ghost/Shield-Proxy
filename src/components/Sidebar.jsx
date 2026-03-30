import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: 'dashboard' },
  { path: '/clients', label: 'Clients', icon: 'group' },
  { path: '/alerts', label: 'Alerts', icon: 'notifications_active' },
  { path: '/analytics', label: 'Analytics', icon: 'insights' },
  { path: '/simulator', label: 'Attack Simulator', icon: 'swords' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-4 bg-slate-950/60 backdrop-blur-xl w-64 border-r border-emerald-500/20 shadow-[0_0_30px_rgba(0,255,157,0.05)] z-50">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-emerald-400 font-headline">ShieldProxy</h1>
            <p className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-label">Vanguard Level</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                isActive
                  ? 'text-emerald-400 border-r-2 border-emerald-400 bg-emerald-500/10 font-medium'
                  : 'text-slate-400 hover:text-emerald-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span 
                  className="material-symbols-outlined text-xl"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >{icon}</span>
                <span className="font-label text-sm tracking-wide">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label font-bold text-xs uppercase tracking-widest rounded-sm hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all active:scale-95 emerald-glow">
          Deploy Sentry
        </button>
      </div>
    </aside>
  );
}
