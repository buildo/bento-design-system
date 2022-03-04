import "../src/reset.css.ts";
import { OverlayProvider } from "@react-aria/overlays";
import { DefaultMessagesContext } from "../src/DefaultMessagesContext";
import { defaultMessages } from "../stories/defaultMessages";

export const decorators = [
  (Story) => (
    <DefaultMessagesContext.Provider value={{ defaultMessages }}>
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    </DefaultMessagesContext.Provider>
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
