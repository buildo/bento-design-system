import { RadioGroupField } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
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
} satisfies Meta<typeof RadioGroupField>;

export default meta;

type Story = StoryObj<typeof RadioGroupField>;

export const Vertical = {
  args: {
    value: "unlimited",
  },
} satisfies Story;

export const Horizontal = {
  args: {
    value: "unlimited",
    orientation: "horizontal",
  },
} satisfies Story;

export const Disabled = {
  args: {
    value: "unlimited",
    disabled: true,
  },
} satisfies Story;

export const WrappingLabel = {
  args: {
    value: "unlimited",
  },
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};
