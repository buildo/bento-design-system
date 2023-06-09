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

export const FillError = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    errorBannerWidth: "fill",
    error: "Something went wrong",
  },
} satisfies Story;

export const ContentWidthError = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    error: "Something went wrong",
  },
} satisfies Story;
