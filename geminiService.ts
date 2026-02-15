// geminiService.ts

export async function askGemini(prompt: string): Promise<string> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    let msg = "Gemini request failed";
    try {
      const err = await res.json();
      msg = err?.error || msg;
    } catch {}
    throw new Error(msg);
  }

  const data = await res.json();
  return data.text ?? "";
}

// ✅ Keep this name because AddMemoryModal.tsx imports it
export async function enhanceLetter(letter: string): Promise<string> {
  const prompt = `
You are helping improve a romantic love letter.
Rewrite the letter to be warmer, clearer, and more natural.
Keep the meaning. Do not add explicit content.
Return only the improved letter.

LETTER:
${letter}
  `.trim();

  return askGemini(prompt);
}
