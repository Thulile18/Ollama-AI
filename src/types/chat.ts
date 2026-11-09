// The shape of one message in the conversation.
// Describing it in one place means every file agrees on what a message contains.

// A message comes either from the person using the app or from the AI.
export type MessageRole = "user" | "ai";

export interface ChatMessage {
  id: number; // a unique number so React can tell messages apart
  role: MessageRole; // who sent it
  text: string; // what the message says
  isError?: boolean; // true when this is an error message from the app
  durationSeconds?: number; // AI replies only: how long the reply took
  tokensPerSecond?: number; // AI replies only: how fast it was written
}
