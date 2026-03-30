import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [rememberNode, setRememberNode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Both ID and Password are required.');
      return;
    }
    // Simulate auth
    setError('');
    navigate('/overview');
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body min-h-screen overflow-x-hidden relative wave-bg">
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

      {/* Main Content */}
      <div className="fixed inset-0 z-[-1] opacity-10">
        <img
          className="w-full h-full object-cover grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7Jd-L0clQYTrnmk2kBxu_X_ScSyUDja8rOPxiUpRB24SF4c8WtiBxhe0hG3-mtfVN2FP84vGteMeAhHbU3tZc6oA_UjhmSYsSYYTCOpmva3aYtSdJDGwzXl7EfUzjdEGYRolc6b1XN1pEcZqlmwQRUgHolFQo5cdyAIv0tEAjhrxJ43o_Bh-WHXlZwY2Y9MRGjFvUYcHGsbhvm5A6XNWAMUnNCTMKmIJUvXy2UyDD7xuCtWiWdJI1d2Pf95QQrvyk_z07fCBZhpo"
          alt="Abstract dark technical background"
        />
      </div>

      <main className="relative z-10 flex min-h-screen">
        {/* Left Side: Narrative */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 xl:p-24 border-r border-outline-variant/10">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-container">
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
              </div>
              <span className="font-headline text-2xl tracking-tight text-primary">ShieldProxy</span>
            </div>

            <div className="space-y-12 max-w-xl">
              <h1 className="font-headline text-5xl xl:text-6xl text-primary leading-[1.1]">
                Every Indian startup is building AI chatbots. None of them are secure.
              </h1>
              <p className="font-headline text-2xl text-on-surface-variant leading-relaxed">
                ShieldProxy is the missing security layer. We protect your LLMs from prompt injection, PII leakage, and jailbreaking in real-time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-12 border-t border-outline-variant/15">
            {/* Problem Statement */}
            <div className="glass-panel p-6 rounded-lg border-l-2 border-error/40 group hover:bg-surface-container-high/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-error text-xl">warning</span>
                <h3 className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-error">Problem Statement</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Modern LLMs are inherently vulnerable to prompt injections and jailbreaks, exposing enterprise IP to unforeseen risks.
              </p>
            </div>

            {/* Our Solution */}
            <div className="glass-panel p-6 rounded-lg border-l-2 border-primary-container/40 group hover:bg-surface-container-high/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary-container text-xl">verified_user</span>
                <h3 className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-primary-container">Our Solution</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                A high-performance reverse proxy providing real-time prophylactic interception and sanitization of neural vectors.
              </p>
            </div>

            {/* USP */}
            <div className="glass-panel p-6 rounded-lg border-l-2 border-tertiary-fixed-dim/40 group hover:bg-surface-container-high/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">star</span>
                <h3 className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-tertiary-fixed-dim">Unique Selling Proposition</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Sub-50ms latency coupled with proprietary Hinglish detection logic, optimized for the nuances of Indian AI markets.
              </p>
            </div>

            {/* Impact */}
            <div className="glass-panel p-6 rounded-lg border-l-2 border-secondary-container/40 group hover:bg-surface-container-high/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary-container text-xl">bolt</span>
                <h3 className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-secondary-container">Operational Impact</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                99.9% reduction in prompt injection exploits with zero-config deployment across any cloud environment.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Vault Entry */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-container">
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
              </div>
              <span className="font-headline text-2xl tracking-tight text-primary">ShieldProxy</span>
            </div>

            <div className="glass-panel border-t border-primary-container/20 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,255,157,0.03)] rounded-lg">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary-container">Vault Connection Active</span>
                </div>
                <h2 className="font-headline text-3xl text-primary mb-2">Vault Entry</h2>
                <p className="text-on-surface-variant text-sm font-label">Authorized Personnel Only</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-error/10 border border-error/20 rounded text-error text-[10px] uppercase tracking-widest font-label font-bold text-center">
                    {error}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="relative group">
                    <label className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant group-focus-within:text-primary-container transition-colors" htmlFor="credential-id">
                      Credential ID / Username
                    </label>
                    <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary-container transition-all py-2">
                      <span className="material-symbols-outlined text-outline group-focus-within:text-primary-container text-lg mr-3">person</span>
                      <input
                        id="credential-id"
                        autoComplete="username"
                        required
                        className="bg-transparent border-none focus:ring-0 w-full text-primary placeholder:text-outline/40 font-label tracking-wider"
                        placeholder="operator@shieldproxy.net"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant group-focus-within:text-primary-container transition-colors" htmlFor="access-key">
                      Access Key
                    </label>
                    <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary-container transition-all py-2">
                      <span className="material-symbols-outlined text-outline group-focus-within:text-primary-container text-lg mr-3">vpn_key</span>
                      <input
                        id="access-key"
                        autoComplete="current-password"
                        required
                        className="bg-transparent border-none focus:ring-0 w-full text-primary placeholder:text-outline/40 font-label tracking-widest"
                        placeholder="••••••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-label">
                  <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setRememberNode(!rememberNode)}>
                    <div className="w-4 h-4 border border-outline-variant group-hover:border-primary-container transition-colors flex items-center justify-center">
                      {rememberNode && <div className="w-2 h-2 bg-primary-container"></div>}
                    </div>
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Remember Node</span>
                  </label>
                  {!isRegistering && (
                    <a className="text-secondary-fixed-dim hover:text-secondary-container transition-colors" href="#">Emergency Reset</a>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary font-label font-bold uppercase tracking-widest rounded-sm hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition-all active:scale-95 overflow-hidden"
                >
                  <span>{isRegistering ? 'CREATE VAULT ACCOUNT' : 'INITIALIZE DEPLOYMENT'}</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">{isRegistering ? 'person_add' : 'bolt'}</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </form>

              <div className="mt-8 text-center border-t border-outline-variant/10 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                  className="text-[10px] uppercase tracking-widest text-outline hover:text-primary-container transition-colors font-label"
                >
                  {isRegistering ? 'Back to Vault Entry' : 'New operator? Request Access / Register'}
                </button>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                  <span className="font-label text-[10px] uppercase text-outline/50 tracking-widest">Protocol Impact</span>
                  <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-surface-container-high rounded border border-outline-variant/5">
                    <p className="font-label text-[10px] text-on-surface-variant uppercase">Attack Mitigation</p>
                    <p className="font-headline text-lg text-primary">99.9%</p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded border border-outline-variant/5">
                    <p className="font-label text-[10px] text-on-surface-variant uppercase">Daily Audits</p>
                    <p className="font-headline text-lg text-primary">2.4M+</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-8 text-[10px] font-label uppercase tracking-[0.2em] text-outline/60">
              <a className="hover:text-primary transition-colors" href="#">Security Protocol</a>
              <a className="hover:text-primary transition-colors" href="#">Node Network</a>
              <a className="hover:text-primary transition-colors" href="#">Vanguard Level</a>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Corner Accents */}
      <div className="fixed top-0 right-0 p-8 z-50 pointer-events-none opacity-40 lg:opacity-100">
        <div className="font-label text-[10px] tracking-[0.3em] text-secondary-fixed-dim flex flex-col items-end gap-1">
          <span>SECURE TERMINAL V4.2.0</span>
          <span className="text-on-surface-variant">LOC: BENGALURU_HUB</span>
        </div>
      </div>
    </div>
  );
}
