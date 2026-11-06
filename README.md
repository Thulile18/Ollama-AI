# Ilanga - Local AI Chat (React + Ollama)

Ilanga is the Zulu word for "sun". This app is a simple chat interface
that talks to a model running on your own computer through Ollama.

## 1. Install Ollama and download a model
1. Install Ollama for Windows: https://ollama.com/download/windows
2. Pick a model under 1 GB from https://ollama.com/library
3. Download it, for example:  `ollama pull qwen2.5:0.5b`
4. Check it with:  `ollama list`

## 2. Run the app
You need Node.js installed (https://nodejs.org).

    npm install
    npm run dev

Open the address shown in the terminal (usually http://localhost:5173).

## 3. Change settings
Everything configurable is in `src/config.js`: the model name, your name,
the app name, the Ollama URL and the localStorage key.
If you pull a different model, change `MODEL_NAME` to match `ollama list`.

## Project structure
- `src/config.js` - all settings and the system message
- `src/ollama.js` - sends the request to Ollama, calculates duration and tokens/sec
- `src/App.jsx` - chat state, localStorage saving/loading, layout
- `src/components/Message.jsx` - one chat bubble
- `src/App.css` - styling
- `public/favicon.svg`, `public/logo.svg` - favicon and logo
