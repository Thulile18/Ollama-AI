// Shows one chat message.
// User messages sit on the right. AI messages sit on the left and
// show the duration and tokens per second underneath.

function Message({ message }) {
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
  const hasStats =
    !isUser && !message.isError && message.durationSeconds !== undefined;

  return (
    <div className={rowClass}>
      <div className={bubbleClass}>
        <p className="message-text">{message.text}</p>
        {hasStats && (
          <p className="message-stats">
            {message.durationSeconds.toFixed(2)} s total |{" "}
            {message.tokensPerSecond.toFixed(1)} tokens/sec
          </p>
        )}
      </div>
    </div>
  );
}

export default Message;
