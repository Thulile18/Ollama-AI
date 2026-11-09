// COMPONENT: one chat message.
// Messages from the user sit on the right. Messages from the AI sit on the
// left and show the duration and tokens per second underneath.

import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  let rowClass = "message-row ai";
  if (isUser) {
    rowClass = "message-row user";
  }

  let bubbleClass = "bubble ai-bubble";
  if (isUser) {
    bubbleClass = "bubble user-bubble";
  } else if (message.isError) {
    bubbleClass = "bubble ai-bubble error-bubble";
  }

  // Only real AI answers have timing information
  const showStats =
    !isUser &&
    !message.isError &&
    message.durationSeconds !== undefined &&
    message.tokensPerSecond !== undefined;

  return (
    <div className={rowClass}>
      <div className={bubbleClass}>
        <p className="message-text">{message.text}</p>
        {showStats && (
          <p className="message-stats">
            {message.durationSeconds?.toFixed(2)} s total |{" "}
            {message.tokensPerSecond?.toFixed(1)} tokens/sec
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
