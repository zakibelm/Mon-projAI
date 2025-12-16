import React from 'react';
import { Layers, Settings, Menu } from 'lucide-react';
import { Project, AnalysisStatus } from '../types';

interface HeaderProps {
  project: Project | null;
  status: AnalysisStatus;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ project, status, onMenuClick }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur flex items-center px-4 md:px-8 justify-between z-10 sticky top-0 w-full">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-indigo-400" />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-slate-200">Decision Support Console</h2>
            {project && (
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Project ID: <span className="font-mono text-slate-400">{project.id.substring(0, 8)}...</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300 ${
          status === 'analyzing' || status === 'initializing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 
          status === 'error' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'analyzing' || status === 'initializing' ? 'bg-indigo-400 animate-pulse' : 
            status === 'error' ? 'bg-amber-400' :
            'bg-emerald-400'
          }`} />
          <span className="hidden sm:inline">
            {status === 'initializing' ? 'Connecting...' : 
             status === 'idle' ? 'System Ready' : 
             status === 'analyzing' ? 'Processing...' : 
             status === 'error' ? 'Offline Mode' : 'Done'}
          </span>
          <span className="sm:hidden">
            {status === 'analyzing' ? 'Busy' : status === 'error' ? 'Offline' : 'Ready'}
          </span>
        </div>
      </div>
    </header>
  );
};