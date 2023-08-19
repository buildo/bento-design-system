import { defaultMessages } from "../src/defaultMessages/en";
import "../stories/theme.css";
import "../src/reset.css";
import "../src/global.css";
import "../src/defaultTheme.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import { useArgs } from "@storybook/addons";
import { Decorator } from "@storybook/react";
import { createBentoProvider } from "../src";
import { sprinkles } from "../stories/sprinkles.css";

const BentoProvider = createBentoProvider(
  {
    chip: {
      customColors: {
        custom: "customColor1",
      },
    },
    pagination: {
      itemsPerPageOptions: [5, 10, 20, 50],
    },
  },
  undefined,
  sprinkles
);

export const decorators: Decorator[] = [
  (Story) => (
    <BentoProvider toastDismissAfterMs={1000000} defaultMessages={defaultMessages}>
      <Story />
    </BentoProvider>
  ),
  // NOTE(gabro): this decorator injects an `onChange` handler to all stories
  // which syncs the arg value with the component value.
  // This is useful for writing stories of controlled components.
  (Story, ctx) => {
    const [, setArgs] = useArgs();

    const onChange = (value: unknown) => {
      (ctx.args.onChange as (value: unknown) => void)?.(value);

      // Check if the component is controlled
      if (ctx.args.value !== undefined) {
        setArgs({ value });
      }
    };

    return <Story args={{ onChange, ...ctx.args }} />;
  },
];

export const parameters = {
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#FFFFFF" },
      { name: "dark", value: "#1A212B" },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
