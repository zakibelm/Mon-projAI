import React from 'react';
import { History, FileText, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const HistoryView: React.FC = () => {
  // Mock data for display purposes
  const historyItems = [
    { id: 1, date: '2023-10-24 10:23', title: 'Budget reduction vs AI Features', decision: 'CONDITIONAL', score: 78 },
    { id: 2, date: '2023-10-23 15:45', title: 'Vendor delay mitigation', decision: 'APPROVED', score: 92 },
    { id: 3, date: '2023-10-22 09:12', title: 'Skipping UAT for speed', decision: 'REJECTED', score: 15 },
  ];

  const getStatusIcon = (decision: string) => {
    switch(decision) {
      case 'APPROVED': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'CONDITIONAL': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Decision History</h2>
           <p className="text-slate-400">Audit trail of all decisions processed by the Orchestrator.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <History className="w-4 h-4" />
          Export Log
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-xs uppercase text-slate-500">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Scenario Context</th>
                <th className="p-4 font-semibold">Decision</th>
                <th className="p-4 font-semibold">Confidence</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 text-slate-400 font-mono text-xs">{item.date}</td>
                  <td className="p-4 text-slate-200 font-medium">{item.title}</td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-bold border ${
                      item.decision === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      item.decision === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {getStatusIcon(item.decision)}
                      {item.decision}
                    </div>
                  </td>
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                       <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                         <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${item.score}%` }}></div>
                       </div>
                       <span className="text-xs text-slate-400">{item.score}%</span>
                     </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State / Pagination simulation */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30 text-center text-xs text-slate-500">
          Showing 3 of 3 records
        </div>
      </div>
    </div>
  );
};