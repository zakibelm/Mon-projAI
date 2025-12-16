import React, { useState } from 'react';
import { 
  ArrowLeft, MoreVertical, Calendar, CheckCircle2, DollarSign, 
  Users, ArrowRight, ListTodo, FileText, Paperclip, CheckSquare, 
  Clock, AlertCircle 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onRequestDecision: () => void;
  onViewHistory: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onRequestDecision, onViewHistory }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'decisions', label: 'Decisions' },
    { id: 'files', label: 'Files' },
  ];

  // Mock Data for tabs
  const tasks = [
    { id: 1, title: "Finalize Requirements", status: "completed" },
    { id: 2, title: "Draft API Specification", status: "in-progress" },
    { id: 3, title: "Client Design Review", status: "pending" },
    { id: 4, title: "Database Migration", status: "pending" },
  ];

  const recentDecisions = [
    { id: 101, title: "Vendor Switch for API", date: "Oct 24", status: "APPROVED" },
    { id: 102, title: "Extension of Phase 1", date: "Oct 12", status: "REJECTED" },
  ];

  const files = [
    { name: "Project_Spec_v2.pdf", size: "2.4 MB", date: "Oct 01" },
    { name: "Budget_Q4.xlsx", size: "1.1 MB", date: "Sep 28" },
    { name: "Assets_Bundle.zip", size: "145 MB", date: "Sep 15" },
  ];

  return (
    <div className="max-w-md mx-auto w-full animate-fadeIn pb-24 relative min-h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-2 sticky top-0 bg-[#0f172a] z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-white">Project Details</h2>
        <button className="p-2 -mr-2 text-slate-400 hover:text-white">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Top Summary Card (Always Visible) */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
           <div>
              <h1 className="text-2xl font-bold text-white mb-1">{project.name}</h1>
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                   project.status === 'At Risk' ? 'text-red-400 border-red-900 bg-red-950/50' : 
                   project.status === 'On Track' ? 'text-emerald-400 border-emerald-900 bg-emerald-950/50' : 
                   'text-blue-400 border-blue-900 bg-blue-950/50'
                 }`}>
                   {project.status}
                 </span>
                 <span className="text-[10px] text-slate-500 flex items-center gap-1">
                   <Clock className="w-3 h-3" /> Due {project.deadline}
                 </span>
              </div>
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs border-2 border-[#0f172a] shadow-lg">
             {project.progress}%
           </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 mb-6 sticky top-16 bg-[#0f172a] z-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id 
                ? 'text-cyan-400' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
             <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description || "No description provided."}
                </p>
             </div>

             <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Budget Utilization</h3>
                  <span className="text-xs text-white font-mono">${project.budget_spent.toLocaleString()} / ${project.budget_total.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
                   <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(project.budget_spent/project.budget_total)*100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                   <span>0%</span>
                   <span>50%</span>
                   <span>100%</span>
                </div>
             </div>

             <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Core Team</h3>
                   <button className="text-xs text-cyan-500">Manage</button>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                      <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-slate-900"></div>
                      <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-slate-900"></div>
                   </div>
                   <div className="text-xs text-slate-400">
                      +4 others
                   </div>
                </div>
             </div>

             <button 
               onClick={onRequestDecision}
               className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
             >
                <Users className="w-5 h-5" />
                Request Decision
             </button>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
             <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Upcoming Tasks</span>
                <button className="p-1 bg-slate-800 rounded text-slate-400 hover:text-white">
                   <ListTodo className="w-4 h-4" />
                </button>
             </div>
             {tasks.map(task => (
               <div key={task.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                  }`}>
                    {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {task.title}
                  </span>
               </div>
             ))}
             <button className="w-full py-3 border border-dashed border-slate-700 text-slate-500 rounded-xl text-xs hover:bg-slate-900 hover:text-slate-300 transition-colors">
               + Add New Task
             </button>
          </div>
        )}

        {/* DECISIONS TAB */}
        {activeTab === 'decisions' && (
          <div className="space-y-4">
             <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                   <h4 className="text-sm font-bold text-cyan-400">Decision Engine</h4>
                   <p className="text-xs text-slate-400 mt-1">
                     Use this tab to track AI-assisted governance decisions tailored to PMBOK-7 principles.
                   </p>
                </div>
             </div>

             <div className="space-y-3">
                {recentDecisions.map(d => (
                   <div key={d.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                         <div className="text-sm font-medium text-slate-200">{d.title}</div>
                         <div className="text-xs text-slate-500">{d.date}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                         d.status === 'APPROVED' ? 'text-emerald-400 border-emerald-900 bg-emerald-950/50' : 
                         'text-red-400 border-red-900 bg-red-950/50'
                      }`}>
                        {d.status}
                      </span>
                   </div>
                ))}
             </div>

             <button 
               onClick={onViewHistory}
               className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
             >
                View Full History
                <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'files' && (
          <div className="space-y-3">
             {files.map((file, i) => (
                <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer">
                   <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <Paperclip className="w-5 h-5 text-slate-400" />
                   </div>
                   <div className="flex-1">
                      <div className="text-sm font-medium text-slate-200">{file.name}</div>
                      <div className="text-xs text-slate-500">{file.size} • {file.date}</div>
                   </div>
                </div>
             ))}
             <button className="w-full py-8 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 flex flex-col items-center justify-center gap-2 hover:bg-slate-900 hover:border-slate-700 transition-colors">
                <UploadIcon className="w-6 h-6" />
                <span className="text-xs font-medium">Tap to upload files</span>
                <span className="text-[10px] text-slate-600 text-center max-w-xs mt-1">
                  Supported: .mpp, .xer, .xml, .pdf, .docx, .xlsx, .csv, .pptx, .png, .jpg
                </span>
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

// Helper Icon for file upload
const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);