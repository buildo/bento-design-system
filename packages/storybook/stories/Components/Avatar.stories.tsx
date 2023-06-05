import { Avatar } from "../";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "blue",
    name: " Alberto",
  },
};

export const WithoutName: Story = {
  args: {
    color: "blue",
    name: undefined,
  },
};
