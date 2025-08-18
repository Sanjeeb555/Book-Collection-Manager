// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change this to your repo name 👇
const repoName = "Book-Collection-Manager";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? `/${repoName}/` : "/", 
}));
