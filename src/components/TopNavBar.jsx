import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <header className="flex justify-between items-center px-6 h-16 w-full sticky top-0 z-40 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none font-['Inter'] antialiased border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">ShieldProxy</span>
        <div className="hidden md:flex gap-6">
          <Link className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors px-1 py-4" to="/overview">Overview</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors px-1 py-4" to="/clients">Clients</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors px-1 py-4" to="/alerts">Alerts</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="pl-10 pr-4 py-1.5 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary w-64 text-sm" placeholder="Search resources..." type="text"/>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="ml-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold active:scale-95 duration-150">New Policy</button>
        </div>
      </div>
    </header>
  );
}
