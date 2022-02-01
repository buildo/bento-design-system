# Atomic styles

Bento encourages you to use Atomic CSS (also known as Functional CSS, or Utility-first CSS) for your design system.
Not to be confused with "Atomic design", Atomic CSS means favoring small, single-purpose classes that can be re-used across your project.

:::note Find out more
Here's a primer to Atomic CSS, if you want to dig deeper https://css-tricks.com/lets-define-exactly-atomic-css/
:::

Atomic CSS has advantages, but it's very hard to do manually. That's why Vanilla Extract provides Sprinkles, a convenient and type-safe API to generate and use atomic CSS classes.

The general idea of Sprinkles, is defining a set of known values (usually based on your Design System tokens) for a given CSS property, which can be then used to pre-generate the corresponding CSS classes at build time.

### An example

Suppose you know ahead of time that you are going to use blue (specifically `#0096FF`) and black as your foreground color. Here's how you can use Sprinkles to pre-generate the corresponding CSS classes:

```twoslash include sprinkles
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const foregroundColors = {
  blue: "#0096FF",
  black: "#000000",
};

const myProperties = defineProperties({
  properties: {
    color: foregroundColors,
  },
});

export const sprinkles = createSprinkles(myProperties);
```

```ts twoslash title="./sprinkles.css.ts"
// @include: sprinkles
```

Since this is a `.css.ts` file, it will be processed by Vanilla Extract and it will produce something like these classes at build time (the names are simplified for the example sake):

```css
.sprinkles__color_blue {
  color: blue;
}

.sprinkles__color_black {
  color: black;
}
```

You can now attach those classes to your design system components by using the `sprinkles` function:

```tsx twoslash title="MyComponent.tsx"
// @filename: sprinkles.css.ts
// @include: sprinkles

// @filename: MyComponent.tsx
// ---cut---
import * as React from "react";
import { sprinkles } from "./sprinkles.css";

export function MyComponent() {
  return <div className={sprinkles({ color: "blue" })} />;
}
```

The `sprinkles` function returns a string which is the class name referring to the selected property value.

Also notice that `sprinkles` is type-safe: you can only use the correct values for the properties and TypeScript will catch any typos or other errors.

```tsx twoslash title="MyComponent.tsx" {5}
// @filename: sprinkles.css.ts
// @include: sprinkles

// @filename: MyComponent.tsx
// ---cut---
import * as React from "react";
import { sprinkles } from "./sprinkles.css";

export function MyComponent() {
  return <div className={sprinkles({ color: "blue" })} />;
  //                                   ^?
}
```
