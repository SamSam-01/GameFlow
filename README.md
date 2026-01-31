# GameFlow - AI Referee

GameFlow is an intelligent referee application designed to help players resolve rule disputes in board games, starting with Monopoly. It leverages a local AI model to interpret official rules and answer user questions in real-time.

## 🚀 Features

-   **AI-Powered Rule Arbitration**: Uses a local LLM (Large Language Model) to understand and explain game rules.
-   **Real-time Chat**: WebSocket-based chat interface for instant responses.
-   **PDF Rule Ingestion**: parses official rulebooks (PDF) to ground the AI's knowledge.

## 🛠️ Tech Stack

-   **Backend**: Python, FastAPI, WebSockets
-   **Frontend**: HTML5, JavaScript, CSS (Vanilla)
-   **AI Engine**: [LM Studio](https://lmstudio.ai/) running **qwen2.5** (or compatible local models).
-   **Libraries**: `openai` (for local API), `pypdf`

## 📂 Project Structure

-   `/backend`: Contains the FastAPI server, PDF parsing logic, and websocket handler.
-   `/frontend`: Contains the user interface (HTML/JS).

## ⚡ Quick Start

1.  **Set up LM Studio**: Load **qwen2.5** and start the local server on port `1234`.
2.  **Start Backend**: Navigate to `/backend` and run the FastAPI server.
3.  **Launch Frontend**: Open `/frontend/index.html` in your browser.

See the specific `README.md` files in each directory for detailed instructions.
