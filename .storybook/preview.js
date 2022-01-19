import { darkTheme, lightTheme } from "../stories/theme.css";
import { withThemes } from "storybook-addon-themes/react";

export const decorators = [withThemes];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    list: [
      { name: "light", class: lightTheme, color: "white" },
      { name: "dark", class: darkTheme, color: "black" },
    ],
  },
};
