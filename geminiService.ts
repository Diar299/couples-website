import { GoogleGenAI } from "@google/genai";

export const enhanceLetter = async (draft: string): Promise<string> => {
  if (!draft) return "";
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance the following romantic letter to be more poetic and heartfelt while keeping the original meaning. Return ONLY the enhanced text: \n\n${draft}`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text?.trim() || draft;
  } catch (error) {
    console.error("Gemini Enhancement Error:", error);
    return draft;
  }
};

export const generateCaption = async (title: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, romantic 1-sentence caption for a memory titled "${title}".`,
    });
    return response.text?.trim() || "";
  } catch (error) {
    return "";
  }
};
