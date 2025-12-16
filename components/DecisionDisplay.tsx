import React from 'react';
import { OrchestratorResponse } from '../types';
import { PrincipleVisualizer } from './AgentVisualizer';
import { 
  BarChart2, 
  AlertTriangle, 
  Scale,
  Shield,
  Zap,
  Layout,
  FileText,
  Activity,
  Clock,
  DollarSign
} from 'lucide-react';

interface DecisionDisplayProps {
  data: OrchestratorResponse;
}

export const DecisionDisplay: React.FC<DecisionDisplayProps> = ({ data }) => {
  const getDecisionColor = (decision: string) => {
    switch (decision?.toUpperCase()) {
      case 'APPROVED': return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
      case 'REJECTED': return 'text-red-400 border-red-500/50 bg-red-500/10';
      case 'CONDITIONAL': return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
      default: return 'text-slate-400 border-slate-500/50 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header: Decision & Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-2 rounded-xl p-6 border-l-4 shadow-lg flex flex-col justify-center ${getDecisionColor(data.decision)} border-slate-800 bg-slate-900`}>
          <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Final Decision</div>
          <div className="text-4xl font-bold">{data.decision?.toUpperCase() || 'UNKNOWN'}</div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5" />
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Confidence Score</div>
          <div className="text-5xl font-mono font-bold text-white relative z-10">
            {data.overall_score}<span className="text-2xl text-slate-500">/100</span>
          </div>
          <Activity className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-800 opacity-50" />
        </div>
      </div>

      {/* Metadata strip (n8n specific) */}
      {(data.execution_time_ms || data.cost_usd) && (
        <div className="flex gap-4 text-xs text-slate-500 justify-end px-2">
          {data.execution_time_ms && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{data.execution_time_ms}ms</span>
            </div>
          )}
          {data.cost_usd && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>${data.cost_usd}</span>
            </div>
          )}
        </div>
      )}

      {/* Rationale / Action */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          Strategic Rationale & Action
        </h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {data.action}
        </p>
      </div>

      {/* Principles Visualization */}
      {data.principle_scores && <PrincipleVisualizer scores={data.principle_scores} />}

      {/* Domain Analysis */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Layout className="w-5 h-5 text-blue-400" />
          Domain Performance Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.domain_analysis && Object.entries(data.domain_analysis).map(([domain, analysis]: [string, any]) => (
            <div key={domain} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="capitalize font-medium text-slate-200">{domain.replace(/_/g, ' ')}</span>
                <span className={`px-2 py-0.5 text-xs rounded bg-slate-800 border border-slate-700 ${
                  analysis.score > 70 ? 'text-green-400' : analysis.score > 40 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  Score: {analysis.score}
                </span>
              </div>
              <p className="text-sm text-slate-400">{analysis.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Columns: Impact, Risks, Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Estimated Impact (was Trade-offs) */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-orange-400" />
            Estimated Impact
          </h3>
          <ul className="space-y-3">
            {data.estimated_impact && Object.entries(data.estimated_impact).map(([key, val]: [string, any], idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-3 bg-slate-800/30 p-2 rounded">
                <span className="text-orange-500 mt-0.5">•</span> 
                <span className="capitalize font-medium text-slate-400">{key.replace(/_/g, ' ')}:</span> {val}
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Critical Risks
          </h3>
          <ul className="space-y-3">
            {data.risks?.map((risk, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-3 bg-slate-800/30 p-2 rounded">
                <span className="text-red-500 mt-0.5">•</span> {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps (was Recommended Actions) */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Next Steps
          </h3>
          <ul className="space-y-3">
            {data.next_steps?.map((step, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-3 bg-slate-800/30 p-2 rounded">
                <span className="text-yellow-500 mt-0.5">→</span> {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Conditions (if Conditional) */}
      {data.conditions && data.conditions.length > 0 && (
         <div className="bg-amber-900/20 rounded-xl p-6 border border-amber-500/30">
          <h3 className="text-lg font-semibold text-amber-200 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Conditions for Approval
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.conditions.map((cond, idx) => (
              <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                <span className="text-amber-500 font-bold">{idx + 1}.</span> {cond}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Monitoring KPIs (was EVV Metrics) */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-400" />
          EVV Monitoring KPIs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.monitoring_kpis?.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-slate-200 font-medium">{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
