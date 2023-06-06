import { useComponentsShowcase } from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Showcase",
};

export const Showcase = {
  render: () => useComponentsShowcase({ action }),
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
};
