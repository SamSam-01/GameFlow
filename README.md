# GameFlow - AI Referee

GameFlow is an intelligent referee application designed to help players resolve rule disputes in board games, starting with Monopoly. It leverages a local AI model to interpret official rules and answer user questions in real-time.

## 🚀 Features

-   **AI-Powered Rule Arbitration**: Uses a local LLM (Large Language Model) to understand and explain game rules.
-   **Multi-Game Support**: Dynamically switch between games (e.g., Monopoly, Uno).
-   **Real-time Chat**: WebSocket-based chat interface for instant responses.
-   **PDF Rule Ingestion**: parses official rulebooks (PDF) to ground the AI's knowledge.

## 🛠️ Tech Stack

-   **Backend**: Python, FastAPI, WebSockets
-   **Database**: MongoDB (for storing rules and prompts)
-   **Frontend**: HTML5, JavaScript, CSS (Vanilla)
-   **AI Engine**: [LM Studio](https://lmstudio.ai/) running **qwen2.5** (or compatible local models).
-   **Libraries**: `openai` (for local API), `pypdf`, `motor` (MongoDB async driver)

## 📂 Project Structure

-   `/backend`: Contains the FastAPI server, PDF parsing logic, and websocket handler.
-   `/frontend`: Contains the user interface (HTML/JS).

## ⚡ Quick Start

1.  **Set up LM Studio**:
    -   Load **qwen2.5** (or compatible model).
    -   Start the local server on port `1234`.
    -   **IMPORTANT**: Enable the option **"Serve on Local Network"** to allow the containerized backend to access it.
2.  **Environment Setup**:
    -   Copy `.env.template` to `.env`: `cp .env.template .env`
    -   Adjust variables if necessary (e.g., if your local IP differs).
3.  **Run with Docker Compose (Recommended)**:
    -   Run `docker compose up --build`
    -   **Initialize Database**:
        ```bash
        docker compose exec backend python add_game.py
        ```
        This loads the default games (Monopoly, Uno) into MongoDB.
4.  **Manual Start**:
    -   **Database**: Ensure MongoDB is running.
    -   **Backend**: `cd backend && uvicorn main:app --reload`
    -   **Frontend**: Open `/frontend/index.html`

See the specific `README.md` files in each directory for detailed instructions.
