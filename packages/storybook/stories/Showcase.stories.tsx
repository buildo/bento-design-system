import { useComponentsShowcase } from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Showcase",
};

export const Showcase = () => {
  return useComponentsShowcase({ action });
};
Showcase.parameters = {
  chromatic: { pauseAnimationAtEnd: true },
};
