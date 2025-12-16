import React, { useState } from 'react';
import { Terminal, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { Project, AnalysisStatus, OrchestratorResponse } from '../types';
import { analyzeDecision } from '../services/n8nService';
import { DecisionDisplay } from './DecisionDisplay';

interface DashboardProps {
  project: Project | null;
  globalStatus: AnalysisStatus;
  setGlobalStatus: (status: AnalysisStatus) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ project, globalStatus, setGlobalStatus }) => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<OrchestratorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!scenario.trim() || !project) return;

    setGlobalStatus('analyzing');
    setError(null);
    setResult(null);

    try {
      const data = await analyzeDecision(project.id, scenario);
      setResult(data);
      setGlobalStatus('complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Analysis failed.");
      setGlobalStatus('error');
    }
  };

  const isInteracting = globalStatus === 'analyzing' || globalStatus === 'initializing';

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-bold text-white">Project Orchestrator</h2>
        <p className="text-slate-400">Describe a situation to summon the virtual board of agents.</p>
      </div>

      {/* Input Section */}
      <section className="bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-xl transition-shadow hover:shadow-2xl hover:shadow-indigo-500/5 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
        <div className="relative bg-slate-900 rounded-xl">
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Ex: We need to cut the budget by 15% but the stakeholder insists on keeping the AI features. The team is already working overtime..."
            className="w-full h-32 bg-slate-950/50 text-slate-200 p-6 rounded-t-xl resize-none focus:outline-none placeholder:text-slate-600 font-mono text-sm leading-relaxed border-b border-slate-800"
            disabled={isInteracting}
          />
          <div className="px-4 py-3 bg-slate-900 rounded-b-xl flex justify-between items-center">
             <div className="text-xs text-slate-500 flex items-center gap-2">
               <Sparkles className="w-3 h-3 text-indigo-400" />
               AI-Powered Analysis
             </div>
            <button
              onClick={handleAnalyze}
              disabled={isInteracting || !scenario.trim()}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition-all
                ${isInteracting || !scenario.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25'
                }
              `}
            >
              {globalStatus === 'analyzing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Terminal className="w-4 h-4" />
                  Run Orchestration
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Error Feedback */}
      {error && (
        <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-300 text-sm animate-slideDown">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Results Area */}
      {result ? (
        <section className="animate-slideUp pb-10">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Analysis Complete
              </h3>
              <button 
                onClick={() => setResult(null)}
                className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 rounded transition-colors"
              >
                Reset View
              </button>
            </div>
            <DecisionDisplay data={result} />
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl mt-8">
          <div className="p-4 bg-slate-900 rounded-full mb-4">
            <Terminal className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-sm font-medium">Ready to orchestrate. Enter a scenario above.</p>
        </div>
      )}
    </div>
  );
};