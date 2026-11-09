// All of the app's settings live in this one file.
// To change the model, the names or the storage key, edit it here
// and nothing else in the code needs to change.

// The Ollama address that generates a response
export const OLLAMA_URL = "http://localhost:11434/api/generate";

// The model you downloaded with `ollama pull <model>`.
// It must match a name shown by `ollama list`.
export const MODEL_NAME = "qwen2.5:0.5b";

// How random the AI's answers are. Lower = more focused and consistent,
// higher = more creative. A low value means less guessing.
// Ollama's own default is 0.8.
export const TEMPERATURE = 0.2;

// Names used on screen and in the system message
export const APP_NAME = "Ilanga";
export const USER_NAME = "Thulile";

// The key that localStorage uses to save the chat in the browser
export const STORAGE_KEY = "ilanga-chat-history";

// Ollama reports durations in nanoseconds. 1 second = 1,000,000,000 ns.
export const NANOSECONDS_PER_SECOND = 1000000000;

// The system message tells the model its name, its purpose,
// who it is talking to, and how to behave when it is unsure.
export const SYSTEM_PROMPT =
  "You are " + APP_NAME + ", a helpful and friendly AI assistant. " +
  "The person you are talking to is called " + USER_NAME + ". " +
  "You run locally on their computer using the " + MODEL_NAME + " model through Ollama. " +
  "You cannot browse the internet and you do not remember earlier messages in the chat. " +
  "Before you answer, read the question carefully and work out exactly what is being asked. " +
  "Answer that question directly, in a clear and complete way, using simple language. " +
  "Only state facts you are confident about. " +
  "Never invent names, numbers, dates, quotes, places or links. " +
  "If you are not sure, or you do not know, say so plainly, for example: " +
  "\"I'm not sure about that.\" " +
  "If the question is unclear, ask one short question to clarify instead of guessing.";