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

// Structure retournée par le workflow n8n (noeud "Claude PMBOK Agent")
export interface OrchestratorResponse {
  decision: "APPROVED" | "REJECTED" | "CONDITIONAL";
  overall_score: number;
  principle_scores: PrincipleScores;
  domain_analysis: DomainAnalysis;
  
  // Nouveaux champs alignés sur le workflow n8n
  action: string; // Remplace decision_rationale
  conditions: string[]; // Remplace conditions_if_any
  next_steps: string[]; // Remplace recommended_actions
  risks: string[]; // Remplace key_risks
  
  estimated_impact: Record<string, any>; // Nouveau
  monitoring_kpis: string[]; // Remplace evv_metrics_to_track
  success_criteria: string[]; // Nouveau
  
  // Métadonnées d'exécution
  execution_time_ms?: number;
  cost_usd?: number;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

export type AnalysisStatus = 'idle' | 'initializing' | 'analyzing' | 'complete' | 'error';
