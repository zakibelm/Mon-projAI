import React from 'react';
import { AGENTS } from '../constants';

interface AgentVisualizerProps {
  activeAgents: string[];
}

export const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ activeAgents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {AGENTS.map((agent) => {
        // Normalize IDs to handle potential inconsistencies (e.g. 'agent_valeur' vs 'valeur')
        const isActive = activeAgents.some(a => 
          a.toLowerCase().includes(agent.id.replace('agent_', '')) || 
          a.toLowerCase() === agent.id.toLowerCase()
        );

        return (
          <div
            key={agent.id}
            className={`
              relative p-4 rounded-xl border transition-all duration-500
              ${isActive 
                ? `${agent.color.replace('bg-', 'border-')} bg-opacity-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105` 
                : 'border-slate-800 bg-slate-900 opacity-50 grayscale'
              }
            `}
          >
            {isActive && (
              <div className={`absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 rounded-full ${agent.color} animate-pulse`} />
            )}
            <h3 className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`}>
              {agent.name}
            </h3>
            <p className="text-xs text-slate-400 mb-2 min-h-[2.5rem]">
              {agent.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {agent.principles.map(p => (
                <span key={p} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {p}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
