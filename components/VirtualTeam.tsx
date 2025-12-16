import React from 'react';
import { VIRTUAL_AGENTS } from '../constants';
import { TrendingUp, Box, Users, ShieldAlert, Truck, Info } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
};

export const VirtualTeam: React.FC = () => {
  return (
    <div className="w-full animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-slate-200">
          Orchestrator Virtual Board
          <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">5 Specialized Agents</span>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {VIRTUAL_AGENTS.map((agent) => (
          <div 
            key={agent.id}
            className={`relative p-4 rounded-xl border transition-all hover:bg-slate-800/50 group ${agent.color.replace('bg-', 'border-').replace('/10', '/30')} border-opacity-30 bg-slate-900`}
          >
            <div className={`mb-3 p-2 rounded-lg w-fit ${agent.color}`}>
              {iconMap[agent.iconName]}
            </div>
            
            <h4 className="font-bold text-slate-200 text-sm mb-0.5">{agent.name}</h4>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-2">{agent.role}</div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-3 min-h-[3rem]">
              {agent.mission}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {agent.principles.map(p => (
                <span key={p} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
