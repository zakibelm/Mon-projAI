import React, { useState } from 'react';
import { analyzeScenario } from './services/geminiService';
import { OrchestratorResponse, AnalysisStatus } from './types';
import { AgentVisualizer } from './components/AgentVisualizer';
import { DecisionDisplay } from './components/DecisionDisplay';
import { 
  Terminal, 
  Send, 
  Loader2, 
  Settings, 
  ShieldCheck, 
  Activity,
  Layers,
  LayoutDashboard,
  BrainCircuit,
  History
} from 'lucide-react';

const App: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<OrchestratorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!scenario.trim()) return;

    setStatus('analyzing');
    setError(null);
    setResult(null);

    try {
      const data = await analyzeScenario(scenario);
      setResult(data);
      setStatus('complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row font-inter">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Nova<span className="text-indigo-400">Project</span></h1>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-lg border border-indigo-500/20 transition-all">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Orchestrator</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all">
              <History className="w-5 h-5" />
              <span className="font-medium">History</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all">
              <Activity className="w-5 h-5" />
              <span className="font-medium">EVV Analytics</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>PMBOK-7 Aligned</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur flex items-center px-8 justify-between z-10">
          <div className="flex items-center gap-4">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-medium text-slate-200">Decision Support Console</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
              status === 'analyzing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 
              status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
              'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                status === 'analyzing' ? 'bg-indigo-400 animate-pulse' : 
                status === 'error' ? 'bg-red-400' :
                'bg-emerald-400'
              }`} />
              {status === 'idle' ? 'System Ready' : status === 'analyzing' ? 'Agents Active' : status === 'error' ? 'System Error' : 'Analysis Complete'}
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Input Section */}
            <section className="bg-slate-900 rounded-2xl p-1 border border-slate-800 shadow-2xl">
              <div className="relative">
                <textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Describe your project scenario, challenge, or decision point here... (e.g., 'Team is resisting the new Agile workflow adoption despite falling productivity')"
                  className="w-full h-32 bg-slate-950 text-slate-100 p-6 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-slate-600 font-mono text-sm leading-relaxed"
                  disabled={status === 'analyzing'}
                />
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={status === 'analyzing' || !scenario.trim()}
                    className={`
                      flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg
                      ${status === 'analyzing' || !scenario.trim()
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 shadow-indigo-500/25'
                      }
                    `}
                  >
                    {status === 'analyzing' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Orchestrating Agents...
                      </>
                    ) : (
                      <>
                        <Terminal className="w-4 h-4" />
                        Initialize Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200">
                <ShieldCheck className="w-5 h-5 text-red-400" />
                <p>{error}</p>
              </div>
            )}

            {/* Agent Visualization */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Agents</h3>
              </div>
              <AgentVisualizer activeAgents={result?.agents_consulted || []} />
            </section>

            {/* Results Display */}
            {result && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Strategic Output</h3>
                </div>
                <DecisionDisplay data={result} />
              </section>
            )}

            {/* Empty State / Welcome */}
            {!result && status !== 'analyzing' && !error && (
              <div className="text-center py-12 opacity-50">
                <BrainCircuit className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-300">Ready to Orchestrate</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                  Enter a complex project scenario above. The Orchestrator will route your request to specialized PMBOK-7 agents for a multi-dimensional analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
