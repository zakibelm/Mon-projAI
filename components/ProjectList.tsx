import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, AlertCircle, Clock } from 'lucide-react';
import { Project } from '../types';
import { getProjects } from '../services/n8nService';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject, onNewProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  // Filter and Sort Logic
  const getProcessedProjects = () => {
    // 1. Filter by search query
    let filtered = projects.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sort by active tab
    return filtered.sort((a, b) => {
      switch (activeTab) {
        case 'Priority':
          const pOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
        
        case 'Deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        
        case 'Status':
          // Custom order: At Risk first, then Planning, then On Track
          const sOrder: Record<string, number> = { 'At Risk': 0, 'Planning': 1, 'On Track': 2, 'Completed': 3 };
          return (sOrder[a.status] ?? 99) - (sOrder[b.status] ?? 99);
        
        default: // 'All Projects' - Keep original ID/creation order or no specific sort
          return 0;
      }
    });
  };

  const processedProjects = getProcessedProjects();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'On Track': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'At Risk': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Planning': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getPriorityBadge = (priority: string) => {
     switch(priority) {
      case 'High': return <span className="text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-900 px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> High</span>;
      case 'Medium': return <span className="text-[10px] font-bold text-amber-400 bg-amber-950/50 border border-amber-900 px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><Clock className="w-3 h-3"/> Medium</span>;
      default: return <span className="text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded uppercase">Low</span>;
     }
  }

  return (
    <div className="max-w-md mx-auto w-full animate-fadeIn pb-20">
      
      {/* Header Search */}
      <div className="sticky top-0 bg-[#0f172a] z-10 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
             <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-[#0f172a]"></div>
             <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, clients..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Filters / Sort Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All Projects', 'Priority', 'Deadline', 'Status'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeTab === tab 
                  ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-semibold text-slate-400">
            {searchQuery ? 'Search Results' : activeTab === 'All Projects' ? 'Active Projects' : `Sorted by ${activeTab}`} 
            {' '}({processedProjects.length})
          </span>
          {activeTab !== 'All Projects' && (
             <button onClick={() => setActiveTab('All Projects')} className="text-xs text-cyan-500 cursor-pointer hover:underline">Clear sort</button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 mt-2">
        {loading ? (
          <div className="text-center py-10 text-slate-500 flex flex-col items-center gap-3">
             <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
             Loading projects...
          </div>
        ) : processedProjects.length === 0 ? (
          <div className="text-center py-10 text-slate-500 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
             <p>No projects found matching your criteria.</p>
             <button onClick={() => {setSearchQuery(''); setActiveTab('All Projects')}} className="mt-2 text-cyan-500 text-sm font-medium">Reset filters</button>
          </div>
        ) : processedProjects.map(project => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg hover:border-slate-700 transition-all cursor-pointer active:scale-[0.98] group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-800 p-2.5 rounded-xl group-hover:bg-slate-700 transition-colors">
                 <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md"></div>
              </div>
              {getPriorityBadge(project.priority)}
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{project.name}</h3>
            <p className="text-xs text-slate-500 mb-6">{project.client}</p>

            <div className="flex justify-between items-center mb-2">
               <div className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(project.status)}`}>
                 {project.status.toUpperCase()}
               </div>
               <div className="flex items-center gap-1 text-xs text-slate-400">
                 <Calendar className="w-3 h-3" />
                 {project.deadline}
               </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-1">
              <div 
                className={`h-full rounded-full ${project.status === 'At Risk' ? 'bg-red-500' : 'bg-cyan-500'}`} 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-[10px] text-slate-500 font-mono">{project.progress}%</div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onNewProject}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform hover:scale-110 active:scale-90 z-20"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};