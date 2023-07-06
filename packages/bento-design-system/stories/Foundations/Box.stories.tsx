import { Box } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Box,
  args: {
    children: "Test",
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    color: "textPrimary",
    fontFamily: "default",
    padding: 16,
  },
} satisfies Story;

export const CustomTokens = {
  args: {
    color: "customColor1",
    fontFamily: "customFontFamily",
    padding: 12,
  },
} satisfies Story;
