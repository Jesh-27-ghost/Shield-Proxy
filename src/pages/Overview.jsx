import { useState, useEffect, useRef } from 'react';
import {
  generateThreatFeed, generateStats, generateThreatDistribution,
  generateVolumeData, generateThreatLog,
} from '../data/mockData';

export default function Overview() {
  const [stats, setStats] = useState(generateStats());
  const [threats, setThreats] = useState(generateThreatFeed(15));
  const [distribution, setDistribution] = useState(generateThreatDistribution());
  const [isLive, setIsLive] = useState(true);

  // Simulate live WebSocket updates
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newThreat = generateThreatLog();
      setThreats(prev => [newThreat, ...prev.slice(0, 14)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Refresh stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateStats());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const blockRateValue = parseFloat(stats.blockRate);
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (blockRateValue / 100) * circumference;

  return (
    <div className="fade-in-up">
      {/* Hero Header Section */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-headline italic font-light text-on-surface leading-tight mb-2">
            The Vault <span className="text-slate-500 opacity-50">Overview</span>
          </h2>
          <p className="text-sm font-body text-on-surface-variant tracking-wider max-w-lg">
            Active protocol surveillance is engaged. Your security perimeter is currently mitigating {stats.totalRequests.toLocaleString()} concurrent vector explorations.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-label text-slate-500 tracking-[0.4em] uppercase mb-1">Last Sync</div>
          <div className="text-xl font-body text-secondary font-light">
            {new Date().toLocaleTimeString('en-US', { hour12: false })} <span className="text-[10px] opacity-50">UTC</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Large Stat Highlight (Bento Item 1) */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-8 flex flex-col justify-between min-h-[400px]">
          <div>
            <span className="text-[10px] font-label tracking-widest text-primary uppercase mb-8 block">Global Efficiency</span>
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center mt-4">
              {/* Circular Ring Visual */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle className="text-white/5" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="2"></circle>
                <circle 
                  className="text-primary transition-all duration-1000" 
                  cx="96" cy="96" fill="transparent" r="88" 
                  stroke="currentColor" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeWidth="6"
                  strokeLinecap="square"
                ></circle>
              </svg>
              <div className="text-center">
                <span className="text-5xl font-headline italic block text-on-surface">{stats.blockRate}%</span>
                <span className="text-[10px] font-label tracking-widest text-slate-500 uppercase">Block Rate</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant font-light leading-relaxed mt-8">
            The current block rate indicates an {stats.threatsBlockedDelta}% increase in prophylactic interceptions compared to the previous 24-hour cycle.
          </p>
        </div>

        {/* Secondary Stats Grid (Bento Item 2) */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
          {/* Stat Card 1 */}
          <div className="glass-panel p-8 hover:bg-surface-container-high transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-primary text-3xl opacity-50 group-hover:opacity-100 transition-opacity">security</span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 tracking-tighter">+{stats.threatsBlockedDelta}%</span>
            </div>
            <div className="text-4xl font-body font-light mb-1">{stats.threatsBlocked.toLocaleString()}</div>
            <div className="text-xs font-label uppercase tracking-widest text-slate-500">Threats Blocked</div>
          </div>
          {/* Stat Card 2 */}
          <div className="glass-panel p-8 hover:bg-surface-container-high transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl opacity-50 group-hover:opacity-100 transition-opacity">group</span>
              <span className="text-[10px] text-secondary bg-secondary/10 px-2 py-1 tracking-tighter">LIVE</span>
            </div>
            <div className="text-4xl font-body font-light mb-1">{stats.activeClients}</div>
            <div className="text-xs font-label uppercase tracking-widest text-slate-500">Active Clients</div>
          </div>
          {/* Stat Card 3 */}
          <div className="glass-panel p-8 hover:bg-surface-container-high transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-slate-400 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">speed</span>
              <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 tracking-tighter">{stats.avgLatencyDelta}ms</span>
            </div>
            <div className="text-4xl font-body font-light mb-1">{stats.avgLatency}ms</div>
            <div className="text-xs font-label uppercase tracking-widest text-slate-500">Avg Latency</div>
          </div>
          {/* Stat Card 4 */}
          <div className="glass-panel p-8 hover:bg-surface-container-high transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-primary text-3xl opacity-50 group-hover:opacity-100 transition-opacity">verified_user</span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 tracking-tighter">OPTIMAL</span>
            </div>
            <div className="text-4xl font-body font-light mb-1">99.9%</div>
            <div className="text-xs font-label uppercase tracking-widest text-slate-500">System Integrity</div>
          </div>
        </div>

        {/* Live Interception Feed (Bento Item 3) */}
        <div className="col-span-12 lg:col-span-8 glass-panel overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-headline italic text-2xl">Live Interception Feed</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Intercepted
              </span>
              <span className={`flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-error ${isLive ? 'animate-pulse' : ''}`}></span> {isLive ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar max-h-[400px]">
            <table className="w-full text-left font-body">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-slate-400 sticky top-0 z-10">
                <tr>
                  <th className="px-8 py-4 font-normal">Timestamp</th>
                  <th className="px-8 py-4 font-normal">Classification</th>
                  <th className="px-8 py-4 font-normal">Source Vector</th>
                  <th className="px-8 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {threats.map((t, i) => (
                  <tr key={t.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-4 font-light text-slate-500">{t.timeStr}</td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-widest ${
                        t.severity === 'critical' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                      }`}>
                        {t.category}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-mono text-slate-300">{t.source}</td>
                    <td className={`px-8 py-4 ${t.status === 'blocked' ? 'text-primary' : 'text-error'}`}>
                      {t.status === 'blocked' ? 'NULLIFIED' : 'DETOURED'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Threat Distribution (Bento Item 4) */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-8">
          <h3 className="font-headline italic text-2xl mb-8">Threat Vectors</h3>
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Simulated Donut Chart */}
            <div className="absolute inset-0 rounded-full border-[16px] border-surface-container-high opacity-40"></div>
            <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-[16px] border-secondary border-b-transparent border-l-transparent -rotate-12"></div>
            <div className="text-center z-10">
              <span className="text-3xl font-headline block text-on-surface">58%</span>
              <span className="text-[9px] font-label tracking-widest text-slate-500 uppercase">External Origin</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {distribution.slice(0, 3).map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2" style={{ backgroundColor: i === 0 ? '#a0ffc3' : i === 1 ? '#00e3fd' : '#ffffff33' }}></div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-300">{item.name}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: i === 0 ? '#a0ffc3' : i === 1 ? '#00e3fd' : '#94a3b8' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Context Bar */}
      <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-8">
        <div className="flex gap-8">
          <div>
            <span className="text-[9px] font-label text-slate-500 uppercase tracking-widest">Node Region</span>
            <div className="text-xs text-on-surface mt-1">EU-CENTRAL-1 (REDACTED)</div>
          </div>
          <div>
            <span className="text-[9px] font-label text-slate-500 uppercase tracking-widest">Enforcement Mode</span>
            <div className="text-xs text-primary mt-1 uppercase tracking-tighter">Strict Isolation</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors">Export Log</button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors">Archive State</button>
        </div>
      </div>
    </div>
  );
}
