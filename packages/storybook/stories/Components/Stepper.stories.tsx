import { Stepper } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof Stepper>;

export const stepper = {
  args: {
    currentStep: 2,
    steps: [
      { label: "Step 1" },
      { label: "Step 2" },
      { label: "Step 3" },
      { label: "Step 4" },
      { label: "Step 5" },
    ],
  },
} satisfies Story;
