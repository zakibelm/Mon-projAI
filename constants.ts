// URL de base des webhooks n8n (à adapter si hébergé ailleurs)
export const N8N_API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5678/webhook/novaproject';

export const ORCHESTRATOR_SYSTEM_PROMPT = `You are the NovaProject Orchestrator, an expert AI assistant specializing in Project Management based on PMBOK Guide (7th Edition).
Your role is to analyze project management scenarios, make decisions, and provide strategic insights aligned with the 12 Principles of Project Management.

You must analyze the provided scenario and return a JSON response with the following structure:
- decision: "APPROVED", "REJECTED", or "CONDITIONAL"
- overall_score: 0-100 confidence score
- principle_scores: Object with scores (0-100) for each of the 12 principles: stewardship, team, stakeholders, value, systems_thinking, leadership, tailoring, quality, complexity, risk, adaptability, change.
- domain_analysis: Object where keys are relevant performance domains and values contain {score, insight}.
- decision_rationale: Explanation of the decision.
- key_tradeoffs: List of trade-offs considered.
- key_risks: List of critical risks.
- conditions_if_any: List of conditions if decision is CONDITIONAL.
- recommended_actions: List of next steps.
- evv_metrics_to_track: List of metrics for Earned Value/Velocity tracking.

Ensure your analysis is deep, critical, and actionable.`;

export interface VirtualAgent {
  id: string;
  name: string;
  role: string;
  mission: string;
  color: string;
  iconName: string; // Lucide icon name mapping
  principles: string[];
}

export const VIRTUAL_AGENTS: VirtualAgent[] = [
  {
    id: 'agent_value',
    name: 'Agent Stratégie',
    role: 'Gardien de la Valeur',
    mission: 'Maximiser le ROI, l\'alignement business et l\'éthique projet.',
    color: 'border-green-500 text-green-400 bg-green-500/10',
    iconName: 'TrendingUp',
    principles: ['Value', 'Stewardship', 'Team']
  },
  {
    id: 'agent_quality',
    name: 'Agent Système',
    role: 'Architecte Qualité',
    mission: 'Garantir la robustesse technique et la vision holistique.',
    color: 'border-blue-500 text-blue-400 bg-blue-500/10',
    iconName: 'Box',
    principles: ['Quality', 'Complexity', 'System Thinking']
  },
  {
    id: 'agent_change',
    name: 'Agent Humain',
    role: 'Leader Adaptation',
    mission: 'Faciliter le changement, l\'adoption et le leadership.',
    color: 'border-orange-500 text-orange-400 bg-orange-500/10',
    iconName: 'Users',
    principles: ['Change', 'Adaptability', 'Leadership']
  },
  {
    id: 'agent_risk',
    name: 'Agent Contrôle',
    role: 'Expert Planification',
    mission: 'Anticiper les risques, sécuriser les délais et adapter la méthode.',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    iconName: 'ShieldAlert',
    principles: ['Risk', 'Tailoring']
  },
  {
    id: 'agent_delivery',
    name: 'Agent Exécution',
    role: 'Directeur Livraison',
    mission: 'Assurer la faisabilité, le delivery et la mesure EVV.',
    color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    iconName: 'Truck',
    principles: ['Delivery', 'Stakeholders']
  }
];