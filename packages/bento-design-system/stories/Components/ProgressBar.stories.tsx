import { ProgressBar } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Continue = {
  args: {
    kind: "continuous",
    value: 55,
    maxValue: 100,
  },
} satisfies Story;

export const Discrete = {
  args: {
    kind: "discrete",
    value: 3,
    maxValue: 5,
  },
} satisfies Story;
