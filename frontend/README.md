# GameFlow Frontend

The user interface for GameFlow. It's a lightweight, vanilla HTML/JS application that connects to the backend via WebSockets to provide a chat interface for rule queries.

## 🚀 Usage

Since this is a static HTML site, you don't need a build step or a dedicated frontend server for local testing.

1.  **Ensure Backend is Running**: Make sure the FastAPI backend is running on `http://127.0.0.1:8000`.
2.  **Open the App**: Simply open `index.html` in your web browser.
    -   You can double-click the file in your file explorer.
    -   Or use a live server extension (like Live Server in VS Code) for a better experience.

## 🔌 Connection

The frontend attempts to connect to:
`ws://localhost:8000/ws`

-   **Green Status**: Connected and ready.
-   **Red Status**: Disconnected (check if the backend is running).
