import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const isGitHubPages = process.env.NODE_ENV === "production";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: isGitHubPages ? "/decentralized-file-storage/" : "/", // Fixes GitHub Pages
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));
