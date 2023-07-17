import { Meta, StoryObj } from "@storybook/react";
import { Box, Title } from "../..";

const meta = {
  component: Title,
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
} satisfies Meta<typeof Title>;

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
      <Title {...args} />
    </Box>
  ),
} satisfies Story;
