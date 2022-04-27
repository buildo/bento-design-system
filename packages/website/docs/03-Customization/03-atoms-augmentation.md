import { Canvas } from "@site/src/components/Canvas";

# Atoms Augmentation

Bento has been built following the principles of Atomic CSS. You can read more about it in the [dedicate section](../atomic-styles).

This means Bento defines a set of "atomic properties", which correspond to single-purpose CSS classes. This classes, besides being used internally, can be also used to build new custom components for your project.

In addition to this, Bento allows you to extend the default atomic properties to meet your project's requirements. This process uses the [Vanilla Extract](https://vanilla-extract.style/)'s Sprinkles API, which we mentioned above.

In Vanilla Extract terminology, the atoms are called _sprinkles_.
Bento defines its own sprinkles and it exposes them as `bentoSprinkles` (we've seen in the examples above).

As discussed in the [Atomic CSS](../atomic-styles) documentation, `bentoSprinkles` is a function which returns a class name given a set of known properties.

When we pass this function to `createBentoComponents` it will return - among the others - a `Box` component, which you can think as the JSX equivalent of a sprinkles function.

:::info

`Box` is the main building block of the design system. You can use it to build your own components without accessing `sprinkles` directly:

<Canvas path="Customization/Box" />

Think of `Box` as a drop-in replacement for `div` (even though you can customize the rendered HTML element using the `as` props) which also exposes the type-safe API of `sprinkles`.

:::

The type of `Box` props is determined by the type of the sprinkles. Suppose now you want to add a new color token (`specialBackgroundColor`) to the set of possible background colors.

To do so, we must extend the set of tokens accepted by the `background` CSS properties to include also the custom token.

First, let's define the new CSS variable for the custom token and assign the corresponding hex color value to it:

```ts title="my-project/design-system/src/theme.css.ts"
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@buildo/bento-design-system";

// The implementation of Bento's theme we've seen above
createGlobalTheme(":root", vars, {
  fontFamily: {
    default: "Arial",
  },
  // ...
});

// our new custom variables
export const customVars = createGlobalTheme(":root", {
  color: {
    specialBackgroundColor: "#3C6FD6",
  },
});
```

Then, we must tell Bento this new token can be used as a value for the `background` CSS property, by extending Bento's `statusProperties`:

```ts title="my-project/design-system/src/sprinkles.css.ts"
import {
  createDefineBentoSprinklesFn,
  unconditionalProperties,
  responsiveProperties,
  statusProperties as bentoStatusProperties,
} from "@buildo/bento-design-system";
import { customVars } from "./theme.css";

const defineBentoSprinkles = createDefineBentoSprinklesFn();

const statusProperties = {
  ...bentoStatusProperties,
  background: {
    ...bentoStatusProperties.background,
    ...customVars.background,
  },
};

export const { sprinkles } = defineBentoSprinkles(
  bentoUnconditionalProperties,
  bentoResponsiveProperties,
  statusProperties
);
```

<details>
 <summary>What are <code>statusProperties</code>?</summary>

Bento defines 3 different sets of properties: `unconditionalProperties`, `responsiveProperties` and `statusProperties`:

- `unconditionalProperties` are CSS properties that don't depend on any condition;
- `responsiveProperties` are CSS properties whose value can be set based on the current breakpoint (mobile, tablet, desktop);
- `statusProperties` are CSS properties that can be set per-status (default, hover, focus, active, disabled).

The `background` CSS property is part of the statusProperties, since we can specify a different background color based on the current status. For example, we can specify different colors for the default and hover state in this way:

<Canvas path="Customization/BoxStatusProperties" />

</details>

Finally, we pass our new sprinkles to `createBentoComponents`:

```ts title="my-project/design-system/src/index.ts"
import { createBentoComponents } from "@buildo/bento-design-system";
import { mySprinkles } from "./mySprinkles.css";

export const { Box } = createBentoComponents(mySprinkles);
```

Now we can use `"specialBackgroundColor"` as a value for the `background` prop of `Box`:

```tsx title="my-project/design-system/src/HelloWorld.tsx"
import { Box } from ".";

export function HelloWorld() {
  return <Box background="specialBackgroundColor">The background is "specialBackgroundColor"</Box>;
}
```

Note that this is still checked by TypeScript: `background` now accepts all the values defined by Bento plus the custom token you just defined, and it will complain if you pass anything else to it.
