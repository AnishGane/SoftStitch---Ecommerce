import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0", // so mobile devices can access
    port: 5173,
    proxy: {
      "/api": {
        target:
          "https://vercel.com/anishganes-projects/soft-stitch-ecommerce-backend/2JUsjHnrG4YpK9gLCLyT2JJo9Cgm",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
