// COMPONENT: the spinner shown while the AI is working on a reply.

import { APP_NAME } from "../config/settings";

function LoadingBubble() {
  return (
    <div className="message-row ai">
      <div className="bubble ai-bubble loading-bubble">
        <div className="spinner" role="status" aria-label="Waiting for a reply"></div>
        <span>{APP_NAME} is thinking...</span>
      </div>
    </div>
  );
}

export default LoadingBubble;
