import "../src/reset.css.ts";
import { defaultMessages } from "../stories/defaultMessages";
import { DesignSystemProvider } from "../stories/";

export const decorators = [
  (Story) => (
    <DesignSystemProvider dismissAfterMs={1000000} defaultMessages={defaultMessages}>
      <Story />
    </DesignSystemProvider>
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
