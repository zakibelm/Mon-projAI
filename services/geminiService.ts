import { GoogleGenAI, Type } from "@google/genai";
import { ORCHESTRATOR_SYSTEM_PROMPT } from '../constants';
import { OrchestratorResponse } from '../types';

export const analyzeScenario = async (scenario: string): Promise<OrchestratorResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is not configured in environment variables.");

  const ai = new GoogleGenAI({ apiKey });

  // Schema definition for strictly typed JSON output matching the new prompt
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      decision: { type: Type.STRING, enum: ["APPROVED", "REJECTED", "CONDITIONAL"] },
      overall_score: { type: Type.NUMBER },
      principle_scores: {
        type: Type.OBJECT,
        properties: {
          stewardship: { type: Type.NUMBER },
          team: { type: Type.NUMBER },
          stakeholders: { type: Type.NUMBER },
          value: { type: Type.NUMBER },
          systems_thinking: { type: Type.NUMBER },
          leadership: { type: Type.NUMBER },
          tailoring: { type: Type.NUMBER },
          quality: { type: Type.NUMBER },
          complexity: { type: Type.NUMBER },
          risk: { type: Type.NUMBER },
          adaptability: { type: Type.NUMBER },
          change: { type: Type.NUMBER }
        },
        required: [
          "stewardship", "team", "stakeholders", "value", "systems_thinking", 
          "leadership", "tailoring", "quality", "complexity", "risk", 
          "adaptability", "change"
        ]
      },
      domain_analysis: {
        type: Type.OBJECT,
        description: "Analysis of relevant PMBOK domains. Keys are domain names, values are objects with score and insight.",
        // We leave properties open-ended or loosely defined as the prompt says "Analyse les domaines pertinents"
      },
      decision_rationale: { type: Type.STRING },
      key_tradeoffs: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      key_risks: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      conditions_if_any: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      recommended_actions: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      evv_metrics_to_track: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      }
    },
    required: [
      "decision",
      "overall_score",
      "principle_scores",
      "domain_analysis",
      "decision_rationale",
      "key_tradeoffs",
      "key_risks",
      "recommended_actions",
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
        temperature: 0.2,
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
