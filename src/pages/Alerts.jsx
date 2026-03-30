import { useState, useMemo, useEffect } from 'react';
import { generateAlerts } from '../data/mockData';

export default function Alerts() {
  const [alerts, setAlerts] = useState(generateAlerts(20));
  const [filter, setFilter] = useState('all');
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
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
          !a.client.toLowerCase().includes(search.toLowerCase()) &&
          !a.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [alerts, filter, search]);

  const selectedAlert = useMemo(() => alerts.find(a => a.id === selectedId) || filteredAlerts[0], [alerts, selectedId, filteredAlerts]);

  const handleResolve = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return { border: 'border-error', text: 'text-error', bg: 'bg-error', label: 'Critical' };
      case 'high': return { border: 'border-tertiary-fixed-dim', text: 'text-tertiary-fixed-dim', bg: 'bg-tertiary-fixed-dim', label: 'Warning' };
      case 'medium': return { border: 'border-primary-container', text: 'text-primary-container', bg: 'bg-primary-container', label: 'Suspicious' };
      default: return { border: 'border-slate-500', text: 'text-slate-400', bg: 'bg-slate-500', label: 'Info' };
    }
  };

  return (
    <div className="fade-in-up flex h-[calc(100vh-6rem)] overflow-hidden">
      {/* Center Panel: Intercepts Feed */}
      <section className="flex-1 p-0 pr-0 overflow-y-auto no-scrollbar">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-headline text-4xl text-on-surface leading-tight">System Intercepts</h2>
            <p className="font-body text-outline mt-2 max-w-md">Real-time analysis of inbound LLM interactions. All high-confidence threats have been quarantined.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1">
              {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 text-xs font-label uppercase tracking-widest transition-colors border ${
                    filter === s
                      ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400'
                      : 'bg-surface-container-high border-outline-variant/20 text-on-surface hover:bg-surface-bright'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase tracking-widest text-on-surface hover:bg-surface-bright transition-colors">
              Export Logs
            </button>
          </div>
        </div>

        {/* Intercept Cards List */}
        <div className="space-y-4 pr-8">
          {filteredAlerts.map((alert) => {
            const sev = getSeverityColor(alert.severity);
            const confidence = alert.severity === 'critical' ? (Math.random() * 5 + 95).toFixed(1) :
                              alert.severity === 'high' ? (Math.random() * 10 + 80).toFixed(1) :
                              alert.severity === 'medium' ? (Math.random() * 15 + 60).toFixed(1) :
                              (Math.random() * 20 + 30).toFixed(1);
            return (
              <div
                key={alert.id}
                onClick={() => setSelectedId(alert.id)}
                className={`group relative bg-surface-container-low/60 backdrop-blur-sm p-6 hover:bg-surface-container-high/80 transition-all cursor-pointer ${
                  alert.id === selectedId ? 'border border-primary/10' : ''
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${sev.bg}`}></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className={`text-xs font-label ${sev.text} font-bold tracking-tighter mb-1 uppercase`}>Score</span>
                      <span className="text-2xl font-body font-bold text-on-surface">{confidence}</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl text-primary">{alert.title}</h3>
                      <p className="text-xs font-label text-slate-500 mt-1 uppercase tracking-wider">
                        Intercepted: {alert.timeStr} • PID: {alert.id.split('-').pop()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className={`text-[10px] font-label ${sev.text} uppercase font-bold px-2 py-0.5 border ${sev.border}/30 rounded-sm`}>
                        {sev.label}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedId(alert.id); }}
                      className="px-6 py-2 bg-transparent border border-outline/20 text-xs font-label uppercase tracking-[0.15em] text-secondary-fixed-dim hover:bg-secondary-fixed-dim/10 hover:border-secondary-fixed-dim/40 transition-all"
                    >
                      View Decrypt
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right Side Panel: Payload Investigation */}
      <aside className="w-[480px] bg-slate-950/40 backdrop-blur-2xl border-l border-emerald-500/10 p-8 overflow-y-auto no-scrollbar shrink-0">
        {selectedAlert && (
          <>
            <header className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-headline text-3xl text-on-surface">Investigation</h2>
                <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-on-surface transition-colors" onClick={() => setSelectedId(null)}>close</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${selectedAlert.resolved ? 'bg-primary-container' : 'bg-error'} pulsating-beacon`}></div>
                <span className={`text-xs font-label ${selectedAlert.resolved ? 'text-primary-container' : 'text-error'} uppercase font-bold tracking-widest`}>
                  {selectedAlert.resolved ? 'Resolved' : 'Live Forensics Active'}
                </span>
              </div>
            </header>

            <div className="space-y-8">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-high/40 p-4 border-l border-secondary-fixed-dim/20">
                  <p className="text-[10px] font-label text-slate-500 uppercase">Vector</p>
                  <p className="text-sm font-body text-primary-container">{selectedAlert.client}</p>
                </div>
                <div className="bg-surface-container-high/40 p-4 border-l border-secondary-fixed-dim/20">
                  <p className="text-[10px] font-label text-slate-500 uppercase">Latency</p>
                  <p className="text-sm font-body text-primary-container">{selectedAlert.details?.attackCount ? `${Math.floor(Math.random() * 40 + 10)}ms` : '42ms'}</p>
                </div>
              </div>

              {/* Technical Code View */}
              <div>
                <h4 className="text-xs font-label text-slate-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">terminal</span>
                  Blocked Source Fragment
                </h4>
                <div className="bg-[#080a0c] p-6 font-mono text-xs leading-relaxed text-secondary border border-outline-variant/10 relative">
                  <div className="absolute top-2 right-4 text-[10px] text-slate-600">{selectedAlert.details?.category?.toUpperCase().replace(/\s/g, '_')}</div>
                  <pre className="whitespace-pre-wrap"><span className="text-outline">01</span>  <span className="text-secondary-fixed-dim">system_override</span> {'{'}{'\n'}
<span className="text-outline">02</span>    <span className="text-primary-container">"action"</span>: "bypass_safety_layer",{'\n'}
<span className="text-outline">03</span>    <span className="text-primary-container">"payload"</span>: <span className="text-error">"SELECT * FROM users WHERE..."</span>{'\n'}
<span className="text-outline">04</span>    <span className="text-primary-container">"token"</span>: "admin_elevated_662"{'\n'}
<span className="text-outline">05</span>  {'}'}{'\n'}
<span className="text-outline">06</span>  {'\n'}
<span className="text-outline">07</span>  <span className="text-slate-600">// Obfuscated entry point detected</span>{'\n'}
<span className="text-outline">08</span>  <span className="text-primary-container">function</span> <span className="text-secondary-fixed-dim">init_leak</span>() {'{'}{'\n'}
<span className="text-outline">09</span>    <span className="text-error">return base64_decode("Y29uZm..."</span>{'\n'}
<span className="text-outline">10</span>  {'}'}</pre>
                </div>
              </div>

              {/* Security Verdict */}
              <div className="p-6 bg-error-container/10 border-t border-error/20">
                <h4 className="text-xs font-label text-error uppercase mb-3 tracking-widest">Final Threat Verdict</h4>
                <p className="font-headline text-lg text-on-surface mb-4">
                  {selectedAlert.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleResolve(selectedAlert.id)}
                    className="flex-1 py-3 bg-error text-on-error text-[10px] font-label font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all"
                  >
                    Hard Purge
                  </button>
                  <button className="flex-1 py-3 border border-outline/20 text-on-surface text-[10px] font-label font-bold uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all">
                    Trace IP
                  </button>
                </div>
              </div>

              {/* Data Noise Decoration */}
              <div className="opacity-20 pointer-events-none">
                <div className="flex justify-between text-[8px] font-mono text-secondary-fixed-dim">
                  <span>LAT: 40.7128° N</span>
                  <span>LNG: 74.0060° W</span>
                </div>
                <div className="h-12 w-full mt-2 overflow-hidden flex items-end gap-[1px]">
                  {[4, 8, 2, 10, 6, 12, 3, 7, 5, 9].map((h, i) => (
                    <div key={i} className="w-2 bg-primary-container" style={{ height: `${h * 4}px` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
