
import React from 'react';
import { 
  LayoutGrid, 
  FolderOpen,
  CheckSquare,
  Settings,
  BrainCircuit,
  Server,
  ShieldCheck,
  X
} from 'lucide-react';
import { AnalysisStatus } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  status: AnalysisStatus;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, status, isOpen, onClose }) => {
  const navItems = [
    { id: 'projects', label: 'Home', icon: LayoutGrid },
    { id: 'projects_list', label: 'Projects', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (viewId: string) => {
    // Mapping internal IDs to view states
    if (viewId === 'projects' || viewId === 'projects_list') onNavigate('projects');
    else onNavigate(viewId);
    
    onClose();
  };

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen md:flex md:flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          
          {/* Header Sidebar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('projects')}>
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Nova<span className="text-cyan-400">App</span></h1>
            </div>
            {/* Close Button Mobile */}
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Menu Principal */}
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          <nav className="space-y-1 mb-8">
            {navItems.map((item) => {
              const isActive = (currentView === 'projects' && (item.id === 'projects' || item.id === 'projects_list'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Menu Configuration */}
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">General</div>
          <nav className="space-y-1">
            {bottomItems.map((item) => {
               const isActive = currentView === item.id;
               return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
               );
            })}
          </nav>

          {/* Footer Status */}
          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-950 p-2 rounded border border-slate-800">
                <Server className="w-3 h-3" />
                <span className="truncate">
                  n8n: {status === 'initializing' ? 'Connecting...' : status === 'error' ? 'Offline' : 'Online'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs px-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>v2.0.4 • Mockup UI</span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};
