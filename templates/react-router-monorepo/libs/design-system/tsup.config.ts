import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export default defineConfig({
  entry: ["src/index.tsx"],
  outDir: "dist",
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
  format: ["esm"],
  noExternal: ["@buildo/bento-design-system/index.css"],
});
