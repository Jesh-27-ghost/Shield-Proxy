import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, BarChart, Bar, Cell,
} from 'recharts';
import {
  generateVolumeData, generateAttackBreakdown,
  generateLatencyDistribution, generateGeoData,
} from '../data/mockData';
import WorldMap from '../components/WorldMap';

const CHART_COLORS = ['#a0ffc3', '#00e3fd', '#d7e6ff', '#ff716c', '#ffffff33', '#ffffff55'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-highest border border-white/10 p-4 backdrop-blur-xl">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
        {label || payload[0].payload.name}
      </span>
      <span className="text-sm font-headline italic text-on-surface">
        {payload[0].value?.toLocaleString()} {payload[0].dataKey === 'requests' ? 'Protocols' : 'Anomalies'}
      </span>
    </div>
  );
}

export default function Analytics() {
  const [volumeData] = useState(generateVolumeData(24));
  const [attackBreakdown] = useState(generateAttackBreakdown());
  const [latencyDist] = useState(generateLatencyDistribution());
  const [geoData] = useState(generateGeoData());

  const maxGeoAttacks = useMemo(() => Math.max(...geoData.map(g => g.attacks)), [geoData]);

  return (
    <div className="fade-in-up">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h3 className="text-5xl font-headline italic font-light text-on-surface leading-tight mb-2">
            Real-time <span className="text-primary">Intelligence</span> Spectrum
          </h3>
          <p className="text-sm font-body text-on-surface-variant tracking-wider max-w-lg">
            Analyzing global request patterns and cryptographic anomalies. Every node is monitored; every latency spike is classified. Precision is the ultimate layer of defense.
          </p>
        </div>
        <div className="flex gap-8 text-right font-mono">
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-1">Total Throughput</span>
            <span className="text-2xl text-secondary">42.8 GB/S</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-1">Threat Score</span>
            <span className="text-2xl text-error">0.024</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Chart Card (Main) */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-8 relative border-l-4 border-primary">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h4 className="text-2xl font-headline italic text-on-surface">Request Volume <span className="opacity-30">(24H)</span></h4>
              <p className="text-[10px] uppercase font-label tracking-widest text-slate-500">Global scale ingestion monitoring</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary text-[9px] font-mono px-3 py-1 uppercase tracking-widest">Live Surveillance</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a0ffc3" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#a0ffc3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#4b5563' }} axisLine={false} tickLine={false} dy={10} interval={4} />
                <YAxis tick={{ fontSize: 9, fill: '#4b5563' }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#a0ffc3', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="requests" stroke="#a0ffc3" fill="url(#areaGrad1)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="blocked" stroke="#ff716c" fill="transparent" strokeWidth={1} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Breakdown (Secondary) */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-8">
          <h4 className="text-2xl font-headline italic text-on-surface mb-8">Latency Spectrum</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyDist}>
                <Bar dataKey="count" fill="#a0ffc3">
                  {latencyDist.map((_, index) => (
                    <Cell key={index} fill={index === 3 ? '#a0ffc3' : 'rgba(160,255,195,0.1)'} stroke={index === 3 ? 'none' : 'rgba(255,255,255,0.05)'} />
                  ))}
                </Bar>
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-500 uppercase tracking-widest">P99 Latency</span>
              <span className="text-secondary">24.5ms</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-500 uppercase tracking-widest">Avg Response</span>
              <span className="text-primary">8.2ms</span>
            </div>
          </div>
        </div>

        {/* Geo Distribution & Attack Vectors row */}
        <div className="col-span-12 lg:col-span-8 glass-panel relative overflow-hidden h-96">
          <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <h4 className="text-2xl font-headline italic text-on-surface">Geo-Distribution</h4>
            <p className="text-[10px] uppercase font-label tracking-widest text-slate-500 mt-1">Traffic Origin Heatmap</p>
          </div>
          <div className="w-full h-full p-8 pt-20">
            <WorldMap geoData={geoData} />
          </div>
        </div>

        {/* Attack Vector List */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-8 flex flex-col">
          <h4 className="text-2xl font-headline italic text-on-surface mb-8">Attack Vectors</h4>
          <div className="flex-1 space-y-6">
            {attackBreakdown.slice(0, 5).map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
                  <span className="text-slate-400">{item.name}</span>
                  <span className={i === 0 ? 'text-primary' : i === 1 ? 'text-secondary' : 'text-on-surface'}>
                    {((item.count / attackBreakdown.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-slate-500'}`} 
                    style={{ width: `${(item.count / Math.max(...attackBreakdown.map(a => a.count))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info Log */}
      <section className="mt-12 bg-black/40 p-6 border border-white/5 font-mono">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Live Infrastructure Logs</span>
          </div>
          <span className="text-[9px] text-slate-600">CONNECTED: US-EAST-01-CLUSTER</span>
        </div>
        <div className="space-y-2 text-[10px]">
          <p className="text-slate-500"><span className="text-primary opacity-50">[14:22:01]</span> INBOUND: Handshake initialized from 192.168.1.1 (Stockholm, SE)</p>
          <p className="text-slate-500"><span className="text-primary opacity-50">[14:22:03]</span> DECRYPT: Packet integrity verified via TLS 1.3 - ECDHE-RSA</p>
          <p className="text-secondary"><span className="text-secondary opacity-80">[14:22:04]</span> ALERT: Unusual request pattern detected on /v1/auth endpoint</p>
          <p className="text-slate-500"><span className="text-primary opacity-50">[14:22:08]</span> STATUS: Request cleared. Latency: 4.2ms</p>
        </div>
      </section>
    </div>
  );
}
