import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";
import { BentoProvider } from "../stories/";
import { useArgs } from "@storybook/addons";

export const decorators = [
  (Story) => (
    <BentoProvider dismissAfterMs={1000000} defaultMessages={defaultMessages}>
      <Story />
    </BentoProvider>
  ),
  // NOTE(gabro): this decorator injects an `onChange` handler to all stories
  // which syncs the arg value with the component value.
  // This is useful for writing stories of controlled components.
  (Story, ctx) => {
    const [, setArgs] = useArgs();

    const onChange = (value) => {
      ctx.args.onChange?.(value);

      // Check if the component is controlled
      if (ctx.args.value !== undefined) {
        setArgs({ value });
      }
    };

    return <Story args={{ ...ctx.args, onChange }} />;
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
