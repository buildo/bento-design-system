import { defaultMessages } from "../stories/defaultMessages";
import { BentoProvider } from "../stories/";
import "@buildo/bento-design-system/lib/index.css";

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
