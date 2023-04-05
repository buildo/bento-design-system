import { createComponentStories, textArgType } from "../../util";
import { Body, Box } from "../..";

const { defaultExport, createStory } = createComponentStories({
  component: Body,
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    children: textArgType,
  },
});

export default defaultExport;

export const SizeSmall = createStory({
  size: "small",
});

export const SizeMedium = createStory({
  size: "medium",
});

export const SizeLarge = createStory({
  size: "large",
});

export const WeightDefault = createStory({
  size: "large",
});

export const WeightStrong = createStory({
  weight: "strong",
  size: "large",
});

export const Ellipsis = () => (
  <Box style={{ width: 200 }}>
    <Body size="medium" ellipsis>
      The quick brown fox jumps over the lazy dog
    </Body>
  </Box>
);
