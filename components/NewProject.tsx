import React, { useState } from 'react';
import { X, Calendar, DollarSign, User, Users, Plus, ChevronRight, Upload } from 'lucide-react';
import { Project } from '../types';

interface NewProjectProps {
  onClose: () => void;
  onSave: (project: Partial<Project>) => void;
}

export const NewProject: React.FC<NewProjectProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low'|'Medium'|'High'>('Medium');

  return (
    <div className="max-w-md mx-auto w-full animate-slideUp pb-20 relative min-h-full flex flex-col bg-[#0f172a]">
      
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-4">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-white">New Project</h2>
        <button 
          onClick={() => onSave({ name, description, priority })}
          className="text-sm font-bold text-cyan-500"
        >
          Save
        </button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        
        {/* Essentials */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Essentials</h3>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Project Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                className="w-full bg-transparent text-slate-200 text-sm font-medium focus:outline-none placeholder:text-slate-600 border-b border-slate-800 pb-2 focus:border-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the goals..."
                className="w-full bg-transparent text-slate-200 text-sm focus:outline-none placeholder:text-slate-600 resize-none h-20"
              />
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Logistics</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <label className="text-xs text-slate-500 mb-1 block flex items-center gap-1">
                  <Calendar className="w-3 h-3"/> Deadline
                </label>
                <input 
                  type="date"
                  className="w-full bg-transparent text-slate-200 text-sm focus:outline-none [color-scheme:dark]" 
                />
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <label className="text-xs text-slate-500 mb-1 block flex items-center gap-1">
                  <DollarSign className="w-3 h-3"/> Total Budget
                </label>
                <input 
                  type="number"
                  placeholder="$ 0.00"
                  className="w-full bg-transparent text-slate-200 text-sm focus:outline-none" 
                />
             </div>
          </div>
        </section>

        {/* Classification */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Classification</h3>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex">
             {['Low', 'Medium', 'High'].map(p => (
               <button
                 key={p}
                 onClick={() => setPriority(p as any)}
                 className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                   priority === p 
                     ? 'bg-slate-800 text-white shadow-sm' 
                     : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 {p}
               </button>
             ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Team</h3>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-400" />
                   </div>
                   <div>
                      <div className="text-sm font-medium text-white">Sarah Jenkins</div>
                      <div className="text-xs text-slate-500">Project Manager</div>
                   </div>
                </div>
                <button className="text-xs text-cyan-500 font-medium">Change</button>
             </div>
             
             <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500">Team Members</span>
                  <span className="text-xs text-slate-500">3 selected</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                   <button className="w-12 h-12 rounded-full border border-dashed border-slate-600 flex items-center justify-center flex-shrink-0 text-slate-500 hover:text-white hover:border-slate-400 transition-colors">
                      <Plus className="w-5 h-5" />
                   </button>
                   {['David', 'Emily', 'Marcus'].map((m, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                         <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${i === 0 ? 'from-blue-500 to-indigo-500' : i === 1 ? 'from-purple-500 to-pink-500' : 'from-emerald-500 to-teal-500'} border-2 border-slate-900`}></div>
                         <span className="text-[10px] text-slate-400">{m}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Attachments (New Section) */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Initial Documents</h3>
          <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-slate-700 hover:bg-slate-900/50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-2 text-slate-600" />
              <div className="text-xs font-medium">Upload project charter or plan</div>
              <div className="text-[10px] text-slate-500 text-center mt-2 px-4 leading-relaxed max-w-sm">
                Supported formats:
                <br />
                <span className="text-slate-600">
                  .mpp, .xer, .xml (Project) • .pdf, .docx (Docs)
                  <br />
                  .xlsx, .csv (Data) • .pptx (Slides)
                  <br />
                  .png, .jpg, .jpeg (Images)
                </span>
              </div>
          </div>
        </section>

      </div>
    </div>
  );
};