# services

**What is in here:** the jobs that happen behind the scenes.

A service has no buttons and nothing to look at. It does one job and hands the
result back to the screen.

| File | Its job |
| --- | --- |
| `ollamaService.ts` | Sends your question to the AI (Ollama) and brings the answer back, with how long it took and how fast it was written |
| `storageService.ts` | Saves the chat in your browser and reads it back, so your messages are still there after a refresh |

If something is wrong with the AI's answers, look in `ollamaService.ts`.
If something is wrong with saved messages, look in `storageService.ts`.
