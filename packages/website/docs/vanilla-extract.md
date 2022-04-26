# Vanilla Extract

## Setting up Vanilla Extract

If you need to define your own components based on the Bento foundations, or use some of the advanced feature Bento offers, we suggest to setup Vanilla Extract in your project, so that it can process your .css.ts files.

Vanilla Extract supports several popular bundlers, but for a design system package we recommend using [tsup](https://tsup.egoist.sh/), which is especially well-suited for TypeScript libraries.

Here's a possible setup using to get you started:

<PackageManagerCommand
command={{
    pnpm: "add -D tsup @vanilla-extract/esbuild-plugin",
    yarn: "add -D tsup @vanilla-extract/esbuild-plugin",
    npm: "install -D tsup @vanilla-extract/esbuild-plugin",
  }}
/>

Create a file named `tsup.config.ts` in your project root:

```ts
import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "lib",
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
  // See https://esbuild.github.io/content-types/#auto-import-for-jsx
  inject: ["./jsxShim.ts"],
});
```

And a file named `jsxShim.ts` in your project root:

```ts
// See https://esbuild.github.io/content-types/#auto-import-for-jsx
import * as React from "react";
export { React };
```

Done! Now you can add two scripts to your `package.json`:

```json
"scripts": {
  "build": "tsup --minify --clean",
  "watch": "tsup --watch",
}
```

Ok, now that we got the build stuff out of the way, let's continue with more interesting things!