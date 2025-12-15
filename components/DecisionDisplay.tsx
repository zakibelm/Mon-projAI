import React from 'react';
import { OrchestratorResponse } from '../types';
import { 
  BarChart2, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  TrendingUp,
  BrainCircuit,
  Scale,
  Clock,
  DollarSign
} from 'lucide-react';

interface DecisionDisplayProps {
  data: OrchestratorResponse;
}

export const DecisionDisplay: React.FC<DecisionDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Summary Header */}
      <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-indigo-500 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
          Orchestrator Decision
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          {data.final_decision}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Context & Summary */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Strategic Context
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Decision Summary</h4>
              <p className="text-slate-300">{data.decision_summary}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Context Analysis</h4>
              <p className="text-slate-300 text-sm">{data.context_analysis}</p>
            </div>
          </div>
        </div>

        {/* Estimated Impact */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Estimated Impact
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-800 rounded-lg">
              <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Timeline
              </div>
              <div className="text-xl font-mono text-white">
                {data.estimated_impact.timeline_days > 0 ? `+${data.estimated_impact.timeline_days} days` : 'Neutral'}
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Budget
              </div>
              <div className="text-xl font-mono text-white">
                ${data.estimated_impact.budget_usd.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <div className="text-slate-400 text-xs mb-1">Quality Score</div>
              <div className="text-xl font-mono text-white">
                {data.estimated_impact.quality_score}/100
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <div className="text-slate-400 text-xs mb-1">Biz Value</div>
              <div className="text-sm font-mono text-white truncate" title={data.estimated_impact.business_value}>
                {data.estimated_impact.business_value}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade-offs */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-orange-400" />
          Key Trade-offs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.key_tradeoffs.map((tradeoff, idx) => (
            <div key={idx} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <div className="font-medium text-indigo-300 mb-1">{tradeoff.dimension}</div>
              <div className="text-white text-sm font-semibold mb-2">{tradeoff.decision}</div>
              <div className="text-slate-400 text-xs italic">"{tradeoff.justification}"</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Risks */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Identified Risks
          </h3>
          <ul className="space-y-2">
            {data.identified_risks.map((risk, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span> {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Success Criteria */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-400" />
            Success Criteria
          </h3>
          <ul className="space-y-2">
            {data.success_criteria.map((criteria, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span> {criteria}
              </li>
            ))}
          </ul>
        </div>

         {/* EVV Metrics */}
         <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            EVV Metrics
          </h3>
          <ul className="space-y-2">
            {data.evv_metrics_to_track.map((metric, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span> {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
