import { useState, useEffect, useRef } from "react";
import Message from "./components/Message.jsx";
import { askOllama } from "./ollama.js";
import { APP_NAME, USER_NAME, MODEL_NAME, STORAGE_KEY } from "./config.js";

// Reads the saved chat from localStorage.
// If nothing is saved (or the data is broken) we start with an empty chat.
function loadSavedMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Could not read saved chat:", error);
  }
  return [];
}

function App() {
  // The chat history. Passing the function (not calling it) means we only
  // read localStorage once, when the app first loads.
  const [messages, setMessages] = useState(loadSavedMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // A reference to an empty element at the bottom of the chat,
  // so we can scroll to it when new messages arrive.
  const bottomRef = useRef(null);

  // Save the chat every time it changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Could not save chat:", error);
    }
  }, [messages]);

  // Scroll down when messages change or the spinner appears.
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend() {
    const prompt = input.trim();
    if (prompt === "" || isLoading) {
      return;
    }

    const userMessage = { id: Date.now(), role: "user", text: prompt };
    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await askOllama(prompt);
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: result.text,
        durationSeconds: result.durationSeconds,
        tokensPerSecond: result.tokensPerSecond,
      };
      setMessages((previous) => [...previous, aiMessage]);
    } catch (error) {
      console.error("Request to Ollama failed:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "ai",
        isError: true,
        text:
          "I could not reach Ollama. Make sure Ollama is running and that " +
          "the model \"" + MODEL_NAME + "\" is downloaded (check with `ollama list`).",
      };
      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  // Enter sends the message. Shift+Enter adds a new line.
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleClearChat() {
    setMessages([]);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <img src="/logo.svg" alt="" className="brand-logo" />
          <div>
            <h1 className="brand-name">{APP_NAME}</h1>
            <p className="brand-model">Running {MODEL_NAME} on your computer</p>
          </div>
        </div>
        <button
          className="clear-button"
          onClick={handleClearChat}
          disabled={messages.length === 0}
        >
          Clear chat
        </button>
      </header>

      <main className="chat">
        {messages.length === 0 && !isLoading && (
          <div className="empty-state">
            <img src="/logo.svg" alt="" className="empty-logo" />
            <h2>Hi {USER_NAME}, what can I help with?</h2>
            <p>Type a message below to start chatting with {APP_NAME}.</p>
          </div>
        )}

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="message-row ai">
            <div className="bubble ai-bubble loading-bubble">
              <div className="spinner" role="status" aria-label="Waiting for a reply"></div>
              <span>{APP_NAME} is thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </main>

      <footer className="composer">
        <textarea
          className="composer-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={"Message " + APP_NAME}
          rows={1}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isLoading || input.trim() === ""}
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default App;
