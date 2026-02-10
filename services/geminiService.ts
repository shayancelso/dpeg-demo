import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: We are using a factory function or recreating it in calls to ensure 
// we catch the latest key if it changes (though usually env is static).
const getAIClient = () => {
    const key = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || process.env.GEMINI_API_KEY;
    return new GoogleGenAI({ apiKey: key });
}

export const generateExecutiveSummary = async (metrics: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Principal Financial Analyst for a Private Equity firm. 
      Analyze the following raw financial metrics provided in JSON format. 
      Provide a concise, 3-bullet point executive summary highlighting risks and opportunities.
      
      Metrics: ${metrics}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for speed on flash
      }
    });
    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate AI summary. Please check API Key configuration.";
  }
};

export const generateInvestorCommunication = async (
  investorName: string, 
  project: string, 
  type: 'Capital Call' | 'Distribution' | 'Update'
): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional Private Equity email for ${type}.
      To: Investor ${investorName}
      Project: ${project}
      Tone: Professional, reassuring, and concise.
      Context: We are valuing their partnership.`,
    });
    return response.text || "Draft generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating draft.";
  }
};

export const predictNextBestAction = async (investorProfile: string): Promise<string[]> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `You are an AI Relationship Manager Assistant. 
            Based on the following investor profile JSON, suggest 3 specific "Next Best Actions" 
            to increase retention or secure new capital. Return ONLY a JSON array of strings.
            
            Profile: ${investorProfile}`,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const text = response.text;
        if (!text) return ["Review portfolio manually", "Schedule check-in call"];
        
        return JSON.parse(text) as string[];
    } catch (error) {
        console.error("Gemini API Error", error);
        return ["Review investor file", "Update contact info"];
    }
}

export const analyzeFinancialScenario = async (inputs: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `You are a Real Estate Underwriting Expert.
            The user is running a 'What-If' scenario for a Commercial Real Estate deal.
            
            Here are the input parameters (JSON): ${inputs}
            
            Provide a short, 3-sentence qualitative risk assessment. 
            Focus on how the Interest Rate and Exit Cap Rate combination affects the exit strategy.`,
        });
        return response.text || "Analysis unavailable.";
    } catch (error) {
        return "Unable to generate risk analysis.";
    }
}

export const generateDocumentContent = async (templateType: string, investorName: string, dataPoints: any): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a formal legal/financial document content (HTML format, just the body tags content).
            Type: ${templateType}
            Investor: ${investorName}
            Data: ${JSON.stringify(dataPoints)}
            
            Ensure it looks like a formal letter. Use <p>, <ul>, <li>, <strong> tags.
            Do not include <html> or <body> tags.`,
        });
        return response.text || "<p>Error generating content.</p>";
    } catch (error) {
        return "<p>Error connecting to generation service.</p>";
    }
}
