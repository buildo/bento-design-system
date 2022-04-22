# Customization

## Theming

Bento has been designed on top of a set of semantic design tokens which define the colors, typography and the general aspect of the Design System.
Each token corresponds to a CSS variable whose value can be changed to meet the project's guidelines.

In the [quick start instructions](./intro#quick-start) we started importing two different stylesheets for our default app:

- `index.css` contains the style for all the Bento components, which makes use of the aforementioned CSS variables and must always be imported when the library is used;
- `defaultTheme.css` defines a default theme for the library, so it just assigns a default value to each of these variables.

To customize the aspect of your app, you can either import the default theme and then override some of the default values using an additional stylesheet, or completely replace `defaultTheme.css` with your own stylesheet defining a value for each of the Bento CSS variables.

```ts
/* index.ts */
import "@buildo/bento-design-system/lib/index.css";
import "@buildo/bento-design-system/lib/defaultTheme.css";
import "./themeOverrides.css";
```

```css
/* themeOverrides.css */
:root {
  /* change the brand primary color */
  --bento-brandColor-brandPrimary: green;
}
```

If your project is already set up to use [`Vanilla Extract`](./vanilla-extract), we strongly suggest to define your theme using the utilities it offers, so that you can leverage the type-safety TypeScript offers:

```ts
/* theme.css.ts */
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
You can also define different themes for you app (e.g. a dark and a light theme), by replacing `createGlobalTheme` with a list of calls to `createTheme`, each of them returning a className you can conditionally set on the top-most element of your app.

```ts
/* theme.css.ts */
const lightTheme = createTheme(vars, { ... });
const darkTheme = createTheme(vars, { ... });
```
