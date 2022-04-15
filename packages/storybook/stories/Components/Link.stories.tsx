import { action } from "@storybook/addon-actions";
import React from "react";
import { Body, Box, Label, Link } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Link,
  args: {
    label: formatMessage("I'm a link"),
  },
  decorators: [
    (Story: React.FC) => (
      <Body size="medium">
        <Story />
      </Body>
    ),
  ],
});

export default defaultExport;

export const link = createStory({
  href: "http://www.example.com",
  target: "_blank",
});

export const Strong = createStory({
  href: "http://www.example.com",
  target: "_blank",
});
Strong.decorators = [
  (Story: React.FC) => (
    <Body size="medium" weight="strong">
      <Story />
    </Body>
  ),
];

export const Inverse = createStory(
  {
    href: "http://www.example.com",
    target: "_blank",
    kind: "inverse",
  },
  {
    backgrounds: { default: "dark" },
  }
);

export const Disabled = createStory({
  href: "http://www.example.com",
  target: "_blank",
  isDisabled: true,
});

export const LinkButton = createStory({
  href: "http://www.example.com",
  target: "_blank",
  onClick: action("onClick"),
});

export const InLabel = createStory({
  href: "http://www.example.com",
  target: "_blank",
});
InLabel.decorators = [
  (Story: React.FC) => (
    <Label size="large">
      <Story />
    </Label>
  ),
];

export const ComplexChildren = createStory({
  href: "http://www.example.com",
  target: "_blank",
  label: undefined,
  children: (
    <Box
      background={"backgroundPositive"}
      padding={40}
      borderRadius={16}
      boxShadow="outlinePositive"
    >
      <Body size="large">{formatMessage("The entire box is a link!")}</Body>
    </Box>
  ),
});
