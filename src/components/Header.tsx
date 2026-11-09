// COMPONENT: the dark bar at the top.
// Shows the logo, the app name, the model in use, and the "Clear chat" button.

import { APP_NAME, MODEL_NAME } from "../config/settings";

interface HeaderProps {
  canClear: boolean; // false when there is nothing to clear
  onClearChat: () => void; // runs when "Clear chat" is clicked
}

function Header({ canClear, onClearChat }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <img src="/logo.svg" alt={APP_NAME + " logo"} className="brand-logo" />
        <div>
          <h1 className="brand-name">{APP_NAME}</h1>
          <p className="brand-model">Running {MODEL_NAME} on your computer</p>
        </div>
      </div>
      <button className="clear-button" onClick={onClearChat} disabled={!canClear}>
        Clear chat
      </button>
    </header>
  );
}

export default Header;
