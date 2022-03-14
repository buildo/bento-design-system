import { Avatar } from "../";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Avatar,
  args: {},
  argTypes: {},
});

export default defaultExport;

export const Default = createStory({
  color: "blue",
  name: " Alberto",
});

export const WithoutName = createStory({
  color: "blue",
  name: undefined,
});
