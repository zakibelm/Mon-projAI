import React, { useState } from 'react';
import { ArrowLeft, Upload, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { Project, AnalysisStatus, OrchestratorResponse } from '../types';
import { analyzeDecision } from '../services/n8nService';

interface DecisionRequestProps {
  project: Project;
  onBack: () => void;
  onComplete: (result: OrchestratorResponse) => void;
}

export const DecisionRequest: React.FC<DecisionRequestProps> = ({ project, onBack, onComplete }) => {
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [category, setCategory] = useState('Budget');
  const [status, setStatus] = useState<AnalysisStatus>('idle');

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setStatus('analyzing');
    try {
      // Build a comprehensive prompt combining form fields
      const prompt = `
        CONTEXT: Project "${project.name}" (ID: ${project.id}). 
        CATEGORY: ${category}. 
        URGENCY: ${urgency}.
        DETAILS: ${description}.
      `;
      const result = await analyzeDecision(project.id, prompt);
      onComplete(result);
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full animate-fadeIn pb-20 relative h-full flex flex-col">
       
       {/* Header */}
       <div className="flex items-center justify-between py-4 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-white">New Decision Request</h2>
        <button 
          onClick={handleSubmit} 
          disabled={status === 'analyzing' || !description.trim()}
          className="text-sm font-bold text-cyan-500 disabled:opacity-50"
        >
          Submit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        
        {/* Context Section */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Context</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-500 mb-1">Project</div>
                <div className="text-slate-200 font-medium">{project.name} ({project.id})</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative">
              <div className="w-full">
                <div className="text-xs text-slate-500 mb-1">Category</div>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent text-slate-200 font-medium appearance-none focus:outline-none"
                >
                  <option>Budget</option>
                  <option>Scope</option>
                  <option>Timeline</option>
                  <option>Risk</option>
                  <option>Resource</option>
                </select>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600 absolute right-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div>
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Details</h3>
           
           <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 mb-4">
              <div className="flex p-1 bg-slate-950 rounded-lg">
                 {['Normal', 'High', 'Critical'].map(level => (
                   <button
                     key={level}
                     onClick={() => setUrgency(level)}
                     className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                       urgency === level 
                         ? 'bg-slate-800 text-white shadow-sm' 
                         : 'text-slate-500 hover:text-slate-300'
                     }`}
                   >
                     {level}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-500 mb-2">Detailed Description</div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the context, options, and recommended path..."
                className="w-full h-40 bg-transparent text-slate-200 text-sm focus:outline-none resize-none placeholder:text-slate-600"
              />
              <div className="text-right text-[10px] text-slate-600 mt-2">
                {description.length}/5000 characters
              </div>
           </div>
        </div>

        {/* Attachments */}
        <div>
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Attachments</h3>
           <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-slate-700 hover:bg-slate-900/50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-2 text-slate-600" />
              <div className="text-xs font-medium">Upload supporting docs</div>
              <div className="text-[10px] text-slate-500 text-center mt-2 px-4 leading-relaxed">
                 Supported: .mpp, .xer, .xml, .pdf, .docx, .xlsx, .csv, .pptx, .png, .jpg
              </div>
           </div>
        </div>

      </div>

      {/* Loading Overlay */}
      {status === 'analyzing' && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
           <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-2xl mb-4 relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl animate-pulse"></div>
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
           </div>
           <h3 className="text-lg font-bold text-white mb-1">Analyzing Scenario</h3>
           <p className="text-sm text-slate-400 flex items-center gap-2">
             <Sparkles className="w-3 h-3 text-purple-400" />
             Consulting Virtual Agents...
           </p>
        </div>
      )}

    </div>
  );
};