import { JSXElementConstructor } from "react";
import { Bleed, Box, Inset, Placeholder } from "..";
import { createComponentStories, spaceArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Bleed,
  args: {
    children: <Placeholder height={100} width={100} />,
  },
  argTypes: {
    space: spaceArgType,
    spaceX: spaceArgType,
    spaceY: spaceArgType,
  },
  decorators: [
    (Story: JSXElementConstructor<unknown>) => (
      <Box background="softViolet" style={{ width: "fit-content" }}>
        <Inset space={24}>
          <Story />
        </Inset>
      </Box>
    ),
  ],
});

export default defaultExport;

export const allAxis = createStory({
  space: 40,
});

export const horizontal = createStory({
  spaceX: 40,
});

export const vertical = createStory({
  spaceY: 40,
});

export const horizontalAndVertical = createStory({
  spaceX: 40,
  spaceY: 16,
});
