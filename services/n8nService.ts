
import { N8N_API_BASE_URL } from '../constants';
import { OrchestratorResponse, Project } from '../types';

// --- RICH MOCK DATA ---
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'On Track',
    priority: 'High',
    progress: 75,
    deadline: 'Oct 24, 2024',
    budget_spent: 45000,
    budget_total: 60000,
    created_at: new Date().toISOString(),
    description: "Complete overhaul of the corporate website with new branding."
  },
  {
    id: 'PRJ-002',
    name: 'Q3 Marketing Campaign',
    client: 'Dept: Marketing',
    status: 'Planning',
    priority: 'Medium',
    progress: 15,
    deadline: 'Nov 15, 2024',
    budget_spent: 5000,
    budget_total: 25000,
    created_at: new Date().toISOString(),
    description: "Social media and email campaign for Q3 product launch."
  },
  {
    id: 'PRJ-003',
    name: 'Mobile App V2',
    client: 'Client: Internal',
    status: 'At Risk',
    priority: 'Low',
    progress: 40,
    deadline: 'Oct 01, 2024',
    budget_spent: 85000,
    budget_total: 100000,
    created_at: new Date().toISOString(),
    description: "Version 2.0 of the customer facing mobile application."
  },
  {
    id: 'PRJ-004',
    name: 'Security Audit',
    client: 'Dept: IT Ops',
    status: 'On Track',
    priority: 'High',
    progress: 90,
    deadline: 'Oct 12, 2024',
    budget_spent: 12000,
    budget_total: 15000,
    created_at: new Date().toISOString(),
    description: "Annual security compliance audit and penetration testing."
  }
];

const MOCK_DECISION: OrchestratorResponse = {
  decision: "APPROVED",
  overall_score: 94,
  principle_scores: {
    stewardship: 95, team: 90, stakeholders: 85, value: 98, systems_thinking: 80,
    leadership: 92, tailoring: 85, quality: 88, complexity: 75, risk: 70,
    adaptability: 85, change: 80
  },
  domain_analysis: {
    "Strategic Alignment": { score: 98, insight: "Strong alignment with business goals." },
    "Value Delivery": { score: 92, insight: "High ROI potential identified." }
  },
  action: "Authorized to proceed with the database migration. The risk profile is acceptable given the mitigation strategies for data consistency.",
  conditions: [],
  next_steps: ["Update estimation buffer for future tasks (+20%)", "Create a standardized pre-migration checklist"],
  risks: ["Legacy data inconsistencies", "Temporary downtime window exceeding 4h"],
  estimated_impact: { 
    "Query Performance": "30% faster load times", 
    "Budget Variance": "Over budget by $200", 
    "Security Compliance": "SOC2 Standards met" 
  },
  monitoring_kpis: ["Migration Success Rate", "System Latency"],
  success_criteria: ["Zero data loss", "Rollback time < 15min"],
  execution_time_ms: 845,
  cost_usd: 0.02
};

export const getProjects = async (): Promise<Project[]> => {
  // Simulation d'appel API
  await new Promise(resolve => setTimeout(resolve, 600));
  return MOCK_PROJECTS;
};

export const initializeProject = async (): Promise<Project> => {
  return MOCK_PROJECTS[0];
};

export const analyzeDecision = async (projectId: string, request: string): Promise<OrchestratorResponse> => {
  try {
    const res = await fetch(`${N8N_API_BASE_URL}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        request: request,
        request_type: 'general',
        user: 'web_user'
      })
    });

    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();

    if (!json.pmbok_evaluation) throw new Error("Invalid format");

    return {
      ...json.pmbok_evaluation,
      execution_time_ms: json.execution_time_ms,
      cost_usd: json.cost_usd
    };

  } catch (error) {
    console.warn("API Error, using mock decision.", error);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_DECISION;
  }
};
