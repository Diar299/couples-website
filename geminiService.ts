import { GoogleGenAI } from "@google/genai";

// We use a getter or a safe check to ensure we don't crash if process.env is briefly unavailable
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const enhanceLetter = async (draft: string): Promise<string> => {
  if (!draft) return "";
  
  const key = getApiKey();
  if (!key) {
    console.warn("API_KEY is missing. Letter enhancement will return the original draft.");
    return draft;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance the following romantic letter to be more poetic and heartfelt while keeping the original meaning. Return ONLY the enhanced text: \n\n${draft}`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text?.trim() || draft;
  } catch (error) {
    console.error("Gemini Error:", error);
    return draft;
  }
};

export const generateCaption = async (title: string): Promise<string> => {
  const key = getApiKey();
  if (!key) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, romantic 1-sentence caption for a memory titled "${title}".`,
    });
    return response.text?.trim() || "";
  } catch (error) {
    return "";
  }
};