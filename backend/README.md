# GameFlow Backend

The backend for GameFlow, built with **FastAPI**. It handles WebSocket connections from the frontend, processes rule queries, and interfaces with the local AI model running on LM Studio.

## 📋 Prerequisites

-   **Python 3.8+**
-   **MongoDB**: Access to a MongoDB instance (default `mongodb://localhost:27017`).
-   **LM Studio**: You must have LM Studio installed and running.
    -   **Model**: We recommend using **qwen2.5** (e.g., `qwen2.5-7b-instruct`).
    -   **Server**: Start the Local Inference Server in LM Studio (default URL: `http://localhost:1234/v1`).

## ⚙️ Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create and activate a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install fastapi uvicorn openai pypdf motor
    ```

## 🚀 Usage

1.  **Start MongoDB**: Ensure your MongoDB instance is running.

2.  **Add Games**:
    -   Place your PDF rules (e.g., `regles_monopoly.pdf`) in the directory.
    -   Edit `add_game.py` to specify the games you want to add.
    -   Run the ingestion script:
        ```bash
        python add_game.py
        ```

3.  **Start the Server**:
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://127.0.0.1:8000`.

## 🧠 AI Configuration

The backend is configured to talk to LM Studio:
-   **Base URL**: `http://localhost:1234/v1`
-   **API Key**: `lm-studio` (default)

Ensure your LM Studio server is running before communicating with the bot.
