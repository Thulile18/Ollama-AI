// The main screen. It keeps track of the conversation and connects the
// components (what you see) to the services (what happens behind the scenes).

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import WelcomeMessage from "./components/WelcomeMessage";
import MessageBubble from "./components/MessageBubble";
import LoadingBubble from "./components/LoadingBubble";
import ChatInput from "./components/ChatInput";
import { askOllama } from "./services/ollamaService";
import { loadMessages, saveMessages } from "./services/storageService";
import { MODEL_NAME } from "./config/settings";
import type { ChatMessage } from "./types/chat";

function App() {
  // The conversation. Passing the function (not calling it) means the saved
  // chat is read only once, when the app first loads.
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // An empty element at the bottom of the chat, so we can scroll to it
  // when new messages arrive.
  const bottomRef = useRef<HTMLDivElement>(null);

  // Save the chat every time it changes.
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Scroll down when messages change or the spinner appears.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend() {
    const prompt = input.trim();
    if (prompt === "" || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: prompt,
    };
    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askOllama(prompt);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: reply.text,
        durationSeconds: reply.durationSeconds,
        tokensPerSecond: reply.tokensPerSecond,
      };
      setMessages((previous) => [...previous, aiMessage]);
    } catch (error) {
      console.error("Request to Ollama failed:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "ai",
        isError: true,
        text:
          "I could not reach Ollama. Make sure Ollama is running and that " +
          'the model "' + MODEL_NAME + '" is downloaded (check with `ollama list`).',
      };
      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearChat() {
    setMessages([]);
  }

  return (
    <div className="app">
      <Header canClear={messages.length > 0} onClearChat={handleClearChat} />

      <main className="chat">
        {messages.length === 0 && !isLoading && <WelcomeMessage />}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <LoadingBubble />}

        <div ref={bottomRef}></div>
      </main>

      <ChatInput
        value={input}
        isLoading={isLoading}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

export default App;
