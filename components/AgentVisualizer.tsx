import React from 'react';
import { PrincipleScores } from '../types';

interface PrincipleVisualizerProps {
  scores: PrincipleScores;
}

export const PrincipleVisualizer: React.FC<PrincipleVisualizerProps> = ({ scores }) => {
  const principles = [
    { key: 'stewardship', label: 'Stewardship', color: 'bg-green-500' },
    { key: 'team', label: 'Team', color: 'bg-green-600' },
    { key: 'stakeholders', label: 'Stakeholders', color: 'bg-emerald-500' },
    { key: 'value', label: 'Value', color: 'bg-teal-500' },
    { key: 'systems_thinking', label: 'Systems', color: 'bg-blue-500' },
    { key: 'leadership', label: 'Leadership', color: 'bg-indigo-500' },
    { key: 'tailoring', label: 'Tailoring', color: 'bg-violet-500' },
    { key: 'quality', label: 'Quality', color: 'bg-purple-500' },
    { key: 'complexity', label: 'Complexity', color: 'bg-fuchsia-500' },
    { key: 'risk', label: 'Risk', color: 'bg-rose-500' },
    { key: 'adaptability', label: 'Adaptability', color: 'bg-orange-500' },
    { key: 'change', label: 'Change', color: 'bg-amber-500' },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        PMBOK 12 Principles Evaluation
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {principles.map((p) => {
          const score = (scores as any)[p.key] || 0;
          return (
            <div key={p.key} className="relative group">
               <div className="flex items-end justify-between mb-1">
                 <span className="text-xs font-medium text-slate-300">{p.label}</span>
                 <span className="text-xs font-mono text-slate-400">{score}%</span>
               </div>
               <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                 <div 
                   className={`h-full rounded-full ${p.color} transition-all duration-1000`} 
                   style={{ width: `${score}%` }}
                 />
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
