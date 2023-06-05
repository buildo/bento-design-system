import { action } from "@storybook/addon-actions";
import { Body, Box, Label, Link } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Link,
  args: {
    label: "I'm a link",
  },
  decorators: [
    (Story) => (
      <Body size="medium">
        <Story />
      </Body>
    ),
  ],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const link = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
  },
} satisfies Story;

export const Strong = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
  },
  decorators: [
    (Story) => (
      <Body size="medium" weight="strong">
        <Story />
      </Body>
    ),
  ],
} satisfies Story;

export const Inverse = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
    kind: "inverse",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
} satisfies Story;

export const Disabled = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
    isDisabled: true,
  },
} satisfies Story;

export const LinkButton = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
    onClick: action("onClick"),
  },
} satisfies Story;

export const InLabel = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
  },
  decorators: [
    (Story) => (
      <Label size="large">
        <Story />
      </Label>
    ),
  ],
} satisfies Story;

export const ComplexChildren = {
  args: {
    href: "http://www.example.com",
    target: "_blank",
    label: undefined,
    children: (
      <Box
        background="backgroundPositive"
        padding={40}
        borderRadius={16}
        boxShadow="outlinePositive"
      >
        <Body size="large">The entire box is a link!</Body>
      </Box>
    ),
  },
} satisfies Story;
