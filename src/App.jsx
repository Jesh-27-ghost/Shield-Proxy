import { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import Overview from './pages/Overview';
import Clients from './pages/Clients';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Simulator from './pages/Simulator';

function DashboardLayout({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body wave-bg relative">
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <div className="wave-lines">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="wave-line-1">
          <path d="M0,100 Q150,50 300,100 T600,100 T900,100 L1000,100 L1000,200 L0,200 Z" fill="rgba(0, 255, 157, 0.05)" />
          <path d="M500,100 Q650,50 800,100 T1100,100 T1400,100 L1500,100 L1500,200 L500,200 Z" fill="rgba(0, 255, 157, 0.05)" />
        </svg>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="wave-line-2">
          <path d="M0,120 Q200,80 400,120 T800,120 L1000,120 L1000,200 L0,200 Z" fill="rgba(0, 227, 253, 0.03)" />
          <path d="M500,120 Q700,80 900,120 T1300,120 L1500,120 L1500,200 L500,200 Z" fill="rgba(0, 227, 253, 0.03)" />
        </svg>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="wave-line-3">
          <path d="M0,80 Q100,150 250,80 T550,80 T850,80 L1000,80 L1000,200 L0,200 Z" fill="rgba(228, 196, 79, 0.02)" />
          <path d="M500,80 Q600,150 750,80 T1050,80 T1350,80 L1500,80 L1500,200 L500,200 Z" fill="rgba(228, 196, 79, 0.02)" />
        </svg>
      </div>

      <div className="particle-field">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 10 + 10}s` }}></div>
        ))}
      </div>

      <Sidebar />

      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full pl-72 pr-8 fixed top-0 h-16 bg-slate-950/40 backdrop-blur-md z-40 border-b border-emerald-500/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00ff9d]"></div>
            <span className="text-xs font-label text-primary">Secure Orbit</span>
          </div>
          <span className="text-xs font-label text-slate-500 uppercase tracking-tighter">System Status:</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-slate-500 text-sm">search</span>
            <input
              className="bg-transparent border-b border-outline-variant/30 focus:border-primary-container focus:ring-0 text-[10px] font-label tracking-widest pl-9 w-48 transition-all text-on-surface"
              placeholder="QUERY NETWORK..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4 border-r border-emerald-500/10 pr-6">
            <div className="relative group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-300 cursor-pointer transition-colors">notifications</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border border-surface-container-lowest"></span>
            </div>
            <span className="material-symbols-outlined text-slate-400 hover:text-emerald-300 cursor-pointer transition-colors">settings</span>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="text-right">
              <p className="text-[10px] font-label text-slate-500 uppercase tracking-tighter">Operator_01</p>
              <p className="text-xs font-label text-emerald-400">SECURE_LEVEL_7</p>
            </div>
            
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 rounded-full border border-emerald-500/30 overflow-hidden bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-emerald-400 text-sm">person</span>
            </button>
            
            {showDropdown && (
              <div className="absolute top-12 right-0 w-56 bg-surface-container-lowest border border-outline-variant/50 rounded shadow-2xl z-50 overflow-hidden divide-y divide-outline-variant/10 fade-in-up origin-top-right">
                <button className="w-full text-left px-4 py-3 text-[10px] uppercase font-label tracking-widest text-outline hover:bg-white/5 hover:text-on-surface transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">manage_accounts</span>
                  Profile Setup
                </button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-[10px] uppercase font-label tracking-widest text-error hover:bg-error/10 transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-72 right-0 glass-edge"></div>
      </header>

      <main className="pl-80 pt-24 pb-12 pr-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const location = useLocation();

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
