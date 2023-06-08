import { SpaceBetweenActions } from "../..";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SpaceBetweenActions,
  args: {
    size: "medium",
  },
} satisfies Meta<typeof SpaceBetweenActions>;

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
