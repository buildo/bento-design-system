import { Body, Box } from "../..";
import { Meta, StoryObj } from "@storybook/react";
import { textArgType } from "../../utils/utils";

const meta = {
  component: Body,
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
} satisfies Meta<typeof Body>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SizeSmall = {
  args: {
    size: "small",
  },
} satisfies Story;

export const SizeMedium = {
  args: {
    size: "medium",
  },
} satisfies Story;

export const SizeLarge = {
  args: {
    size: "large",
  },
} satisfies Story;

export const WeightDefault = {
  args: {
    size: "large",
  },
} satisfies Story;

export const WeightStrong = {
  args: {
    weight: "strong",
    size: "large",
  },
} satisfies Story;

export const Ellipsis = {
  args: {
    size: "medium",
    ellipsis: true,
  },
  render: (args) => (
    <Box style={{ width: 200 }}>
      <Body {...args} />
    </Box>
  ),
} satisfies Story;
