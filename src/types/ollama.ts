// The shapes of the data that go to and come back from Ollama.

// The parts of Ollama's raw answer that this app uses.
// Ollama sends more fields, but these are the only ones we read.
export interface OllamaApiResponse {
  response: string; // the AI's answer text
  total_duration: number; // whole request time, in nanoseconds
  eval_count: number; // how many tokens the AI wrote
  eval_duration: number; // time spent writing those tokens, in nanoseconds
}

// The cleaned-up answer that the rest of the app works with.
export interface OllamaReply {
  text: string;
  durationSeconds: number;
  tokensPerSecond: number;
}
