import { Placeholder } from "@buildo/bento-design-system";
import { StoryFn } from "@storybook/addons";
import { DecorativeDivider, Stack } from "../";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: DecorativeDivider,
  args: {},
  decorators: [
    (Story: StoryFn) => (
      <Stack space={16}>
        <Placeholder />
        <Story />
        <Placeholder />
      </Stack>
    ),
  ],
});

export default defaultExport;

export const Default = createStory({});
