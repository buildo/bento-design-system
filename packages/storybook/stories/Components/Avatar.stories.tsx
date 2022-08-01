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

export const WithImageUrl = createStory({
  color: "blue",
  imageSrc: "https://bento.buildo.io/img/logo.svg",
});

export const WithImageUrlBroken = createStory({
  color: "blue",
  imageSrc: "https://bento.buildo.io/broken-url.svg",
});
