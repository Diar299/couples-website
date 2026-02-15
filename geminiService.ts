export async function askGemini(prompt: string) {
  const r = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.error || "Gemini request failed");
  }

  const data = await r.json();
  return data.text; // string
}
