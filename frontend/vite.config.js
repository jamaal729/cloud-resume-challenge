import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const mock_server = {
  name: "mock-counter",
  configureServer(server) {
    let count = 0; // in-memory mock state

    server.middlewares.use("/counter", async (req, res, next) => {
      res.setHeader("Content-Type", "application/json");

      if (req.method === "GET") {
        res.end(JSON.stringify({ count }));
        return;
      }

      if (req.method === "POST") {
        count += 1;
        res.end(JSON.stringify({ count }));
        return;
      }

      next();
    });
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mock_server],
  server: {
    proxy: {
      '/api': 'http://localhost:5174' // For local develoment
    },
  },
})
