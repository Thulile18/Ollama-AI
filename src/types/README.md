# types

**What is in here:** descriptions of the information the app passes around.

Before the app uses a piece of information, such as a chat message, it is
described here: what it is called and what it must contain. This lets the
editor catch mistakes before the app is run.

| File | What it describes |
| --- | --- |
| `chat.ts` | One chat message: who sent it, what it says, and for AI replies how long it took |
| `ollama.ts` | What Ollama sends back, and the cleaned-up version the app uses |
