import { StoryFn } from "@storybook/addons";
import { Column, Columns, Divider, Placeholder, Stack } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Divider,
  args: {},
});

export default defaultExport;

export const Vertical = createStory({ orientation: "vertical" });
Vertical.decorators = [
  (Story: StoryFn) => (
    <Columns space={16} alignY="stretch">
      <Placeholder />
      <Column width="content">
        <Story />
      </Column>
      <Placeholder />
    </Columns>
  ),
];

export const Horizontal = createStory({ orientation: "horizontal" });
Horizontal.decorators = [
  (Story: StoryFn) => (
    <Stack space={16}>
      <Placeholder />
      <Story />
      <Placeholder />
    </Stack>
  ),
];
