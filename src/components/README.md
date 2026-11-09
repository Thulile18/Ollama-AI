# components

**What is in here:** the pieces of the screen you can see.

Think of each file as one building block of the page. Put the blocks together
and you get the whole chat window.

| File | What it is on screen |
| --- | --- |
| `Header.tsx` | The dark bar at the top with the logo, the app name and the "Clear chat" button |
| `WelcomeMessage.tsx` | The greeting shown before any messages exist |
| `MessageBubble.tsx` | One message. Yours sit on the right, the AI's on the left with its timing |
| `LoadingBubble.tsx` | The spinning circle shown while the AI is thinking |
| `ChatInput.tsx` | The box where you type, and the Send button |

Components only show things. They do not talk to Ollama and they do not save
anything. That work is done by the files in the `services` folder.
