import React, { useState, useEffect } from 'react';
import { initializeProject } from './services/n8nService';
import { Project, AnalysisStatus, OrchestratorResponse } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectList } from './components/ProjectList';
import { ProjectDetail } from './components/ProjectDetail';
import { DecisionRequest } from './components/DecisionRequest';
import { DecisionOutcome } from './components/DecisionOutcome';
import { SettingsView } from './components/SettingsView';
import { HistoryView } from './components/HistoryView';
import { NewProject } from './components/NewProject';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [status, setStatus] = useState<AnalysisStatus>('initializing');
  const [currentView, setCurrentView] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // New Navigation State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [decisionResult, setDecisionResult] = useState<OrchestratorResponse | null>(null);

  useEffect(() => {
    // Just initialize generic session check
    initializeProject().then(() => setStatus('idle'));
  }, []);

  // View Routing Logic
  const renderView = () => {
    switch (currentView) {
      case 'projects':
        return (
          <ProjectList 
            onSelectProject={(p) => {
              setSelectedProject(p);
              setCurrentView('project_detail');
            }}
            onNewProject={() => setCurrentView('new_project')}
          />
        );
      
      case 'new_project':
        return (
          <NewProject 
            onClose={() => setCurrentView('projects')}
            onSave={(data) => {
              console.log("Saving new project", data);
              // In a real app, we would add it to the list here
              setCurrentView('projects');
            }}
          />
        );
        
      case 'project_detail':
        if (!selectedProject) return <ProjectList onSelectProject={setSelectedProject} onNewProject={() => setCurrentView('new_project')} />;
        return (
          <ProjectDetail 
            project={selectedProject}
            onBack={() => setCurrentView('projects')}
            onRequestDecision={() => setCurrentView('decision_request')}
            onViewHistory={() => setCurrentView('history')}
          />
        );

      case 'decision_request':
        if (!selectedProject) return null;
        return (
          <DecisionRequest 
            project={selectedProject}
            onBack={() => setCurrentView('project_detail')}
            onComplete={(result) => {
              setDecisionResult(result);
              setCurrentView('decision_outcome');
            }}
          />
        );

      case 'decision_outcome':
        if (!selectedProject || !decisionResult) return null;
        return (
          <DecisionOutcome 
            project={selectedProject}
            result={decisionResult}
            onBack={() => setCurrentView('project_detail')}
          />
        );

      case 'history':
        return (
          <HistoryView 
            project={selectedProject}
            onBack={() => selectedProject ? setCurrentView('project_detail') : setCurrentView('projects')}
          />
        );

      case 'settings':
        return <SettingsView project={selectedProject} />;
        
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 animate-fadeIn">
            <Construction className="w-12 h-12 mb-4 opacity-50" />
            <p>View "{currentView}" under construction</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex font-inter overflow-hidden">
      
      <Sidebar 
        currentView={currentView} 
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'projects') {
             setSelectedProject(null);
             setDecisionResult(null);
          }
        }} 
        status={status} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
        
        <Header 
          project={selectedProject} 
          status={status} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 pt-2 pb-6 scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;