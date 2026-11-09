// COMPONENT: the greeting shown when the chat is empty.

import { APP_NAME, USER_NAME } from "../config/settings";

function WelcomeMessage() {
  return (
    <div className="empty-state">
      <img src="/logo.svg" alt={APP_NAME + " logo"} className="empty-logo" />
      <h2>Hi {USER_NAME}, what can I help with?</h2>
      <p>Type a message below to start chatting with {APP_NAME}.</p>
    </div>
  );
}

export default WelcomeMessage;
