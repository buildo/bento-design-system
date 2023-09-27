import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true }), vanillaExtractPlugin()],
});
