import { Meta, StoryObj } from "@storybook/react";
import { InlineLoader } from "../";

const meta = {
  component: InlineLoader,
  args: {
    message: "This may take several minutes...",
  },
} satisfies Meta<typeof InlineLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standalone = {} satisfies Story;
