import { Placeholder, Tiles } from "..";
import { alignYArgType, disableControlArgType, spaceArgType } from "../util";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Tiles,
  argTypes: {
    space: spaceArgType,
    columns: {
      options: [1, 2, 3, 4, 5, 6],
    },
    children: disableControlArgType,
    alignY: alignYArgType,
  },
} satisfies Meta<typeof Tiles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const threeColumns = {
  args: {
    space: 32,
    columns: 3,
    children: [<Placeholder key={1} />, <Placeholder key={2} />, <Placeholder key={3} />],
  },
} satisfies Story;

export const responsive = {
  args: {
    space: { mobile: 8, tablet: 16, desktop: 32, wide: 32 },
    columns: { mobile: 1, tablet: 2, desktop: 4, wide: 6 },
    children: [
      <Placeholder key={1} />,
      <Placeholder key={2} />,
      <Placeholder key={3} />,
      <Placeholder key={4} />,
      <Placeholder key={5} />,
      <Placeholder key={6} />,
    ],
  },
} satisfies Story;

export const alignY = {
  args: {
    columns: 4,
    space: 32,
    alignY: "bottom",
    children: [
      <Placeholder key={1} />,
      <Placeholder height={400} key={2} />,
      <Placeholder key={3} />,
      <Placeholder key={4} />,
    ],
  },
} satisfies Story;
