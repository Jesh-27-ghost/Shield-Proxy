import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/overview');
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary selection:text-on-primary min-h-screen overflow-hidden font-body">
      {/* Background Decor */}
      <div className="fixed inset-0 grid-bg z-0 opacity-40"></div>
      <div className="fixed top-[-20%] right-[-20%] w-[80%] h-[80%] spectral-glow z-0 opacity-40 animate-glow"></div>
      
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 lg:px-24 py-8 bg-surface/50 backdrop-blur-md border-b border-white/5 lg:border-none lg:bg-transparent">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-3xl font-bold">shield</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl italic font-headline text-on-surface font-semibold tracking-tighter leading-none">ShieldProxy</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60 font-body">V-01 Secure Access</span>
          </div>
        </div>
        <nav className="hidden lg:flex gap-12 items-center pr-[50%] lg:pr-12">
           {/* Space holder for the 50/50 split balance if needed, but we can just keep them on the right or left */}
        </nav>
      </header>

      <main className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full z-10">
        {/* Left Section: Value Proposition */}
        <section className="flex flex-col justify-center px-12 lg:px-24 py-32 border-r border-white/5 overflow-y-auto no-scrollbar">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-4xl lg:text-6xl font-headline leading-[1.1] text-on-surface mb-8 italic">
              Every Indian startup is building AI chatbots. <span className="text-primary-container not-italic opacity-90">None of them are secure.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-on-surface-variant font-light mb-12 leading-relaxed border-b border-white/5 pb-8">
              ShieldProxy is the missing security layer. We intercept, sanitize, and authorize every prompt before it hits your LLM.
            </p>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-12">
              <div className="group">
                <div className="flex items-center gap-3 text-primary mb-3">
                   <span className="material-symbols-outlined text-xl">warning</span>
                   <h3 className="text-[10px] uppercase font-bold tracking-[0.3em]">Our Problem Statement</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                   Modern LLMs are inherently vulnerable to prompt injections and jailbreaks, exposing enterprise IP to unforeseen risks.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 text-secondary mb-3">
                   <span className="material-symbols-outlined text-xl">verified_user</span>
                   <h3 className="text-[10px] uppercase font-bold tracking-[0.3em]">Our Solution</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                   A high-performance reverse proxy providing real-time prophylactic interception and sanitization of neural vectors.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 text-tertiary mb-3">
                   <span className="material-symbols-outlined text-xl">star</span>
                   <h3 className="text-[10px] uppercase font-bold tracking-[0.3em]">Unique Selling Proposition</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                   Sub-50ms latency coupled with proprietary Hinglish detection logic, optimized for the nuances of Indian AI markets.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 text-primary mb-3">
                   <span className="material-symbols-outlined text-xl">bolt</span>
                   <h3 className="text-[10px] uppercase font-bold tracking-[0.3em]">Operational Impact</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                   99.9% reduction in prompt injection successful exploits with zero-config deployment across any cloud environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Login Sidebar */}
        <section className="flex flex-col justify-center items-center px-12 glass-panel relative z-20 pt-12 h-screen overflow-y-auto no-scrollbar border-l border-white/5">
          <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 my-auto">
             {/* Secondary Nav inside the sidebar for better UX in 50/50 split */}
             <div className="flex gap-8 mb-12 border-b border-white/5 pb-6">
                <a className="text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Infr</a>
                <a className="text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Comp</a>
                <a className="text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Net</a>
             </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-headline italic text-on-surface">Vault Entry</h2>
              <p className="text-xs text-on-surface-variant uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold group-focus-within:text-primary transition-colors">Credential ID</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary text-on-surface font-body transition-all" 
                    placeholder="admin.001" 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold group-focus-within:text-primary transition-colors">Access Key</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary text-on-surface font-body transition-all" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-4 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4 text-xs uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_20px_rgba(160,255,195,0.4)] transition-all duration-300"
                >
                  Authorize Access
                </button>
                <button 
                  type="button"
                  className="w-full border border-white/10 text-on-surface py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-all duration-300"
                >
                  Request Decryption
                </button>
              </div>
              
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">
                <a className="hover:text-primary transition-colors" href="#">Lost Access?</a>
                <span className="opacity-20">|</span>
                <a className="hover:text-primary transition-colors" href="#">Security Protocol</a>
              </div>
            </form>
          </div>
        </section>

        {/* Mobile Login Action */}
        <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-4rem)]">
          <button 
            onClick={handleSubmit}
            className="w-full bg-primary text-on-primary py-5 text-sm uppercase tracking-widest font-bold shadow-2xl"
          >
            Open Secure Vault
          </button>
        </div>
      </main>

      {/* Decorative Image Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
        <img 
          className="w-full h-full object-cover grayscale brightness-50 contrast-125" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo5Obhl3CWC-y-u0En4pYjTkZBe0EHxoIN8UsQvcH7_YAgTt-M9Qx1y831ON02dIEP9-fbKSpmRk2QyGtwGHfLYbYm0yyPw4U_3WqE48mKuPWIF1MiXfDYt45SlsGKt-jwqC_6p3_sN3dnWps-q1AnjEwfq8WuwiBTZCn8efAjDkfbmgKcRzLw47AUmsfXtzzzJjDAa9QMaRO9iFZycOcosFEhlRLS50uKIsO2Wl4vxMMUXw4pOMdPrtcgptJ8Nb_xH0LSFKntrzs" 
          alt="Security background" 
        />
      </div>
    </div>
  );
}
