import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

export default defineConfig({
  plugins: [reactRouter({ ssr: true }), tsconfigPaths(), checker({ typescript: true })],
  server: {
    open: true,
  },
});
