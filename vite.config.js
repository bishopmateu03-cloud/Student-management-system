import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite config. Works on Netlify and Vercel with no extra setup.
export default defineConfig({
  plugins: [react()],
});
