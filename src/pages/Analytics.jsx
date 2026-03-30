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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-highest border border-outline-variant/20 p-4 backdrop-blur-xl rounded">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
        {label || payload[0].payload.name || payload[0].payload.range}
      </span>
      <span className="text-sm font-headline text-on-surface">
        {payload[0].value?.toLocaleString()} {payload[0].dataKey === 'requests' ? 'Requests' : 'Anomalies'}
      </span>
    </div>
  );
}

export default function Analytics() {
  const [volumeData] = useState(generateVolumeData(24));
  const [attackBreakdown] = useState(generateAttackBreakdown());
  const [latencyDist] = useState(generateLatencyDistribution());
  const [geoData] = useState(generateGeoData());
  const [timeRange, setTimeRange] = useState('24H');

  const maxGeoAttacks = useMemo(() => Math.max(...geoData.map(g => g.attacks)), [geoData]);

  return (
    <div className="fade-in-up">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl border-t border-primary-container/20">
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Throughput</p>
            <h3 className="font-headline text-3xl text-primary">1.24 <span className="text-sm font-label text-primary-container">TB/s</span></h3>
            <div className="mt-4 h-1 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-[72%] shadow-[0_0_8px_#00ff9d]"></div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border-t border-secondary-container/20">
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Active Nodes</p>
            <h3 className="font-headline text-3xl text-primary">8,422</h3>
            <p className="text-[10px] text-secondary-container font-label mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +12% vs last hour
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border-t border-error/20">
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Threats Neutralized</p>
            <h3 className="font-headline text-3xl text-error">42.8k</h3>
            <div className="flex gap-1 mt-4">
              <div className="w-full h-1 bg-error opacity-20"></div>
              <div className="w-full h-1 bg-error opacity-40"></div>
              <div className="w-full h-1 bg-error opacity-80"></div>
              <div className="w-full h-1 bg-error opacity-20"></div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border-t border-tertiary-fixed/20">
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Global Health</p>
            <h3 className="font-headline text-3xl text-primary">99.98<span className="text-sm font-label text-tertiary-fixed">%</span></h3>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00ff9d]"></span>
              <span className="text-[10px] font-label text-outline tracking-wider">SECURE_ESTABLISHED</span>
            </div>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Request Volume Graph */}
          <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl p-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-headline text-2xl mb-1">Request Volume</h2>
                <p className="font-label text-xs text-outline tracking-wide">Temporal traffic analysis across 24-hour cycle</p>
              </div>
              <div className="flex gap-4">
                {['24H', '7D', '30D'].map(r => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`text-[10px] font-label pb-1 transition-colors ${
                      timeRange === r ? 'text-primary-container border-b border-primary-container' : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#849587' }} axisLine={false} tickLine={false} dy={10} interval={4} />
                  <YAxis tick={{ fontSize: 9, fill: '#849587' }} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00ff9d', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="requests" stroke="#00ff9d" fill="url(#areaGrad1)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="blocked" stroke="#ffb4ab" fill="transparent" strokeWidth={1} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attack Vector Breakdown */}
          <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-8">
            <h2 className="font-headline text-2xl mb-8">Attack Vectors</h2>
            <div className="space-y-8">
              {attackBreakdown.slice(0, 4).map((item, i) => {
                const total = attackBreakdown.reduce((acc, curr) => acc + curr.count, 0);
                const pct = ((item.count / total) * 100).toFixed(0);
                const colors = ['primary-container', 'secondary-container', 'tertiary-fixed', 'outline'];
                const glows = ['shadow-[0_0_10px_#00ff9d]', 'shadow-[0_0_10px_#00e3fd]', '', ''];
                return (
                  <div key={i}>
                    <div className="flex justify-between font-label text-xs uppercase tracking-wider mb-3">
                      <span className="text-on-surface">{item.name}</span>
                      <span className={`text-${colors[i]}`}>{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full">
                      <div className={`h-full bg-${colors[i]} ${glows[i]} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-4 border border-outline-variant/20 rounded bg-white/5">
              <p className="text-[10px] font-label text-outline-variant italic leading-relaxed">
                "AI-driven anomaly detection suggests a 14% increase in sophisticated obfuscation patterns within SQL payloads over the last 6 hours."
              </p>
            </div>
          </div>

          {/* Geo Distribution */}
          <div className="col-span-12 lg:col-span-7 glass-panel rounded-xl p-8 overflow-hidden relative min-h-[400px]">
            <div className="absolute top-8 left-8 z-10">
              <h2 className="font-headline text-2xl mb-1">Geo-Distribution</h2>
              <p className="font-label text-xs text-outline tracking-wide">Global threat mitigation origins</p>
            </div>
            <div className="w-full h-full pt-16">
              <WorldMap geoData={geoData} />
            </div>

            {/* Legend */}
            <div className="absolute bottom-8 right-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="text-[9px] font-label uppercase tracking-widest text-outline">High Intensity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="text-[9px] font-label uppercase tracking-widest text-outline">Traffic Surge</span>
              </div>
            </div>
          </div>

          {/* Latency Distribution */}
          <div className="col-span-12 lg:col-span-5 glass-panel rounded-xl p-8">
            <h2 className="font-headline text-2xl mb-2">Latency Distribution</h2>
            <p className="font-label text-xs text-outline tracking-wide mb-8">Edge-to-Origin response times (ms)</p>

            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyDist}>
                  <Bar dataKey="count" fill="#00ff9d">
                    {latencyDist.map((_, index) => (
                      <Cell
                        key={index}
                        fill={index === 3 ? '#00ff9d' : 'rgba(0,255,157,0.15)'}
                        stroke={index === 3 ? 'none' : 'rgba(255,255,255,0.03)'}
                      />
                    ))}
                  </Bar>
                  <Tooltip content={<CustomTooltip />} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between font-label text-[9px] text-outline tracking-tighter pt-2 border-t border-outline-variant/10 mt-4">
              <span>0ms</span>
              <span>12ms (AVG)</span>
              <span>45ms</span>
              <span>100ms+</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-high rounded border-l-2 border-primary-container">
                <p className="font-label text-[10px] text-outline uppercase mb-1">P95 Latency</p>
                <p className="font-headline text-xl text-primary">18.4ms</p>
              </div>
              <div className="p-4 bg-surface-container-high rounded border-l-2 border-secondary-container">
                <p className="font-label text-[10px] text-outline uppercase mb-1">Packet Loss</p>
                <p className="font-headline text-xl text-primary">0.002%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Security Prompt */}
      <div className="fixed bottom-8 right-8 glass-panel p-4 rounded-xl border border-primary-container/20 shadow-2xl max-w-xs z-50">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00ff9d]"></div>
          <div>
            <h4 className="font-headline text-sm text-primary">Sentry AI: Optimization Tip</h4>
            <p className="font-label text-[11px] text-outline mt-1 leading-relaxed">Latency in Southeast Asia regions is currently 12% above baseline. Consider deploying a new edge node in Singapore.</p>
            <div className="mt-3 flex gap-3">
              <button className="text-[10px] font-label font-bold text-primary-container uppercase tracking-widest hover:underline">Execute</button>
              <button className="text-[10px] font-label font-bold text-outline uppercase tracking-widest hover:text-on-surface">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
