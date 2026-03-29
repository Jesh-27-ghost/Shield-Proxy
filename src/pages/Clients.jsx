import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { generateClients } from '../data/mockData';

const CHART_COLORS = ['#a0ffc3', '#00e3fd', '#d7e6ff', '#ff716c', '#ffffff33', '#ffffff55'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-highest border border-white/10 p-4 backdrop-blur-xl">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
        {payload[0].payload.time}
      </span>
      <span className="text-sm font-headline italic text-on-surface">
        {payload[0].value?.toLocaleString()} Transactions
      </span>
    </div>
  );
}

export default function Clients() {
  const [clients] = useState(generateClients());
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [sortBy, setSortBy] = useState('requests');

  const filteredClients = useMemo(() => {
    let list = clients.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.apiKey.toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a, b) => {
      if (sortBy === 'requests') return b.requests - a.requests;
      if (sortBy === 'blockRate') return parseFloat(b.blockRate) - parseFloat(a.blockRate);
      if (sortBy === 'latency') return a.avgLatency - b.avgLatency;
      return 0;
    });
    return list;
  }, [clients, search, sortBy]);

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-headline italic font-light text-on-surface leading-tight mb-2">
            Authorized <span className="text-secondary">Personnel</span> Inventory
          </h2>
          <p className="text-sm font-body text-on-surface-variant tracking-wider max-w-lg">
            Proprietary access keys and identification metadata for all connected neural interfaces. Surveillance is constant across all listed nodes.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative flex items-center border-b border-outline-variant/20 focus-within:border-primary group transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
            <input 
              className="bg-transparent border-none text-[10px] tracking-widest focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 w-64 uppercase" 
              placeholder="SEARCH CREDENTIALS..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Sorting Tabs */}
      <div className="flex gap-4 mb-8">
        {[
          { key: 'requests', label: 'Throughput', icon: 'speed' },
          { key: 'blockRate', label: 'Nullification Rate', icon: 'security' },
          { key: 'latency', label: 'Neural Latency', icon: 'avg_pace' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`flex items-center gap-2 px-6 py-3 border transition-all uppercase tracking-[0.2em] text-[10px] font-bold ${
              sortBy === s.key ? 'border-primary text-primary bg-primary/5 shadow-[0_0_15px_#a0ffc333]' : 'border-white/5 text-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="glass-panel group p-8 cursor-pointer hover:bg-surface-container-high transition-all relative overflow-hidden"
          >

            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-headline italic text-2xl text-slate-400 group-hover:text-primary transition-colors">
                {client.name.charAt(0)}
              </div>
              <span className={`text-[8px] px-2 py-0.5 uppercase tracking-widest font-mono ${client.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-slate-500/10 text-slate-500'}`}>
                {client.status === 'active' ? 'Sync_Stable' : 'Offline'}
              </span>
            </div>

            <h3 className="text-2xl font-headline italic text-on-surface mb-2 group-hover:text-primary transition-colors">{client.name}</h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-10 border-b border-white/5 pb-4">{client.apiKey}</p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-slate-600 mb-1">Transactions</span>
                <span className="text-lg font-body font-light">{client.requests.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-slate-600 mb-1">Null Rate</span>
                <span className={`text-lg font-body font-light ${parseFloat(client.blockRate) > 15 ? 'text-error' : 'text-primary'}`}>{client.blockRate}%</span>
              </div>
            </div>

            <div className="mt-10 flex justify-between items-center text-[10px] text-slate-600 uppercase tracking-widest border-t border-white/5 pt-4">
              <span>{client.country}</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Overlay */}
      {selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar relative flex flex-col p-12 lg:p-16 border-white/10">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-8 right-8 text-slate-500 hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex justify-between items-start mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center font-headline italic text-4xl text-primary">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-5xl font-headline italic text-on-surface mb-1">{selectedClient.name}</h2>
                    <code className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{selectedClient.apiKey}</code>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Location Profile</span>
                <span className="text-2xl font-headline italic text-on-surface">{selectedClient.country}</span>
              </div>
            </div>

            {/* High Impact Stats */}
            <div className="grid grid-cols-4 gap-8 mb-16 border-y border-white/5 py-12">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Total Ingress</span>
                <span className="text-4xl font-body font-light text-on-surface">{selectedClient.requests.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Nullified Protocols</span>
                <span className="text-4xl font-body font-light text-error">{selectedClient.blocked.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Defense Efficiency</span>
                <span className="text-4xl font-body font-light text-primary">{selectedClient.blockRate}%</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Neural Lag</span>
                <span className="text-4xl font-body font-light text-secondary">{selectedClient.avgLatency}ms</span>
              </div>
            </div>

            {/* Main Visual Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <h4 className="text-[11px] font-mono uppercase text-slate-500 tracking-[0.3em] mb-8 border-b border-white/5 pb-2 inline-block italic">Historical Flow Surveillance</h4>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedClient.usageData}>
                      <defs>
                        <linearGradient id="modalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a0ffc3" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#a0ffc3" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#4b5563' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="requests" stroke="#a0ffc3" fill="url(#modalGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4">
                <h4 className="text-[11px] font-mono uppercase text-slate-500 tracking-[0.3em] mb-8 border-b border-white/5 pb-2 inline-block italic">Dominant Anomalies</h4>
                <div className="space-y-6">
                  {selectedClient.topAttacks.map((atk, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 border-l-2 border-primary/40">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Vector Class</span>
                        <span className="text-xs font-bold text-on-surface uppercase tracking-tighter">{atk.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-primary">{atk.count} Exp</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-12">
              <div className="flex gap-4">
                <button className="bg-primary text-on-primary px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:shadow-[0_0_15px_rgba(160,255,195,0.4)] transition-all">Regenerate Key</button>
                <button className="border border-white/10 text-on-surface px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 transition-all">Flush Logs</button>
              </div>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">Surveillance Mode: ACTIVE // PROTOCOL STABLE</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
