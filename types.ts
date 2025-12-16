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
    insights?: string;
    insight?: string; // Fallback for backward compatibility
    risks?: string[];
    recommendations?: string[];
  };
}

export interface NextStep {
  action: string;
  owner?: string;
  deadline?: string;
  priority?: string;
}

export interface Risk {
  risk: string;
  probability?: string;
  impact?: string;
  mitigation?: string;
  contingency?: string;
  score?: number;
  owner?: string;
}

export interface MethodologyRecommendation {
  primary: string;
  rationale: string;
  confidence: string;
  implementation_details?: Record<string, any>;
  risks_methodology?: Array<{ risk: string; mitigation: string }>;
  alternative?: string;
}

export interface OrchestratorResponse {
  decision: "APPROVED" | "REJECTED" | "CONDITIONAL";
  overall_score: number;
  confidence_level?: string;
  
  principle_scores: PrincipleScores;
  principle_justifications?: Record<string, string>;
  
  domain_analysis: DomainAnalysis;
  methodology_recommendation?: MethodologyRecommendation;
  
  action: string;
  conditions: string[];
  
  next_steps: Array<NextStep | string>;
  risks: Array<Risk | string>;
  
  estimated_impact: Record<string, any>;
  monitoring_kpis: string[];
  success_criteria: string[];
  
  alternatives_considered?: Array<{ alternative: string; pros: string[]; cons: string[]; why_not_chosen: string }>;
  
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
