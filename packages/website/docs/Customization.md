# Customization

At this point, we got a set of components with a default configuration and theme.
However, Bento components are designed to be customized to your project's needs.
You can configure the Bento components in different ways:

- **theming:** assign different values to the design tokens Bento is based upon, to customize your DS foundations, like colors, typography, spacing, etc;
- **configuration:** Each component offers a variety of configurations you can set to change its basic aspect and behavior;
- **atoms augmentation:** add more design tokens and atomic CSS classes that will be used inside your project to define project-specific components.

## Theming

Bento has been designed on top of a set of semantic design tokens which define the colors, typography and the general aspect of the Design System.
Each token corresponds to a CSS variable whose value can be changed at your will.

In the [quick start instructions](./intro#quick-start) we started importing two different stylesheets for our default app:

- `index.css` contains the style for all the Bento components, which makes use of the aforementioned CSS variables and must always be imported when the library is used;
- `defaultTheme.css` defines a default theme for the library, so it just assigns a default value to each of those variables.

To customize the aspect of your own design system, you can either import the default theme and then override some of the default values using an additional stylesheet, or completely replace `defaultTheme.css` with your own stylesheet defining a value for each of the Bento variables.

```ts title="my-project/design-system/src/index.tsx"
import "@buildo/bento-design-system/lib/index.css";
import "@buildo/bento-design-system/lib/defaultTheme.css";
import "./themeOverrides.css";
```

```css title="my-project/design-system/src/themeOverrides.css"
:root {
  /* change the brand primary color */
  --bento-brandColor-brandPrimary: green;
}
```

If your project is already set up to use [`Vanilla Extract`](./vanilla-extract), we strongly suggest to define your theme using the utilities it offers, so that you can leverage the type-safety TypeScript offers:

```ts title="my-project/design-system/src/theme.css.ts"
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@buildo/bento-design-system";

createGlobalTheme(":root", vars, {
  fontFamily: {
    default: "Arial",
  },
  ...
});
```

:::info
You can get a complete list of all the existing CSS variables by looking at the [default theme](https://github.com/buildo/bento-design-system/blob/main/packages/bento-design-system/src/defaultTheme.css.ts).
:::

:::tip
You can also define different themes for you app (e.g. a dark and a light theme), by replacing `createGlobalTheme` with a set of calls to `createTheme`, each of them returning a className you can conditionally set on the top-most element of your app.

```ts title="my-project/design-system/src/theme.css.ts"
import { createTheme } from "@vanilla-extract/css";

export const lightTheme = createTheme(vars, { ... });
export const darkTheme = createTheme(vars, { ... });
```

:::

## Configuration

In addition to the design tokens, covering aspects related to the common design system "foundations", each component exposes an interface to configure its specific features and behaviors.

Bento has been thought of as a design system **builder**, meaning that it allows a certain degree of flexibility in defining how your components should look like and behave (to adapt them to different scenarios), while remaining strict when it comes to using them in your application once configured.

This is why all the Bento components are exposed via a `createBentoComponents` constructor. This function allows you to build all the design system components, eventually overriding some of their default configurations.

Let's say, for example, our designers decided the application we have to implement should have all the actions (e.g. the buttons at the end of a form) left-aligned, with the primary action on the left.

We can force this by tweaking the `buttonsAlignment` and `primaryPosition` configurations for the `Actions` component:

:::info
Let's ignore the bentoSprinkles passed to createBentoComponents for now. We will see them in more details later.
:::

```tsx title="my-project/design-system/src/index.tsx"
import { createBentoComponents, bentoSprinkles } from "@buildo/bento-design-system";

export const { Actions, Modal } = createBentoComponents(bentoSprinkles, {
  actions: {
    buttonsAlignment: "left",
    primaryPosition: "left",
  },
});
```

In this way, not only the `Actions` component we get from the builder will always respect the configuration we passed (without the need to specify the behavior every time we use it via props), but also any other component using `Actions` internally (like `Modal` for the actions in the footer) will follow the same configuration.

<details>
  <summary>What if we need to use different configurations for a component, depending on where it's used?</summary>
  Let's say the left-aligned configuration for Actions from the previous example should affect all the usages in the app except for the modals.

In this case, we can call `createBentoComponents` multiple times, to get different sets of components:

```tsx
// both Actions and Form exported from here will use the left-aligned Actions
export const { Actions, Form } = createBentoComponents(bentoSprinkles, {
  actions: {
    buttonsAlignment: "left",
    primaryPosition: "left",
  },
});
// Modal, instead, will use the default Actions component,
// since we're not overriding its configuration here
export const { Modal } = createBentoComponents();
```

or even use more specific constructors Bento offers for every component:

```tsx
import { defaultConfigs } from "@buildo/bento-design-system";
export const { Actions, Banner, Button, Form, IconButton, InlineLoader } = createBentoComponents({
  actions: {
    buttonsAlignment: "left",
    primaryPosition: "left",
  },
});
// We create a new Actions component with the default config, to be used only to construct the Modal component.
// Note that the constructor for Actions requires a few other components used internally by Actions.
// We can take them from the previous global constructor.
const RightAlignedActions = createActions(defaultConfigs.actions, { Button, Banner, InlineLoader });
export const Modal = createModal(defaultConfigs.modal, {
  Actions: RightAlignedActions,
  IconButton,
});
```

</details>

## Atoms augmentation

Bento has been built following the principles of [Atomic CSS](sprinkles-setup.md). For this reason, it defines a set of single-purpose CSS classes which, besides from being used internally, can be also used to build new project-specific components. In addition to this, Bento allows you to extend the set of atoms that are used to pre-generate these atomic classes, so that you can add even more design tokens and classes to meet your project's requirements. This process goes through the use of [Vanilla Extract](https://vanilla-extract.style/), a type-safe CSS preprocessor that generates CSS classes from TypeScript files and that's been used internally to create all the Bento components.

:::info
You can find the instructions to setup Vanilla-Extract for your project [here](./vanilla-extract.md)
:::

In vanilla-extract terminology, these atoms are called **Sprinkles**. By default, Bento is using a set of sprinkles containing all the design tokens that are defined internally by the library (i.e. the ones you can customize through theming), but it allows you to define your own, as long as they extend the default ones.

Remember the `bentoSprinkles` we passed to the `createBentoComponents` function in the previous chapter? Those are the sprinkles Bento is defining and using by default. Passing the sprinkles to `createBentoComponents` allows us to receive back a `Box` and other layout components accepting the design tokens as props.

:::info
Think of Box as the main building block of your design system. You can use it to build more complex components.
:::

```tsx
<Box as="div" color="brandPrimary">
  This is a text in BrandPrimary color
</Box>
```

In case you want to use custom design tokens in your project, you can build your own sprinkles function based on the Bento atoms, and pass it to `createBentoComponents` in place of the default `bentoSprinkles`.
Let's say, for example, we want to add a new color token (`myForegroundColor`) to the set of possible foreground colors. To do so, we must extend the set of tokens accepted by the `color` CSS properties to include also the custom token.

First, let's define the new CSS variable for the custom token and assign the corresponding hex color value to it:

```ts title="my-project/design-system/theme.css.ts"
import { createGlobalTheme } from "@vanilla-extract/css";

export const customVars = createGlobalTheme(":root", {
  color: {
    myForegroundColor: "#3C6FD6",
  },
});
```

Then, we must tell Bento this new token can be used as a value for the `color` CSS property, by extending the Bento `statusProperties`:

```ts title="my-project/design-system/src/mySprinkles.css.ts"
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
  color: {
    ...bentoStatusProperties.color,
    ...customVars.color,
  },
};

export const { sprinkles: mySprinkles } = defineBentoSprinkles(
  bentoUnconditionalProperties,
  bentoResponsiveProperties,
  statusProperties
);
```

<details>
 <summary>What are statusProperties?</summary>
Bento defines 3 different sets of properties: `unconditionalProperties`, `responsiveProperties` and `statusProperties`:

- `unconditionalProperties` are CSS properties that don't depend on any condition;
- `responsiveProperties` are CSS properties whose value can be set based on the current breakpoint (mobile, tablet, desktop);
- `statusProperties` are CSS properties that can be set per-status (default, hover, focus, active, disabled).

The `color` CSS property is part of the statusProperties, since we can specify a different foreground color based on the current status. For example, we can specify different colors for the default and hover state in this way:

```ts
<Box color={{
  default: "brandPrimary",
  hover: "primarySolidHoverForeground"
}}>
```

</details>

Finally, we must pass the new sprinkles to the `createBentoComponents`:

```ts title="my-project/design-system/src/index.ts"
import { mySprinkles } from "./mySprinkles.css";

const { Box } = createBentoSprinkles(mySprinkles);

export function HelloWorld() {
  return (
    <Box as="div" color="myForegroundColor">
      This is a text in MyForegroundColor
    </Box>
  );
}
```
