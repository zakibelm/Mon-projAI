
import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Share2, Check, Clock, DollarSign, Target, Activity } from 'lucide-react';
import { OrchestratorResponse, Project } from '../types';

interface DecisionOutcomeProps {
  project: Project;
  result: OrchestratorResponse;
  onBack: () => void;
}

export const DecisionOutcome: React.FC<DecisionOutcomeProps> = ({ project, result, onBack }) => {
  
  const getStatusColor = (d: string) => {
    switch(d) {
      case 'APPROVED': return 'text-emerald-400';
      case 'REJECTED': return 'text-red-400';
      case 'CONDITIONAL': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusBg = (d: string) => {
     switch(d) {
      case 'APPROVED': return 'bg-emerald-500';
      case 'REJECTED': return 'bg-red-500';
      case 'CONDITIONAL': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  }

  const getIcon = (d: string) => {
    switch(d) {
      case 'APPROVED': return <CheckCircle2 className="w-5 h-5" />;
      case 'REJECTED': return <XCircle className="w-5 h-5" />;
      case 'CONDITIONAL': return <AlertTriangle className="w-5 h-5" />;
      default: return null;
    }
  }

  return (
     <div className="max-w-md mx-auto w-full animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="text-xs font-medium text-cyan-500">Edit</button>
      </div>

      {/* Main Status Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl mb-6 relative overflow-hidden">
         <div className={`absolute top-0 left-0 w-1 h-full ${getStatusBg(result.decision)}`}></div>
         
         <div className="flex items-center gap-2 mb-2">
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 ${getStatusColor(result.decision)}`}>
               {getIcon(result.decision)}
               {result.decision}
            </div>
            <span className="text-[10px] text-slate-500">{new Date().toLocaleDateString()}</span>
         </div>

         <h1 className="text-xl font-bold text-white mb-1 leading-tight">{project.name}</h1>
         <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <span>Owner: John Doe</span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span>{project.client}</span>
         </div>

         <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Performance Metrics</div>
         
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50">
               <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                  <Clock className="w-3 h-3 text-purple-400" /> Duration
               </div>
               <div className="text-lg font-bold text-white">14 <span className="text-xs font-normal text-slate-500">Days</span></div>
               <div className="text-[10px] text-emerald-400">Est: 12 Days</div>
            </div>
            
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50">
               <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Cost
               </div>
               <div className="text-lg font-bold text-white">$5.2k</div>
               <div className="text-[10px] text-red-400">Bud: $5.0k</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50">
               <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                  <Target className="w-3 h-3 text-blue-400" /> Scope
               </div>
               <div className="text-lg font-bold text-white">100<span className="text-xs font-normal text-slate-500">%</span></div>
               <div className="text-[10px] text-emerald-400">On Target</div>
            </div>

             <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50">
               <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                  <Activity className="w-3 h-3 text-amber-400" /> Quality
               </div>
               <div className="text-lg font-bold text-white">4.8<span className="text-xs font-normal text-slate-500">/5.0</span></div>
               <div className="text-[10px] text-emerald-400">Excellent</div>
            </div>
         </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl mb-6">
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Impact Summary</h3>
         
         <div className="space-y-4">
            {result.estimated_impact && Object.entries(result.estimated_impact).map(([key, val], idx) => (
              <div key={idx} className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                    {idx === 0 ? <Activity className="w-4 h-4 text-emerald-400" /> : idx === 1 ? <DollarSign className="w-4 h-4 text-red-400" /> : <Check className="w-4 h-4 text-blue-400" />}
                 </div>
                 <div>
                    <div className="text-xs font-bold text-slate-200">{key}</div>
                    <div className="text-xs text-slate-500">{val}</div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Rationale Quote */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-6 italic text-sm text-slate-400">
         "{result.action}"
      </div>

      {/* Recommended Adjustments */}
      <div className="bg-cyan-900/10 rounded-2xl p-6 border border-cyan-500/20 mb-8">
         <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-4">Recommended Adjustments</h3>
         <ul className="space-y-2">
            {result.next_steps.slice(0, 3).map((step, idx) => (
               <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                  {step}
               </li>
            ))}
         </ul>
      </div>

      {/* Footer Actions */}
      <div className="grid grid-cols-2 gap-3 fixed bottom-6 left-0 right-0 max-w-md mx-auto px-4">
         <button className="py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 border border-slate-700">
            <Share2 className="w-4 h-4" /> Share
         </button>
         <button onClick={onBack} className="py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
            <Check className="w-4 h-4" /> Mark as Final
         </button>
      </div>

    </div>
  );
};
