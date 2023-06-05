import { DisclosureGroup, Placeholder } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: DisclosureGroup,
} satisfies Meta<typeof DisclosureGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Linear = {
  args: {
    items: [
      {
        title: "Title",
        children: <Placeholder />,
      },
      {
        title: "Title",
        children: <Placeholder />,
        initialIsOpen: true,
      },
      {
        title: "Title",
        children: <Placeholder />,
      },
    ],
  },
} satisfies Story;

const nestedItems = [
  {
    title: "Title",
    initialIsOpen: true,
    items: [
      {
        title: "Title",
        children: <Placeholder />,
        initialIsOpen: true,
      },
      {
        title: "Title",
        children: <Placeholder />,
      },
    ],
  },
  {
    title: "Title",
    children: <Placeholder />,
  },
  {
    title: "Title",
    children: <Placeholder />,
  },
];

export const Nested = {
  args: {
    items: nestedItems,
  },
} satisfies Story;

export const LeadingIcon = {
  args: {
    items: nestedItems,
    iconPosition: "leading",
  },
} satisfies Story;
