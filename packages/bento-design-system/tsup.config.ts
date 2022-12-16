import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export default defineConfig({
  entry: ["src/index.ts", "src/defaultTheme.ts"],
  outDir: "lib",
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
  noExternal: ["@fontsource"],
});
