import { createComponentStories, fieldArgTypes, formatMessage } from "../util";
import { RadioGroupField } from "..";

const { defaultExport, createControlledStory } = createComponentStories({
  component: RadioGroupField,
  args: {
    label: formatMessage("Budget options"),
    name: "budgetOptions",
    assistiveText: formatMessage("Assistive Text"),
    options: [
      {
        value: "unlimited",
        label: formatMessage("Unlimited"),
      },
      {
        value: 2,
        label: formatMessage("Monthly"),
      },
      {
        value: "yearly",
        label: formatMessage("Yearly"),
        isDisabled: true,
      },
      {
        value: false,
        label: formatMessage(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ),
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
