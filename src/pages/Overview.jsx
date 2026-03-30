import { useState, useEffect } from 'react';
import {
  generateThreatFeed, generateStats, generateThreatDistribution,
  generateThreatLog,
} from '../data/mockData';

export default function Overview() {
  const [stats, setStats] = useState(generateStats());
  const [threats, setThreats] = useState(generateThreatFeed(15));
  const [distribution] = useState(generateThreatDistribution());
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

  // SVG donut chart values
  const circumference = 2 * Math.PI * 44;
  const injectionDash = circumference * 0.58;
  const spoofingDash = circumference * 0.29;
  const overflowDash = circumference * 0.13;

  return (
    <div className="fade-in-up">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline text-4xl text-on-surface mb-2">Network Sovereignty Overview</h2>
            <p className="font-body text-slate-400 text-sm max-w-xl">
              Real-time surveillance and interception metrics for the ShieldProxy Vanguard array. High-fidelity data stream active.
            </p>
          </div>
          <div className="text-right">
            <p className="font-label text-[10px] text-secondary-fixed-dim uppercase tracking-[0.2em]">Node Location</p>
            <p className="font-body text-xl font-light text-on-surface">ZURICH_VAULT_01</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Global Efficiency */}
        <div className="glass-panel p-6 emerald-glow relative overflow-hidden group">
          <div className="light-cap absolute top-0 left-0"></div>
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-4">Global Efficiency</p>
          <div className="flex items-baseline gap-2">
            <span className="font-body text-3xl font-bold text-primary-container">{blockRateValue}%</span>
            <span className="text-xs text-primary/60 font-medium">Overall Block Rate</span>
          </div>
          <div className="mt-4 h-1 w-full bg-surface-container-highest">
            <div className="h-full bg-primary-container transition-all duration-1000" style={{ width: `${blockRateValue}%` }}></div>
          </div>
        </div>

        {/* Threats Neutralized */}
        <div className="glass-panel p-6 emerald-glow relative overflow-hidden group">
          <div className="light-cap absolute top-0 left-0 opacity-40"></div>
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-4">Threats Neutralized</p>
          <div className="flex items-baseline gap-2">
            <span className="font-body text-3xl font-bold text-on-surface">{stats.threatsBlocked.toLocaleString()}</span>
            <span className="material-symbols-outlined text-primary-container text-sm">trending_up</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Cumulative 24h Period</p>
        </div>

        {/* Array Latency */}
        <div className="glass-panel p-6 emerald-glow relative overflow-hidden group">
          <div className="light-cap absolute top-0 left-0 opacity-40"></div>
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-4">Array Latency</p>
          <div className="flex items-baseline gap-2">
            <span className="font-body text-3xl font-bold text-secondary-fixed-dim">{stats.avgLatency}ms</span>
            <span className="text-xs text-secondary-fixed-dim/60 font-medium">AVG</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Nominal Performance Range</p>
        </div>

        {/* Sovereign Nodes */}
        <div className="glass-panel p-6 emerald-glow relative overflow-hidden group">
          <div className="light-cap absolute top-0 left-0 opacity-40"></div>
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-4">Sovereign Nodes</p>
          <div className="flex items-baseline gap-2">
            <span className="font-body text-3xl font-bold text-on-surface">{stats.activeClients}</span>
            <span className="text-xs text-slate-400 font-medium">ACTIVE</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">High-Security Clusters</p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Interception Feed (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-headline text-2xl text-on-surface">Live Interception Feed</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className="text-[10px] font-label text-slate-500 uppercase tracking-widest hover:text-primary-container transition-colors"
              >
                Auto-Refresh: {isLive ? 'ON' : 'OFF'}
              </button>
              <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-emerald-300 transition-colors">filter_list</span>
            </div>
          </div>

          <div className="glass-panel overflow-hidden">
            <table className="w-full text-left font-body text-sm">
              <thead className="bg-surface-container-high/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 font-medium">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 font-medium">Classification</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 font-medium">Source Vector</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {threats.slice(0, 8).map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 font-light">{t.timeStr}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 border text-[10px] rounded-sm ${
                        t.severity === 'critical' ? 'border-error/30 text-error bg-error/5' :
                        t.severity === 'high' ? 'border-tertiary-fixed-dim/30 text-tertiary-fixed-dim bg-tertiary-fixed-dim/5' :
                        'border-secondary-fixed-dim/30 text-secondary-fixed-dim bg-secondary-fixed-dim/5'
                      }`}>
                        {t.category.toUpperCase().replace(/\s/g, '_')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface">{t.source}</td>
                    <td className={`px-6 py-4 flex items-center gap-2 ${t.status === 'blocked' ? 'text-primary-container' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'blocked' ? 'bg-primary-container' : 'bg-slate-600'}`}></span>
                      {t.status === 'blocked' ? 'BLOCKED' : 'PASSED'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Threat Vectors (1/3 width) */}
        <div className="space-y-6">
          <div className="px-2">
            <h3 className="font-headline text-2xl text-on-surface">Threat Vectors</h3>
          </div>

          <div className="glass-panel p-8 flex flex-col items-center justify-center relative aspect-square">
            <div className="light-cap absolute top-0 left-0 opacity-20"></div>

            {/* Circular Chart */}
            <div className="relative w-48 h-48 rounded-full border-[12px] border-surface-container-highest flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="44" stroke="#00ff9d" strokeDasharray={`${injectionDash} ${circumference}`} strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="44" stroke="#00e3fd" strokeDasharray={`${spoofingDash} ${circumference}`} strokeDashoffset={`-${injectionDash}`} strokeWidth="12"></circle>
                <circle cx="50" cy="50" fill="transparent" r="44" stroke="#ffe17a" strokeDasharray={`${overflowDash} ${circumference}`} strokeDashoffset={`-${injectionDash + spoofingDash}`} strokeWidth="12"></circle>
              </svg>
              <div className="text-center">
                <p className="font-body text-3xl font-bold text-on-surface">276</p>
                <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest">Active Hits</p>
              </div>
            </div>

            <div className="mt-8 w-full space-y-3">
              <div className="flex justify-between items-center text-xs font-body">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="text-slate-300">Injection Attacks</span>
                </div>
                <span className="text-on-surface font-semibold">58%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-body">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="text-slate-300">Identity Spoofing</span>
                </div>
                <span className="text-on-surface font-semibold">29%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-body">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                  <span className="text-slate-300">Buffer Overflow</span>
                </div>
                <span className="text-on-surface font-semibold">13%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Intelligence Footer */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="glass-panel p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h4 className="font-headline text-3xl text-primary-container mb-4">Neural Defense Log</h4>
          <p className="font-body text-slate-400 leading-relaxed text-sm">
            ShieldProxy's autonomous sentry has detected a coordinated pattern of low-velocity pings originating from Cluster Delta. Defensive posture has been elevated to Level 4. Monitoring latency fluctuations in the Zurich pipeline for potential egress masking.
          </p>
        </div>

        <div className="flex flex-col gap-6 pl-0 md:pl-12">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-emerald-400">shield_with_heart</span>
            <div>
              <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest">Sentry Integrity</p>
              <p className="font-body text-lg text-on-surface">99.999% Fault Tolerant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-emerald-400">lock_open</span>
            <div>
              <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest">Current Key Rotation</p>
              <p className="font-body text-lg text-on-surface">14 Minutes Remaining</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
