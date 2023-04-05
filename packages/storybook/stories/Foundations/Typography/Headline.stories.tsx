import { createComponentStories, textArgType } from "../../util";
import { Headline } from "../..";
import { Box } from "@buildo/bento-design-system";

const { defaultExport, createStory } = createComponentStories({
  component: Headline,
  args: {
    children: "The quick brown fox",
  },
  argTypes: {
    children: textArgType,
  },
});

export default defaultExport;

export const Small = createStory({
  size: "small",
});

export const Medium = createStory({
  size: "medium",
});

export const Large = createStory({
  size: "large",
});

export const Ellipsis = () => (
  <Box style={{ width: 200 }}>
    <Headline size="medium" ellipsis>
      The quick brown fox
    </Headline>
  </Box>
);
