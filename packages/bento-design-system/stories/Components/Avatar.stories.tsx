import { Avatar } from "..";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    color: "blue",
    name: " Alberto",
  },
} satisfies Story;

export const WithoutName = {
  args: {
    color: "blue",
    name: undefined,
  },
} satisfies Story;
