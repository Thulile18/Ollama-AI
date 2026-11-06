# Ilanga - Local AI Chat

Ilanga (Zulu for "sun") is a simple React chat app that talks to an AI model running locally on my own computer through [Ollama](https://ollama.com). No cloud service or API key is needed.

## Features
- Chat interface where my messages appear on the right and the AI's replies on the left
- Loading spinner while the AI is generating a reply
- Total duration and tokens per second shown under every AI reply
- System message that gives the AI a name, a purpose and the name of the user
- Chat history saved in localStorage, so it stays after a page refresh
- "Clear chat" button to delete the saved history
- Error message if Ollama is not running or the model is missing
- Custom logo and favicon

## Tech Used
- React 18
- Vite
- Ollama (`/api/generate` endpoint)
- Model: `qwen2.5:0.5b` (under 1 GB)

## Getting Started

### 1. Install Ollama and download a model
1. Install Ollama for Windows: https://ollama.com/download/windows
2. Download the model:
   ```
   ollama pull qwen2.5:0.5b
   ```
3. Check that it is installed:
   ```
   ollama list
   ```

### 2. Run the app
Node.js is required (https://nodejs.org).

```
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Configuration
All settings are in `src/config.js`: the Ollama URL, model name, app name, user name, localStorage key and the system message. If you use a different model, change `MODEL_NAME` to match the name shown by `ollama list`.

## How It Works
The app sends a POST request to `http://localhost:11434/api/generate` with this body:

```json
{
  "model": "qwen2.5:0.5b",
  "system": "You are Ilanga, a helpful and friendly AI assistant...",
  "prompt": "the user's message",
  "stream": false
}
```

Ollama returns the answer along with timing data in nanoseconds:
- **Duration** = `total_duration` converted to seconds
- **Tokens per second** = `eval_count` divided by `eval_duration` (converted to seconds)

## Project Structure
```
src/
  config.js              all settings and the system message
  ollama.js              sends the request to Ollama and calculates timings
  App.jsx                chat state, localStorage, layout
  App.css                styling
  components/Message.jsx one chat bubble
public/
  favicon.svg            favicon
  logo.svg               app logo
```

## Known Limitation
The `/api/generate` endpoint only receives the latest prompt, so the AI does not remember earlier messages. The saved history is for display only.
## Logo and Favicon
The logo (public/logo.svg) shows in the header and on the welcome screen. The favicon (public/favicon.svg) is linked in index.html and shows in the browser tab. Both are SVG files of a sun, since Ilanga means sun in Zulu.

## Testing
Sent a prompt and saw the spinner, then the reply with the duration and tokens per second. Refreshed the page and the chat history stayed.

## Troubleshooting
If you see "ollama: command not found", install Ollama from ollama.com/download/windows, then close and reopen VS Code before running ollama pull.
