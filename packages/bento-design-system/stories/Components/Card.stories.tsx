import { Body, Card, Stack, Title, unconditionalProperties, vars } from "..";
import { StoryObj, Meta } from "@storybook/react";

const elevationType = {
  options: Object.keys(vars.boxShadow)
    .filter((key) => key.startsWith("elevation"))
    .map((key) => key.replace("elevation", ""))
    .reduce<Array<string | undefined>>(
      (acc, curr) => {
        return [...acc, curr.toLowerCase()];
      },
      [undefined]
    ),
  control: {
    type: "select",
  },
};

const paddingType = {
  options: [
    ...Object.keys(vars.space).filter((key) => ["24", "32", "40"].includes(key)),
    undefined,
  ],
  control: {
    type: "select",
    mapping: vars.space,
  },
};

const borderRadiusType = {
  options: [
    ...Object.keys(unconditionalProperties.borderRadius).filter((key) => key !== "circled"),
    undefined,
  ],
  control: { type: "select" },
};

const meta = {
  component: Card,
  args: {},
  argTypes: {
    paddingLeft: paddingType,
    paddingRight: paddingType,
    paddingTop: paddingType,
    paddingBottom: paddingType,
    padding: paddingType,
    paddingX: paddingType,
    paddingY: paddingType,
    elevation: elevationType,
    borderRadius: borderRadiusType,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const children = (
  <Stack space={8}>
    <Title size="large">Campaign type</Title>
    <Body size="large">Drive-traffic advanced</Body>
  </Stack>
);

export const Default = {
  args: { children },
} satisfies Story;

export const WithCustomPadding = {
  args: {
    children,
    paddingX: 32,
    paddingY: 16,
  },
} satisfies Story;

export const WithCustomElevation = {
  args: {
    children,
    elevation: "large",
  },
} satisfies Story;

export const WithCustomBorderRadius = {
  args: {
    children,
    borderRadius: {
      topLeft: 40,
      bottomRight: 40,
      topRight: 0,
      bottomLeft: 0,
    },
  },
} satisfies Story;
