import { FunctionComponent } from "react";
import { Box, Inset, Placeholder } from "..";
import { createComponentStories, spaceArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Inset,
  args: {
    children: <Placeholder height={100} width={100} />,
  },
  argTypes: {
    space: spaceArgType,
    spaceX: spaceArgType,
    spaceY: spaceArgType,
  },
  decorators: [
    (Story: FunctionComponent) => (
      <Box background="neutral20" style={{ width: "fit-content" }}>
        <Story />
      </Box>
    ),
  ],
});

export default defaultExport;

export const allAxis = createStory({
  space: "16",
});

export const horizontal = createStory({
  spaceX: "16",
});

export const vertical = createStory({
  spaceY: "16",
});

export const horizontalAndVertical = createStory({
  spaceX: "40",
  spaceY: "16",
});
