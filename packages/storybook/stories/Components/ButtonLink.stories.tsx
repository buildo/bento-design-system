import { ButtonLink } from "../";
import { IconCheck } from "@buildo/bento-design-system";
import { StoryObj, Meta } from "@storybook/react";

const meta = {
  component: ButtonLink,
  args: {
    label: "Button",
    href: "https://google.com",
    target: "blank",
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    kind: "solid",
    hierarchy: "primary",
  },
} satisfies Story;

export const Active = {
  args: {
    kind: "solid",
    hierarchy: "primary",
    active: true,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    kind: "solid",
    hierarchy: "primary",
    icon: IconCheck,
  },
} satisfies Story;
