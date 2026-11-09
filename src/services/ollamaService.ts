// SERVICE: talks to Ollama.
// This file has no screen code. Its only job is to send a prompt to the
// AI model running on this computer and bring the answer back.

import {
  OLLAMA_URL,
  MODEL_NAME,
  TEMPERATURE,
  SYSTEM_PROMPT,
  NANOSECONDS_PER_SECOND,
} from "../config/settings";
import type { OllamaApiResponse, OllamaReply } from "../types/ollama";

// Sends one prompt to Ollama and returns the answer plus timing details.
export async function askOllama(prompt: string): Promise<OllamaReply> {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      system: SYSTEM_PROMPT,
      prompt: prompt,
      stream: false, // wait for the full answer instead of streaming it
      options: { temperature: TEMPERATURE },
    }),
  });

  if (!response.ok) {
    throw new Error("Ollama replied with status " + response.status);
  }

  const data: OllamaApiResponse = await response.json();

  // total_duration: the whole request, in nanoseconds
  const durationSeconds = data.total_duration / NANOSECONDS_PER_SECOND;

  // eval_count: tokens written. eval_duration: time spent writing them.
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
