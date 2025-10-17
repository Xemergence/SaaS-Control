import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    // Only include tempo plugin in development or when VITE_TEMPO is explicitly set
    ...(process.env.NODE_ENV === "development" ||
    process.env.VITE_TEMPO === "true"
      ? [tempo()]
      : []),
  ],
  build: {
    rollupOptions: {
      external: ["tempo-routes"],
    },
  },
  resolve: {
    // Ensure a single React instance across symlinked deps and blocks
    dedupe: ["react", "react-dom"],
    alias: {
      "react": path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
});
