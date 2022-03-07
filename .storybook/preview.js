import "../src/reset.css.ts";
import { defaultMessages } from "../stories/defaultMessages";
import { BentoProvider } from "../stories/";

export const decorators = [
  (Story) => (
    <BentoProvider dismissAfterMs={1000000} defaultMessages={defaultMessages}>
      <Story />
    </BentoProvider>
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
