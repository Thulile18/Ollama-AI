// SERVICE: remembers the chat in the browser.
// This file has no screen code. Its only job is to save the conversation
// to localStorage and read it back, so the chat survives a page refresh.

import { STORAGE_KEY } from "../config/settings";
import type { ChatMessage } from "../types/chat";

// Reads the saved chat. If nothing is saved (or the saved data is broken)
// it returns an empty list, so the app starts with a fresh chat.
export function loadMessages(): ChatMessage[] {
  try {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText) {
      const savedMessages = JSON.parse(savedText);
      if (Array.isArray(savedMessages)) {
        return savedMessages;
      }
    }
  } catch (error) {
    console.error("Could not read the saved chat:", error);
  }
  return [];
}

// Saves the whole chat. Called every time the chat changes.
export function saveMessages(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Could not save the chat:", error);
  }
}
