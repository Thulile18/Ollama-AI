import {
  OLLAMA_URL,
  MODEL_NAME,
  SYSTEM_PROMPT,
  NANOSECONDS_PER_SECOND,
} from "./config";

// Sends one prompt to Ollama and returns the answer plus timing details.
export async function askOllama(prompt) {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      system: SYSTEM_PROMPT,
      prompt: prompt,
      stream: false, // wait for the full answer instead of streaming it
    }),
  });

  if (!response.ok) {
    throw new Error("Ollama replied with status " + response.status);
  }

  const data = await response.json();

  // total_duration: the whole request, in nanoseconds
  const durationSeconds = data.total_duration / NANOSECONDS_PER_SECOND;

  // eval_count: tokens generated. eval_duration: time spent generating them.
  const generationSeconds = data.eval_duration / NANOSECONDS_PER_SECOND;
  let tokensPerSecond = 0;
  if (generationSeconds > 0) {
    tokensPerSecond = data.eval_count / generationSeconds;
  }

  return {
    text: data.response,
    durationSeconds: durationSeconds,
    tokensPerSecond: tokensPerSecond,
  };
}
