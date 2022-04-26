# Customization

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

```tsx title="my-project/design-system/src/index.tsx"
import { createBentoComponents } from "@buildo/bento-design-system";

export const { Actions, Modal } = createBentoComponents({
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
export const { Actions, Form } = createBentoComponents({
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
