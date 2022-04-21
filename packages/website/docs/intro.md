---
sidebar_position: 1
---

# Welcome to Bento Design System

Bento Design System is an extensible Design System for React.

Bento is configurable and extensible, and it's meant to be used as a foundation for your project's Design System.

## Getting Started

Bento is based and must be used together with [Vanilla Extract](https://vanilla-extract.style/), a type-safe CSS preprocessor that generates CSS classes from TypeScript files.

Start by installing Bento and Vanilla Extract:

```bash
# pnpm
pnpm add bento-design-system @vanilla-extract/css @vanilla-extract/sprinkles @vanilla-extract/recipes

# yarn
yarn add bento-design-system @vanilla-extract/css @vanilla-extract/sprinkles @vanilla-extract/recipes
```

## Setting up Vanilla Extract

Before moving forward, let's setup Vanilla Extract in your project, so that it can process your .css.ts files.

Vanilla Extract supports several popular bundlers, but for a design system package we recommend using [tsup](https://tsup.egoist.sh/), which is especially well-suited for TypeScript libraries.

Here's a possible setup using to get you started:

```bash
# pnpm
pnpm add -D tsup @vanilla-extract/esbuild-plugin

# yarn
yarn add -D tsup @vanilla-extract/esbuild-plugin
```

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

```jsx live="true"
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```
