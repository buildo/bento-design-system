import "../src/reset.css.ts";
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
};
