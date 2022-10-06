import { createComponentStories } from "../util";
import { Body, Card, Stack, Title } from "../";
import { unconditionalProperties, vars } from "@buildo/bento-design-system";

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

const { defaultExport, createStory } = createComponentStories({
  component: Card,
  args: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 40,
    paddingBottom: 40,
    elevation: "small",
    borderRadius: 8,
  },
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
});

export default defaultExport;

export const card = createStory({
  children: (
    <Stack space={8}>
      <Title size="large">Campaign type</Title>
      <Body size="large">Drive-traffic advanced</Body>
    </Stack>
  ),
});
