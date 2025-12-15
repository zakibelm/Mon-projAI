import { GoogleGenAI, Type } from "@google/genai";
import { ORCHESTRATOR_SYSTEM_PROMPT } from '../constants';
import { OrchestratorResponse } from '../types';

export const analyzeScenario = async (scenario: string): Promise<OrchestratorResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is not configured in environment variables.");

  const ai = new GoogleGenAI({ apiKey });

  // Schema definition for strictly typed JSON output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      decision_summary: { type: Type.STRING },
      context_analysis: { type: Type.STRING },
      agents_consulted: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      key_tradeoffs: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            dimension: { type: Type.STRING },
            decision: { type: Type.STRING },
            justification: { type: Type.STRING }
          }
        }
      },
      final_decision: { type: Type.STRING },
      estimated_impact: {
        type: Type.OBJECT,
        properties: {
          timeline_days: { type: Type.NUMBER },
          budget_usd: { type: Type.NUMBER },
          quality_score: { type: Type.NUMBER },
          business_value: { type: Type.STRING }
        }
      },
      identified_risks: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      success_criteria: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      evv_metrics_to_track: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      }
    },
    required: [
      "decision_summary",
      "context_analysis",
      "agents_consulted",
      "key_tradeoffs",
      "final_decision",
      "estimated_impact",
      "identified_risks",
      "success_criteria",
      "evv_metrics_to_track"
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: scenario,
      config: {
        systemInstruction: ORCHESTRATOR_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for deterministic, factual outputs
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    try {
      return JSON.parse(text) as OrchestratorResponse;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.log("Raw text:", text);
      throw new Error("Failed to parse Gemini response as JSON");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
