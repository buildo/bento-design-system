import { Meta, StoryObj } from "@storybook/react";
import { Box, Display } from "../..";

const meta = {
  component: Display,
  args: {
    children: "The quick brown fox",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
} satisfies Meta<typeof Display>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    size: "small",
  },
} satisfies Story;

export const Medium = {
  args: {
    size: "medium",
  },
} satisfies Story;

export const Large = {
  args: {
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
      <Display {...args} />
    </Box>
  ),
} satisfies Story;
