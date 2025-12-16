import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, CheckCircle2, XCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface HistoryViewProps {
  project?: Project | null;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ project, onBack }) => {
  const [filter, setFilter] = useState('All');

  // Mock History Data
  const historyItems = [
    { 
      id: 101, 
      title: "Vendor Switch for API", 
      date: "Oct 24, 2024", 
      status: "APPROVED", 
      score: 92,
      initiator: "Sarah • Tech Dept" 
    },
    { 
      id: 102, 
      title: "Extension of Phase 1 Deadline", 
      date: "Oct 12, 2024", 
      status: "REJECTED", 
      score: 45,
      initiator: "Mike • Ops Lead" 
    },
    { 
      id: 103, 
      title: "Hiring Senior React Dev", 
      date: "Oct 05, 2024", 
      status: "CONDITIONAL", 
      score: 78,
      initiator: "HR • Talent Acquisition" 
    },
    { 
      id: 104, 
      title: "Q4 Marketing Budget Boost", 
      date: "Sep 28, 2024", 
      status: "APPROVED", 
      score: 88,
      initiator: "Alex • CMO" 
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'APPROVED': 
        return (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-1.5 py-0.5 rounded uppercase">
             <CheckCircle2 className="w-3 h-3"/> Approved
          </div>
        );
      case 'REJECTED': 
        return (
          <div className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-900 px-1.5 py-0.5 rounded uppercase">
             <XCircle className="w-3 h-3"/> Rejected
          </div>
        );
      case 'CONDITIONAL': 
        return (
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/50 border border-amber-900 px-1.5 py-0.5 rounded uppercase">
             <AlertTriangle className="w-3 h-3"/> Pending Review
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto w-full animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-white">Decision History</h2>
        <button className="p-2 -mr-2 text-slate-400 hover:text-white">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search past decisions..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      {/* Context Banner */}
      {project && (
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Project</div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
             <div>
                <h3 className="font-bold text-white text-lg">{project.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                  12 Decisions Total
                </div>
             </div>
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">+3</div>
             </div>
          </div>
        </div>
      )}

      {/* Filters Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
         {['All', 'Approved', 'Rejected', 'Pending'].map(f => (
           <button 
             key={f}
             onClick={() => setFilter(f)}
             className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
               filter === f 
                 ? 'bg-cyan-500 text-white border-cyan-500' 
                 : 'bg-slate-900 text-slate-400 border-slate-800'
             }`}
           >
             {f}
           </button>
         ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {historyItems.map(item => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors cursor-pointer group">
             <div className="flex justify-between items-start mb-2">
                {getStatusBadge(item.status)}
                <div className="flex items-center gap-1 text-xs text-slate-500">
                   {item.score}/100 <span className="text-[10px] text-slate-600">Score</span>
                </div>
             </div>
             
             <h4 className="font-bold text-slate-200 mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
             
             <div className="flex justify-between items-center mt-3">
                <div className="text-[10px] text-slate-500">
                   Initiated by <span className="text-slate-400">{item.initiator}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                   {item.date}
                   <ChevronRight className="w-3 h-3" />
                </div>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
};