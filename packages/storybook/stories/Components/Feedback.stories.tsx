import { action } from "@storybook/addon-actions";
import { Feedback, IconLightbulb } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Feedback,
  args: {
    title: "Title",
    status: "positive",
    size: "large",
  },
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive = {
  args: {
    status: "positive",
  },
} satisfies Story;

export const Negative = {
  args: {
    status: "negative",
  },
} satisfies Story;

export const TitleAndDescription = {
  args: {
    description: "Description",
  },
} satisfies Story;

export const TitleAndButton = {
  args: {
    action: {
      onPress: action("On click"),
      label: "Click here",
    },
  },
} satisfies Story;

export const TitleDescriptionAndButton = {
  args: {
    description: "Description",
    action: {
      onPress: action("On click"),
      label: "Click here",
    },
  },
} satisfies Story;

export const WrappingTitleAndDescription = {
  args: {
    title: "Very long title that wraps to the next line",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
} satisfies Story;

export const CustomIcon = {
  args: {
    icon: IconLightbulb,
    status: undefined,
    description: "Description",
    action: {
      onPress: action("On click"),
      label: "Click here",
    },
  },
} satisfies Story;

export const MediumSize = {
  args: {
    size: "medium",
    description: "Description",
    action: {
      onPress: action("On click"),
      label: "Click here",
    },
  },
} satisfies Story;
