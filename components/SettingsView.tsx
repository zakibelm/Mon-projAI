import React, { useState } from 'react';
import { Save, Globe, Database, ToggleLeft, Cpu, FileCode } from 'lucide-react';
import { N8N_API_BASE_URL, ORCHESTRATOR_SYSTEM_PROMPT } from '../constants';
import { Project } from '../types';

interface SettingsViewProps {
  project: Project | null;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ project }) => {
  const [apiUrl, setApiUrl] = useState(N8N_API_BASE_URL);
  const [isSaved, setIsSaved] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleResetProject = () => {
    if (confirm("Attention : Cela va effacer la session actuelle et créer un nouveau projet. Continuer ?")) {
      localStorage.removeItem('nova_project_id');
      window.location.reload();
    }
  };

  const handleSaveConfig = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-20">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Paramètres & Configuration</h2>
        <p className="text-slate-400">Gérez la connexion au backend, la session projet et inspectez les paramètres de l'IA.</p>
      </div>

      <div className="space-y-8">
        
        {/* Section 1: AI System Configuration (Le point que vous vouliez voir) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Configuration du Système IA</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-slate-200 font-medium">Modèle Principal</h4>
                <p className="text-sm text-slate-500">Le modèle de langage utilisé pour l'orchestration.</p>
              </div>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-mono">
                gemini-2.5-flash
              </span>
            </div>

            <hr className="border-slate-800" />

            <div>
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-slate-200 font-medium flex items-center gap-2">
                   <FileCode className="w-4 h-4 text-slate-400" />
                   System Prompt (Instructions Maîtres)
                 </h4>
                 <button 
                   onClick={() => setShowPrompt(!showPrompt)}
                   className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                 >
                   {showPrompt ? 'Masquer' : 'Voir le prompt complet'}
                 </button>
              </div>
              
              {showPrompt ? (
                <div className="relative">
                  <textarea 
                    readOnly
                    className="w-full h-96 bg-slate-950 text-slate-300 font-mono text-xs p-4 rounded-lg border border-slate-700 focus:outline-none resize-y leading-relaxed"
                    value={ORCHESTRATOR_SYSTEM_PROMPT}
                  />
                  <div className="absolute top-2 right-2 text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    Read-only
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full h-24 bg-slate-950 text-slate-500 font-mono text-xs p-4 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors relative overflow-hidden"
                  onClick={() => setShowPrompt(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none" />
                  {ORCHESTRATOR_SYSTEM_PROMPT.substring(0, 300)}...
                </div>
              )}
              <p className="text-xs text-slate-500 mt-2">
                Ce prompt définit le comportement, les règles PMBOK-7 et la structure JSON stricte attendue par l'orchestrateur.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Connection Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Connexion Backend (n8n)</h3>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">Webhook URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button 
                onClick={handleSaveConfig}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaved ? 'Enregistré' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Session Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Session Projet</h3>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">ID de Session Actuelle</div>
              <div className="font-mono text-white mt-1">{project?.id || 'Aucune session active'}</div>
            </div>
            <button 
              onClick={handleResetProject}
              className="text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 transition-colors text-sm font-medium"
            >
              Réinitialiser la session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};