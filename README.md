# Ilanga - Local AI Chat

Socialify Image

<img src="https://socialify.git.ci/Thulile18/Ollama-AI/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Ollama-AI" width="640" height="320" />

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
- Model: `qwen2.5:0.5b` (397 MB, under the 1 GB limit)

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
All settings are in `src/config.js`: the Ollama URL, model name, app name, user name, localStorage key and the system message. Nothing is hardcoded in the components. If you use a different model, change `MODEL_NAME` to match the name shown by `ollama list`.

## How It Works
The app sends a POST request to `http://localhost:11434/api/generate` with this body:

```json
{
  "model": "gemma3:1b",
  "system": "Your name is Ilanga. You are an AI assistant running on the user's computer...",
  "prompt": "the user's message",
  "stream": false,
  "options": { "temperature": 0.2 }
}
```

The `system` field tells the AI its name, its purpose and who it is talking to.

Ollama returns the answer along with timing data in nanoseconds:
- **Duration** = `total_duration` converted to seconds
- **Tokens per second** = `eval_count` divided by `eval_duration` (converted to seconds)

### Chat history
Every time the chat changes, the messages are saved to localStorage. When the page loads, they are read back, so the conversation is still there after a refresh. "Clear chat" empties it.

## Logo and Favicon
The logo (`public/logo.svg`) is a sun shaped like a chat bubble, since Ilanga means sun in Zulu and this is a chat app. It shows in the header and on the welcome screen.

The favicon (`public/favicon.svg`) is a separate sunrise icon, linked in `index.html`, that shows in the browser tab.

## Project Structure
```
index.html               page shell, favicon link and title
src/
  main.jsx               starts the React app
  config.js              all settings and the system message
  ollama.js              sends the request to Ollama and calculates timings
  App.jsx                chat state, localStorage, layout
  App.css                styling
  components/Message.jsx one chat bubble
public/
  favicon.svg            favicon
  logo.svg               app logo
```

## Testing
- Sent a prompt and saw the spinner, then the reply with the duration and tokens per second underneath.
- Refreshed the page and the chat history stayed.
- Asked "who are you?" to check the system message. The AI used its name, Ilanga.

## Known Limitations
- The `/api/generate` endpoint only receives the latest prompt, so the AI.
- Small local models can still give wrong answers. I lowered the temperature and told the AI to say when it is unsure, which reduced guessing but did not remove it.
