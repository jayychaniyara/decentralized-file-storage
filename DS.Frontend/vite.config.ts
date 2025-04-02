import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Check if running in production (GitHub Pages)
const isProduction = process.env.NODE_ENV === "production";

// GitHub Pages requires a base path (your repo name)
const repoBasePath = "/decentralized-file-storage/DS.Frontend/";

export default defineConfig(({ mode }) => ({
  base: isProduction ? repoBasePath : "/",  // Corrects asset paths in GitHub Pages
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
  build: {
    outDir: "dist",
    assetsDir: "assets",  // Ensure assets are placed in the correct folder
  },
}));
