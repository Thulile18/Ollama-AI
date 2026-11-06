// Settings for the whole app: Ollama URL, model name, names and system message
// All of the app's settings live in this one file.
// To change the model, the names or the storage key, edit it here
// and nothing else in the code needs to change.

// The Ollama endpoint that generates a response
export const OLLAMA_URL = "http://localhost:11434/api/generate";

// The model you downloaded with `ollama pull <model>`.
// It must match a name shown by `ollama list`.
export const MODEL_NAME = "qwen2.5:0.5b";

// Names used in the interface and in the system message
export const APP_NAME = "Ilanga";
export const USER_NAME = "Dlozi";

// The key that localStorage uses to save the chat in the browser
export const STORAGE_KEY = "ilanga-chat-history";

// Ollama reports durations in nanoseconds. 1 second = 1,000,000,000 ns.
export const NANOSECONDS_PER_SECOND = 1000000000;

// The system message tells the model its purpose, its name,
// and who it is talking to.
export const SYSTEM_PROMPT =
  "You are " + APP_NAME + ", a helpful and friendly AI assistant. " +
  "You are helping " + USER_NAME + ". " +
  "Keep your answers clear and easy to understand.";
