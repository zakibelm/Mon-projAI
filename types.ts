
export interface PrincipleScores {
  stewardship: number;
  team: number;
  stakeholders: number;
  value: number;
  systems_thinking: number;
  leadership: number;
  tailoring: number;
  quality: number;
  complexity: number;
  risk: number;
  adaptability: number;
  change: number;
}

export interface DomainAnalysis {
  [key: string]: {
    score: number;
    insight: string;
  };
}

export interface OrchestratorResponse {
  decision: "APPROVED" | "REJECTED" | "CONDITIONAL";
  overall_score: number;
  principle_scores: PrincipleScores;
  domain_analysis: DomainAnalysis;
  
  action: string;
  conditions: string[];
  next_steps: string[];
  risks: string[];
  
  estimated_impact: Record<string, any>;
  monitoring_kpis: string[];
  success_criteria: string[];
  
  execution_time_ms?: number;
  cost_usd?: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'On Track' | 'At Risk' | 'Completed' | 'Planning';
  priority: 'Low' | 'Medium' | 'High';
  progress: number;
  deadline: string;
  budget_spent: number;
  budget_total: number;
  created_at: string;
  description?: string;
}

export type AnalysisStatus = 'idle' | 'initializing' | 'analyzing' | 'complete' | 'error';
