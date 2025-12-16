import React, { useState, useEffect } from 'react';
import { initializeProject } from './services/n8nService';
import { Project, AnalysisStatus } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TeamView } from './components/TeamView';
import { SettingsView } from './components/SettingsView';
import { HistoryView } from './components/HistoryView';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [status, setStatus] = useState<AnalysisStatus>('initializing');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialization Logic only
  useEffect(() => {
    const init = async () => {
      try {
        const project = await initializeProject();
        setCurrentProject(project);
        setStatus('idle');
      } catch (err) {
        console.error("Initialization failed, defaulting to offline mode.");
        setStatus('error'); // Will trigger mock mode in services
      }
    };
    init();
  }, []);

  // View Routing Logic
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            project={currentProject} 
            globalStatus={status} 
            setGlobalStatus={setStatus} 
          />
        );
      case 'team':
        return <TeamView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView project={currentProject} />;
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 animate-fadeIn">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Construction className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-300">Module Under Construction</h3>
            <p className="max-w-md text-center mt-2 text-sm">
              The EVV Analytics module is being connected to the n8n backend. Please check back later.
            </p>
          </div>
        );
      default:
        return <Dashboard project={currentProject} globalStatus={status} setGlobalStatus={setStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex font-inter overflow-hidden">
      
      {/* 1. Autonomous Navigation Component with Mobile Logic */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        status={status} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
        
        {/* 2. Autonomous Header Component with Menu Toggle */}
        <Header 
          project={currentProject} 
          status={status} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* 3. Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;