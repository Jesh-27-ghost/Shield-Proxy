import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { generateClients } from '../data/mockData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-highest border border-outline-variant/20 p-4 backdrop-blur-xl rounded">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
        {payload[0].payload.time}
      </span>
      <span className="text-sm font-headline text-on-surface">
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

  // Generate mini-chart bars for each client
  const getMiniBarHeights = (client) => {
    const heights = [];
    for (let i = 0; i < 5; i++) {
      heights.push(Math.random() * 0.75 + 0.25);
    }
    return heights;
  };

  return (
    <div className="fade-in-up max-w-7xl mx-auto">
      {/* Header & Action Row */}
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <h2 className="text-5xl font-headline text-primary tracking-tight">Client Infrastructure Registry</h2>
          <p className="text-secondary-fixed-dim font-label text-xs uppercase tracking-[0.3em]">System Manifest &amp; Cryptographic Protocols</p>
        </div>
        <button
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-primary-container to-emerald-600 text-on-primary font-label font-bold text-xs uppercase tracking-widest rounded-sm emerald-glow transition-all hover:scale-[1.02] active:scale-95"
          onClick={() => {/* Add client modal placeholder */}}
        >
          <span className="material-symbols-outlined text-sm">add_link</span>
          Provision New Client
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 border-t border-emerald-500/20 glass-card">
          <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-4">API Keys</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline text-primary">{clients.length > 0 ? '1,248' : '0'}</span>
            <span className="text-emerald-400 text-xs font-label">+12</span>
          </div>
        </div>
        <div className="p-6 border-t border-emerald-500/20 glass-card">
          <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-4">Active Handshakes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline text-primary">{filteredClients.filter(c => c.status === 'active').length * 84}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 text-[10px] font-label uppercase">Live</span>
            </span>
          </div>
        </div>
        <div className="p-6 border-t border-emerald-500/20 glass-card">
          <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-4">Global Latency</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline text-primary">14.2</span>
            <span className="text-secondary-fixed-dim text-xs font-label">ms</span>
          </div>
        </div>
        <div className="p-6 border-t border-emerald-500/20 glass-card">
          <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-4">Threat Mitigation</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline text-primary">99.9</span>
            <span className="text-emerald-400 text-xs font-label">%</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-xs font-label tracking-[0.1em] text-on-surface w-full pl-10 py-3 border-b border-outline-variant/20 focus:border-primary-container transition-all"
            placeholder="QUERY INFRASTRUCTURE..."
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'requests', label: 'Throughput' },
            { key: 'blockRate', label: 'Block Rate' },
            { key: 'latency', label: 'Latency' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              className={`text-[10px] font-label uppercase tracking-widest px-4 py-2 border transition-all ${
                sortBy === s.key ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' : 'border-outline-variant/20 text-slate-500 hover:text-on-surface'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Registry Table */}
      <div className="rounded-xl glass-card overflow-hidden border-t border-emerald-500/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-500/5">
              <th className="px-8 py-6 text-[10px] font-label text-emerald-400 uppercase tracking-[0.2em]">Client Identity</th>
              <th className="px-8 py-6 text-[10px] font-label text-emerald-400 uppercase tracking-[0.2em]">Cryptographic Key</th>
              <th className="px-8 py-6 text-[10px] font-label text-emerald-400 uppercase tracking-[0.2em]">Usage Trend</th>
              <th className="px-8 py-6 text-[10px] font-label text-emerald-400 uppercase tracking-[0.2em]">Integrity Status</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/5">
            {filteredClients.map((client) => {
              const barHeights = getMiniBarHeights(client);
              const isActive = client.status === 'active';
              const hasSpike = parseFloat(client.blockRate) > 15;
              return (
                <tr key={client.id} className="group hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedClient(client)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-container-high rounded border border-outline-variant/30 flex items-center justify-center font-headline text-lg text-primary">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-headline text-lg text-primary">{client.name}</p>
                        <p className="text-[10px] font-label text-slate-500 uppercase tracking-wider">{client.country} • Tier {isActive ? '1' : '2'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="font-label text-xs text-secondary-fixed-dim bg-secondary-fixed/5 px-3 py-1 rounded">{client.apiKey}</code>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-end gap-1 h-8">
                      {barHeights.map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 ${hasSpike ? 'bg-error' : 'bg-emerald-500'} ${i === barHeights.length - 1 ? '' : hasSpike ? 'opacity-40' : 'opacity-40'}`}
                          style={{ height: `${h * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest ${
                      hasSpike ? 'bg-error/10 border border-error/20 text-error' :
                      isActive ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                      'bg-slate-500/10 border border-slate-500/20 text-slate-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${hasSpike ? 'bg-error animate-pulse' : isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      {hasSpike ? 'Traffic Spike' : isActive ? 'Operational' : 'Hibernation'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-500 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Contextual Information */}
      <div className="mt-12 flex items-start gap-12">
        <div className="flex-1 p-8 bg-surface-container-high/40 rounded border border-outline-variant/10">
          <h4 className="font-headline text-xl text-primary mb-4">Integrity Monitoring</h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            The Infrastructure Registry provides real-time verification of all active client handshakes. ShieldProxy employs an asymmetrical trust model where each node is isolated within a virtual obsidian vault. Any anomaly in cryptographic signatures or traffic density triggers an immediate isolation protocol.
          </p>
        </div>
        <div className="w-1/3 p-8 border-l border-emerald-500/20">
          <p className="text-[10px] font-label text-emerald-400 uppercase tracking-[0.2em] mb-4">Latest Audit Log</p>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-label">FintechBot_Relay_04</span>
              <span className="text-emerald-400 font-mono">0.00ms ack</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-label">Global_Key_Rotation</span>
              <span className="text-secondary-fixed-dim font-mono">COMPLETED</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-label">Threat_Vector_Scan</span>
              <span className="text-primary font-mono">CLEAN</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar relative flex flex-col p-12 lg:p-16 border border-outline-variant/10 rounded-xl">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-8 right-8 text-slate-500 hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="flex justify-between items-start mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-headline text-4xl text-primary rounded">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-5xl font-headline text-on-surface mb-1">{selectedClient.name}</h2>
                    <code className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{selectedClient.apiKey}</code>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Location</span>
                <span className="text-2xl font-headline text-on-surface">{selectedClient.country}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 mb-16 border-y border-outline-variant/10 py-12">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Total Ingress</span>
                <span className="text-4xl font-body font-light text-on-surface">{selectedClient.requests.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Neutralized</span>
                <span className="text-4xl font-body font-light text-error">{selectedClient.blocked.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Block Rate</span>
                <span className="text-4xl font-body font-light text-primary-container">{selectedClient.blockRate}%</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Latency</span>
                <span className="text-4xl font-body font-light text-secondary-fixed-dim">{selectedClient.avgLatency}ms</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <h4 className="text-[11px] font-label uppercase text-emerald-400 tracking-[0.2em] mb-8">Historical Flow</h4>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedClient.usageData}>
                      <defs>
                        <linearGradient id="modalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#4b5563' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="requests" stroke="#00ff9d" fill="url(#modalGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4">
                <h4 className="text-[11px] font-label uppercase text-emerald-400 tracking-[0.2em] mb-8">Dominant Anomalies</h4>
                <div className="space-y-6">
                  {selectedClient.topAttacks.map((atk, i) => (
                    <div key={i} className="flex justify-between items-center bg-surface-container-high/40 p-4 border-l-2 border-primary-container/40">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Vector Class</span>
                        <span className="text-xs font-bold text-on-surface uppercase tracking-tighter">{atk.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-primary-container">{atk.count} Exp</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-between items-center border-t border-outline-variant/10 pt-12">
              <div className="flex gap-4">
                <button className="bg-gradient-to-br from-primary-container to-emerald-600 text-on-primary px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all rounded-sm">Regenerate Key</button>
                <button className="border border-outline-variant/20 text-on-surface px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 transition-all">Flush Logs</button>
              </div>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">REGISTRY_v3.2.0 // PROTOCOL STABLE</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid Coord */}
      <div className="mt-8 text-right font-label text-[10px] text-emerald-500/30 tracking-[0.5em] pointer-events-none">
        GRID_COORD: 51.5074° N, 0.1278° W // REGISTRY_v3.2.0
      </div>
    </div>
  );
}
