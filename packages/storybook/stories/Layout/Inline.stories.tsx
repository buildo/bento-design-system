import { Inline, Placeholder } from "..";
import { alignArgType, alignYArgType, disableControlArgType, spaceArgType } from "../util";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Inline,
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
    alignY: alignYArgType,
  },
} satisfies Meta<typeof Inline>;

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

export const multipleLines = {
  args: {
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={60} />,
      <Placeholder height={100} width={80} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={90} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={40} />,
      <Placeholder height={100} width={50} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={60} />,
      <Placeholder height={100} width={80} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={90} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={40} />,
      <Placeholder height={100} width={50} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={60} />,
      <Placeholder height={100} width={80} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={90} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={40} />,
      <Placeholder height={100} width={50} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={70} />,
      <Placeholder height={100} width={100} />,
    ],
  },
} satisfies Story;

export const collapseBelow = {
  args: {
    collapseBelow: "tablet",
    align: {
      mobile: "center",
      tablet: "left",
    },
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
} satisfies Story;

export const responsiveAlign = {
  args: {
    align: {
      mobile: "center",
      desktop: "left",
    },
  },
} satisfies Story;

export const reverse = {
  args: {
    reverse: true,
    children: [
      <Placeholder label="1" width={100} />,
      <Placeholder label="2" width={100} />,
      <Placeholder label="3" width={100} />,
    ],
  },
} satisfies Story;

export const responsiveReverse = {
  args: {
    reverse: {
      tablet: true,
    },
    children: [
      <Placeholder label="1" width={100} background="brandPrimary" />,
      <Placeholder label="2" width={100} background="brandSecondary" />,
      <Placeholder label="3" width={100} background="brandTertiary" />,
    ],
  },
  parameters: { viewport: { defaultViewport: "tablet" } },
} satisfies Story;
