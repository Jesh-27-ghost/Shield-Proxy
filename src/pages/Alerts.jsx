import { useState, useMemo, useEffect } from 'react';
import { generateAlerts } from '../data/mockData';

export default function Alerts() {
  const [alerts, setAlerts] = useState(generateAlerts(20));
  const [filter, setFilter] = useState('all'); // all, critical, high, medium, low
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, resolved
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');

  // Simulate real-time incoming alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlerts = generateAlerts(1);
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 30));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(a => {
      if (filter !== 'all' && a.severity !== filter) return false;
      if (statusFilter === 'resolved' && !a.resolved) return false;
      if (statusFilter === 'active' && a.resolved) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
          !a.client.toLowerCase().includes(search.toLowerCase()) &&
          !a.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [alerts, filter, statusFilter, search]);

  const selectedAlert = useMemo(() => alerts.find(a => a.id === selectedId) || alerts[0], [alerts, selectedId]);

  const handleResolve = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  return (
    <div className="fade-in-up">
      {/* Header Row */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-headline italic font-light text-on-surface leading-tight mb-2">
            Security <span className="text-primary">Alerts</span>
          </h2>
          <p className="text-sm font-body text-on-surface-variant tracking-wider max-w-lg">
            Real-time threat notifications and security event monitoring. Active protocols are currently surveilling {alerts.length} historical anomalies.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-surface-container-low px-4 py-2 border-b border-white/10 group focus-within:border-primary transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-sm text-slate-500 mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-[10px] tracking-widest text-on-surface placeholder-slate-600 w-48 uppercase" 
              placeholder="SEARCH PROTOCOLS..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[calc(100vh-320px)] min-h-[600px]">
        {/* Left Column: List */}
        <div className="col-span-4 glass-panel border border-white/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container-low">
            <span className="text-[10px] uppercase font-label tracking-widest text-slate-500">{filteredAlerts.length} Captured Events</span>
            <div className="flex gap-1">
              {['all', 'active', 'resolved'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-[8px] uppercase tracking-widest px-2 py-1 border border-white/5 ${statusFilter === s ? 'text-primary bg-primary/10' : 'text-slate-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-white/5">
            {filteredAlerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => setSelectedId(alert.id)}
                className={`w-full text-left p-6 transition-all hover:bg-primary/5 group ${alert.id === selectedId ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 uppercase ${
                    alert.severity === 'critical' ? 'bg-error/20 text-error' : 
                    alert.severity === 'high' ? 'bg-error/10 text-error/80' : 
                    alert.severity === 'medium' ? 'bg-secondary/20 text-secondary' : 
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{alert.timeStr}</span>
                </div>
                <h4 className={`text-md font-headline italic mb-1 transition-colors ${alert.id === selectedId ? 'text-primary' : 'text-on-surface'}`}>
                  {alert.title}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 truncate uppercase tracking-tighter">{alert.client}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="col-span-8 glass-panel p-10 flex flex-col relative overflow-hidden">
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 spectral-glow opacity-20 pointer-events-none"></div>

          {selectedAlert && (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${selectedAlert.resolved ? 'bg-primary' : 'bg-error animate-pulse'}`}></span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-slate-500">
                      Case #{selectedAlert.id.split('-').pop()} // {selectedAlert.resolved ? 'NULLIFIED' : 'ACTIVE_THREAT'}
                    </span>
                  </div>
                  <h3 className="text-4xl font-headline italic text-on-surface mb-4 leading-tight max-w-xl">
                    {selectedAlert.title}
                  </h3>
                  <div className="flex gap-4 items-center">
                    <span className="text-[10px] font-mono font-bold text-primary uppercase bg-primary/10 px-3 py-1">{selectedAlert.client}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{selectedAlert.timeStr}</span>
                  </div>
                </div>
                {!selectedAlert.resolved && (
                  <button 
                    onClick={() => handleResolve(selectedAlert.id)}
                    className="bg-primary text-on-primary px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:shadow-[0_0_15px_rgba(160,255,195,0.4)] transition-all"
                  >
                    Archive Incident
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-12 mb-12 border-y border-white/5 py-12">
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[11px] font-mono uppercase text-slate-500 tracking-[0.2em] mb-4">Incident Log Summary</h5>
                    <p className="text-on-surface leading-relaxed text-sm font-body font-light italic">
                      {selectedAlert.description}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase text-slate-500 tracking-[0.2em] mb-4 italic">Surveillance Payload</h5>
                    <div className="bg-black/40 p-6 border border-white/5 font-mono text-[10px] text-slate-400 overflow-x-auto">
                      <code className="block mb-2 text-secondary tracking-widest uppercase">// INCOMING VECTOR_ID: {selectedAlert.details.category}</code>
                      <code className="block leading-relaxed">TARGET: {selectedAlert.clientId}</code>
                      <code className="block leading-relaxed">ATTACKS: {selectedAlert.details.attackCount}</code>
                      <code className="block leading-relaxed">BLOCKED: {selectedAlert.details.blockedCount}</code>
                      <code className="block leading-relaxed">IP_COUNT: {selectedAlert.details.sourceIPs}</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-panel p-8 border border-white/10 spectral-glow relative">
                    <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-40 text-lg">verified_user</span>
                    <h5 className="text-[10px] font-mono uppercase text-primary tracking-widest mb-6 border-b border-primary/20 pb-2">Prophylactic Recommendation</h5>
                    <p className="text-xs text-on-surface font-body font-light leading-relaxed">
                      {selectedAlert.details.recommendation}
                    </p>
                  </div>

                  <div className="p-8 border border-white/5 bg-white/5">
                    <h5 className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-6">Threat Classification</h5>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 border border-white/10 text-[9px] font-mono uppercase text-slate-400">Layer-07</span>
                      <span className="px-3 py-1 border border-white/10 text-[9px] font-mono uppercase text-slate-400">Prompt_Exploit</span>
                      <span className="px-3 py-1 border border-white/10 text-[9px] font-mono uppercase text-primary border-primary/20">System_Lock_engaged</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center bg-white/5 p-6 border-t border-white/5">
                <div className="flex items-center gap-4 text-[9px] font-mono uppercase text-slate-400">
                  <span>Authorized Personnel: Agent.001</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span>Auth Token Valid</span>
                </div>
                <div className="flex gap-4">
                  <button className="text-[10px] font-mono text-slate-500 hover:text-on-surface transition-colors uppercase tracking-widest border-b border-transparent hover:border-on-surface">Decrypt Pattern</button>
                  <button className="text-[10px] font-mono text-slate-500 hover:text-on-surface transition-colors uppercase tracking-widest border-b border-transparent hover:border-on-surface">Export Evidence</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
