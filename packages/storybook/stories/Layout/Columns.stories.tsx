import { Card, Column, Columns, Display, Placeholder } from "..";
import { alignArgType, alignYArgType, disableControlArgType, spaceArgType } from "../util";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Columns,
  args: {
    space: 32,
  },
  argTypes: {
    space: spaceArgType,
    children: disableControlArgType,
    align: alignArgType,
    alignY: alignYArgType,
  },
} satisfies Meta<typeof Columns>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoColumn = {
  args: {
    children: (
      <>
        <Placeholder height={200} />, <Placeholder height={200} />
      </>
    ),
  },
} satisfies Story;

export const TwoColumn1_3 = {
  args: {
    children: (
      <>
        <Column width="1/3">
          <Placeholder height={200} label="1/3" />
        </Column>
        <Column>
          <Placeholder height={200} />
        </Column>
      </>
    ),
  },
} satisfies Story;

export const ThreeColumn = {
  args: {
    children: [
      <Column width="1/5">
        <Placeholder height={200} label="1/5" />
      </Column>,
      <Column>
        <Placeholder height={200} />
      </Column>,
      <Column width="1/5">
        <Placeholder height={200} label="1/5" />
      </Column>,
    ],
  },
} satisfies Story;

export const ContentSizedColumn = {
  args: {
    children: [
      <Column width="content">
        <Placeholder height={200} label="I'm a content-sized column" />
      </Column>,
      <Column>
        <Placeholder height={200} />
      </Column>,
    ],
  },
} satisfies Story;

export const CollapseBelow = {
  args: {
    collapseBelow: "desktop",
    align: {
      mobile: "center",
      desktop: "left",
    },
    children: [
      <Placeholder height={100} />,
      <Placeholder height={100} />,
      <Placeholder height={100} />,
    ],
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Story;

export const AlignY = {
  args: {
    alignY: "bottom",
    children: [<Placeholder height={50} />, <Placeholder height={100} />],
  },
} satisfies Story;

export const AlignYStretch = {
  args: {
    alignY: "stretch",
    children: [<Placeholder height={100} />, <Placeholder height="100%" />],
  },
} satisfies Story;

export const AlignYBaseline = {
  args: {
    alignY: "baseline",
    children: [
      <Column width="content">
        <Card padding={24}>
          <Display size="large">Hello</Display>
        </Card>
      </Column>,
      <Column width="content">
        <Card padding={24}>
          <Display size="small">World</Display>
        </Card>
      </Column>,
    ],
  },
} satisfies Story;

export const Reverse = {
  args: {
    children: [<Placeholder label="1" />, <Placeholder label="2" />, <Placeholder label="3" />],
    reverse: true,
  },
} satisfies Story;

export const ResponsiveReverse = {
  args: {
    children: [
      <Placeholder background="brandPrimary" />,
      <Column width={{ wide: "content", desktop: "content", tablet: "full", mobile: "full" }}>
        <Placeholder label="sidebar" background="brandSecondary" />
      </Column>,
    ],
    collapseBelow: "desktop",
    reverse: {
      tablet: true,
      mobile: false,
    },
  },
  parameters: { viewport: { defaultViewport: "tablet" } },
} satisfies Story;

export const Sticky = {
  args: {
    collapseBelow: "desktop",
    reverse: { tablet: true },
    children: [
      <Placeholder background="brandPrimary" height={600} />,
      <Column
        width={{ desktop: "content", tablet: "full" }}
        sticky={{ top: { desktop: 40, tablet: 16 } }}
      >
        <Placeholder label="sidebar" background="brandSecondary" />
      </Column>,
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
} satisfies Story;
