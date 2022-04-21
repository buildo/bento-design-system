import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "lib",
    esbuildPlugins: [vanillaExtractPlugin()],
    dts: true,
    // See https://esbuild.github.io/content-types/#auto-import-for-jsx
    inject: ["./jsxShim.ts"],
  },
  {
    entry: ["src/defaultTheme.ts"],
    outDir: "lib",
    esbuildPlugins: [vanillaExtractPlugin()],
  },
]);
