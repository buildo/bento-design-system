import { Placeholder, Stack } from "..";
import { alignArgType, disableControlArgType, spaceArgType } from "../util";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Stack,
  args: {
    space: 32,
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
    ],
  },
  argTypes: {
    space: spaceArgType,
    children: disableControlArgType,
    align: alignArgType,
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;

export const AlignLeft = {
  args: {
    align: "left",
  },
} satisfies Story;

export const AlignCenter = {
  args: {
    align: "center",
  },
} satisfies Story;

export const AlignRight = {
  args: {
    align: "right",
  },
} satisfies Story;

export const ResponsiveAlign = {
  args: {
    align: {
      mobile: "center",
      desktop: "left",
    },
  },
} satisfies Story;

export const Dividers = {
  args: {
    dividers: true,
  },
};
