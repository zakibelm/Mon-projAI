import { GoogleGenAI, Type } from "@google/genai";
import { ORCHESTRATOR_SYSTEM_PROMPT } from '../constants';
import { OrchestratorResponse } from '../types';

export const analyzeScenario = async (scenario: string): Promise<OrchestratorResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is not configured in environment variables.");

  const ai = new GoogleGenAI({ apiKey });

  // Schema definition for strictly typed JSON output matching the new Mega-Prompt
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      decision: { type: Type.STRING, enum: ["APPROVED", "REJECTED", "CONDITIONAL"] },
      overall_score: { type: Type.NUMBER },
      confidence_level: { type: Type.STRING },
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
      principle_justifications: { type: Type.OBJECT },
      domain_analysis: { type: Type.OBJECT },
      action: { type: Type.STRING },
      conditions: { type: Type.ARRAY, items: { type: Type.STRING } },
      
      next_steps: { 
        type: Type.ARRAY, 
        items: { 
          type: Type.OBJECT,
          properties: {
             action: { type: Type.STRING },
             deadline: { type: Type.STRING },
             priority: { type: Type.STRING }
          }
        } 
      },
      
      risks: { 
        type: Type.ARRAY, 
        items: {
          type: Type.OBJECT,
          properties: {
             risk: { type: Type.STRING },
             probability: { type: Type.STRING },
             impact: { type: Type.STRING },
             mitigation: { type: Type.STRING },
             contingency: { type: Type.STRING },
             score: { type: Type.NUMBER }
          }
        }
      },
      
      estimated_impact: { type: Type.OBJECT },
      monitoring_kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
      success_criteria: { type: Type.ARRAY, items: { type: Type.STRING } },
      
      alternatives_considered: { 
        type: Type.ARRAY,
        items: {
           type: Type.OBJECT,
           properties: {
              alternative: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              why_not_chosen: { type: Type.STRING }
           }
        }
      }
    },
    required: [
      "decision",
      "overall_score",
      "principle_scores",
      "domain_analysis",
      "action",
      "conditions",
      "next_steps",
      "risks",
      "estimated_impact",
      "monitoring_kpis",
      "success_criteria"
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
