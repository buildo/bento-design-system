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

export const basic = {} satisfies Story;

export const alignLeft = {
  args: {
    align: "left",
  },
} satisfies Story;

export const alignCenter = {
  args: {
    align: "center",
  },
} satisfies Story;

export const alignRight = {
  args: {
    align: "right",
  },
} satisfies Story;

export const responsiveAlign = {
  args: {
    align: {
      mobile: "center",
      desktop: "left",
    },
  },
} satisfies Story;

export const dividers = {
  args: {
    dividers: true,
  },
};
