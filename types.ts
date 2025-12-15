export interface Agent {
  id: string;
  name: string;
  description: string;
  color: string;
  principles: string[];
}

export interface TradeOff {
  dimension: string;
  decision: string;
  justification: string;
}

export interface EstimatedImpact {
  timeline_days: number;
  budget_usd: number;
  quality_score: number;
  business_value: string;
}

export interface OrchestratorResponse {
  decision_summary: string;
  context_analysis: string;
  agents_consulted: string[];
  key_tradeoffs: TradeOff[];
  final_decision: string;
  estimated_impact: EstimatedImpact;
  identified_risks: string[];
  success_criteria: string[];
  evv_metrics_to_track: string[];
}

export type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';
