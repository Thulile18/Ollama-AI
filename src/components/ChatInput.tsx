// COMPONENT: the message box and Send button at the bottom.
// Enter sends the message. Shift + Enter starts a new line.

import type { KeyboardEvent } from "react";
import { APP_NAME } from "../config/settings";

interface ChatInputProps {
  value: string; // the text currently typed
  isLoading: boolean; // true while waiting for the AI
  onChange: (newValue: string) => void; // runs when the person types
  onSend: () => void; // runs when Send (or Enter) is used
}

function ChatInput({ value, isLoading, onChange, onSend }: ChatInputProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <footer className="composer">
      <textarea
        className="composer-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={"Ask " + APP_NAME + " anything"}
        rows={1}
        disabled={isLoading}
      />
      <button
        className="send-button"
        onClick={onSend}
        disabled={isLoading || value.trim() === ""}
      >
        Send
      </button>
    </footer>
  );
}

export default ChatInput;
