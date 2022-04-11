import { useComponentsShowcase } from ".";
import { action } from "@storybook/addon-actions";

export default {};

export const Showcase = () => {
  return useComponentsShowcase({ action });
};
