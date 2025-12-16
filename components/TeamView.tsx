import React from 'react';
import { VIRTUAL_AGENTS } from '../constants';
import { TrendingUp, Box, Users, ShieldAlert, Truck, Quote, Fingerprint } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Box: <Box className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
};

export const TeamView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fadeIn pb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Virtual Advisory Board</h2>
        <p className="text-slate-400 max-w-2xl">
          Your project decisions are analyzed by these 5 specialized AI agents. Each agent represents a core cluster of PMBOK-7 principles, ensuring a holistic and balanced perspective on every problem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {VIRTUAL_AGENTS.map((agent, index) => (
          <div 
            key={agent.id} 
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all shadow-lg flex flex-col md:flex-row gap-6"
          >
            {/* Left: Identity */}
            <div className="md:w-1/4 flex-shrink-0 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${agent.color} shadow-lg`}>
                {iconMap[agent.iconName]}
              </div>
              <h3 className="text-xl font-bold text-white">{agent.name}</h3>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">{agent.role}</span>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                 {agent.principles.map(p => (
                   <span key={p} className="text-[0.65rem] uppercase font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400">
                     {p}
                   </span>
                 ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-indigo-400 mb-1 flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" /> Core Mission
                </h4>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {agent.mission}
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 relative">
                <Quote className="absolute top-2 left-2 w-4 h-4 text-slate-700 opacity-50 transform rotate-180" />
                <p className="text-slate-400 text-sm italic pl-6">
                  "I evaluate every scenario by prioritizing {agent.principles.join(', ').toLowerCase()}. If a decision compromises {agent.principles[0].toLowerCase()}, I will raise a red flag."
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};