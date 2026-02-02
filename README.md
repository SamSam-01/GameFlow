# GameFlow - AI Referee

GameFlow is an intelligent referee application designed to help players resolve rule disputes in board games, starting with Monopoly. It leverages a local AI model to interpret official rules and answer user questions in real-time through a modern, premium interface.

## 🚀 Features

-   **AI-Powered Rule Arbitration**: Uses a local LLM (Large Language Model) to understand and explain game rules.
-   **Real-time Chat**: WebSocket-based chat interface for instant responses.
-   **Dynamic Game Loading**: Automatically lists available games from the database.
-   **Markdown Support**: Rich text formatting in chat (lists, bold, italic).
-   **Modern UI**: Built with Vue 3 & Vite, featuring a responsive Glassmorphism design and dark mode.
-   **PDF Rule Ingestion**: Parses official rulebooks (PDF) to ground the AI's knowledge.

## 🛠️ Tech Stack

-   **Backend**: Python, FastAPI, WebSockets
-   **Database**: MongoDB (motor, pymongo)
-   **Frontend**: Vue 3, Vite, Vanilla CSS (Glassmorphism)
-   **AI Engine**: [LM Studio](https://lmstudio.ai/) running **qwen2.5** (or compatible local models).
-   **Libraries**: `openai` (for local API), `pypdf`, `motor`, `marked`, `dompurify`

## 📂 Project Structure

-   `/backend`: Contains the FastAPI server, PDF parsing logic, database initialization (`add_game.py`), and websocket handler.
-   `/frontend`: Contains the VueJS source code, Vite configuration, and static assets.
-   `docker-compose.yml`: Orchestrates Backend, Frontend (dev server), and MongoDB.

## ⚡ Quick Start

1.  **Set up LM Studio**:
    -   Load **qwen2.5** (or compatible model).
    -   Start the local server on port `1234`.
    -   **IMPORTANT**: Enable the option **"Serve on Local Network"** to allow the containerized backend to access it.

2.  **Environment Setup**:
    -   Copy `.env.template` to `.env`: `cp .env.template .env`
    -   Adjust variables if necessary.

3.  **Run with Docker Compose (Recommended)**:
    -   Run `docker compose up --build`
    -   **Initialize Database**: The first time, you must ingest rules:
        ```bash
        # From the host machine
        docker compose exec backend python3 add_game.py
        ```
    -   **Access the App**: Open [http://localhost:8080](http://localhost:8080).

4.  **Manual Start**:
    -   **Backend**: `cd backend && uvicorn main:app --reload`
    -   **Frontend**: `cd frontend && npm install && npm run dev`

See the specific `README.md` files in each directory for detailed instructions.
