import "../src/reset.css.ts";
import { lightTheme } from "../stories/theme.css";
import { OverlayProvider } from "@react-aria/overlays";

export const decorators = [
  (Story) => (
    <OverlayProvider>
      <Story />
    </OverlayProvider>
  ),
];

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
    list: [{ name: "light", class: lightTheme, color: "white" }],
    target: "body",
  },
};
