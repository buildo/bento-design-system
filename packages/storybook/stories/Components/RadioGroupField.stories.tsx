import { createComponentStories, fieldArgTypes } from "../util";
import { RadioGroupField } from "..";

const { defaultExport, createControlledStory } = createComponentStories({
  component: RadioGroupField,
  args: {
    label: "Budget options",
    name: "budgetOptions",
    assistiveText: "Assistive Text",
    options: [
      {
        value: "unlimited",
        label: "Unlimited",
      },
      {
        value: 2,
        label: "Monthly",
      },
      {
        value: "yearly",
        label: "Yearly",
        isDisabled: true,
      },
      {
        value: false,
        label:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  argTypes: fieldArgTypes,
});

export default defaultExport;

export const Vertical = createControlledStory("unlimited", {});

export const Horizontal = createControlledStory("unlimited", {
  orientation: "horizontal",
});

export const Disabled = createControlledStory("unlimited", {
  disabled: true,
});

export const WrappingLabel = createControlledStory(
  "unlimited",
  {},
  { viewport: { defaultViewport: "tablet" } }
);
