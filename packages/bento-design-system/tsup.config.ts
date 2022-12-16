import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export default defineConfig({
  entry: ["src/index.ts", "src/defaultTheme.ts"],
  sourcemap: true,
  outDir: "lib",
  format: ["esm", "cjs"],
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
  noExternal: ["@fontsource"],
});
