import { createComponentStories, textArgType } from "../../util";
import { Box, Title } from "../..";

const { defaultExport, createStory } = createComponentStories({
  component: Title,
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
  <Box style={{ width: 100 }}>
    <Title size="medium" ellipsis>
      The quick brown fox
    </Title>
  </Box>
);
