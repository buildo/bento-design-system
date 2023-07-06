import { Meta, StoryObj } from "@storybook/react";
import { Headline } from "../..";
import { Box } from "@buildo/bento-design-system";

const meta = {
  component: Headline,
  args: {
    children: "The quick brown fox",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    size: "small",
  },
};

export const Medium = {
  args: {
    size: "medium",
  },
};

export const Large = {
  args: {
    size: "large",
  },
};

export const Ellipsis = {
  args: {
    size: "medium",
    ellipsis: true,
  },
  render: (args) => (
    <Box style={{ width: 200 }}>
      <Headline {...args} />
    </Box>
  ),
} satisfies Story;
