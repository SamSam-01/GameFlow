# GameFlow Frontend

The modern frontend for GameFlow, built with **Vue 3** and **Vite**. It features a premium "Glassmorphism" design and WebSocket-based real-time chat.

## 🛠️ Tech Stack

-   **Framework**: Vue 3 (Composition API)
-   **Build Tool**: Vite
-   **Routing**: Vue Router
-   **HTTP Client**: Axios
-   **Markdown Rendering**: `marked` + `dompurify`
-   **Styling**: Vanilla CSS (Variables, Flexbox/Grid, Glassmorphism)

## 📂 Project Structure

-   `src/views/`: Page components (`HomeView.vue`, `ChatView.vue`).
-   `src/router/`: Route definitions.
-   `src/assets/`: Global styles (`main.css`).
-   `src/App.vue`: Root component.

## 🚀 Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🐳 Docker Deployment

In the context of the full project, the frontend acts as a development server to allow Hot Module Replacement (HMR).

-   **Internal Port**: 5173
-   **Exposed Port**: 8080 (Mapped in `docker-compose.yml`)

Access the app via Docker at **http://localhost:8080**.
