import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import Overview from './pages/Overview';
import Clients from './pages/Clients';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Simulator from './pages/Simulator';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-on-primary font-body">
      {/* Background Layers */}
      <div className="fixed inset-0 grid-bg z-0 pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] spectral-glow z-0 pointer-events-none opacity-50 animate-glow"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] spectral-glow z-0 pointer-events-none opacity-30 animate-glow" style={{ animationDelay: '-10s' }}></div>

      <Sidebar />

      <main className="ml-64 relative z-10 min-h-screen">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 flex justify-between items-center px-12 py-6 bg-[#0c0e10]/40 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-body tracking-[0.3em] text-slate-500 uppercase">
              System Status: <span className="text-primary">Nominal</span>
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative flex items-center border-b border-outline-variant/20 focus-within:border-primary group transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
              <input 
                className="bg-transparent border-none text-[10px] tracking-widest focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 w-64 uppercase" 
                placeholder="CRYPTOGRAPHIC SEARCH..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <button className="material-symbols-outlined hover:text-primary transition-colors">notifications</button>
              <button className="material-symbols-outlined hover:text-primary transition-colors">history</button>
              <div className="h-8 w-8 bg-surface-container-highest border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-32 px-12 pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Homepage />} />
      <Route
        path="/overview"
        element={
          <DashboardLayout>
            <Overview />
          </DashboardLayout>
        }
      />
      <Route
        path="/clients"
        element={
          <DashboardLayout>
            <Clients />
          </DashboardLayout>
        }
      />
      <Route
        path="/alerts"
        element={
          <DashboardLayout>
            <Alerts />
          </DashboardLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        }
      />
      <Route
        path="/simulator"
        element={
          <DashboardLayout>
            <Simulator />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
