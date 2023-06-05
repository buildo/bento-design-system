import { LeftActions } from "../..";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LeftActions,
  args: {
    size: "medium",
  },
} satisfies Meta<typeof LeftActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FillError: Story = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    errorBannerWidth: "fill",
    error: "Something went wrong",
  },
};

export const ContentWidthError: Story = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    error: "Something went wrong",
  },
};
