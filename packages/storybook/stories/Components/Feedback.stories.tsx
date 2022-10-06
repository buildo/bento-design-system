import { action } from "@storybook/addon-actions";
import { Feedback, IllustrationIdea } from "..";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Feedback,
  args: {
    title: "Title",
    status: "positive",
    size: "large",
  },
  argTypes: {
    title: textArgType,
    description: textArgType,
  },
});

export default defaultExport;

export const Positive = createStory({
  status: "positive",
});

export const Negative = createStory({
  status: "negative",
});

export const TitleAndDescription = createStory({
  description: "Description",
});

export const TitleAndButton = createStory({
  action: {
    onPress: action("On click"),
    label: "Click here",
  },
});

export const TitleDescriptionAndButton = createStory({
  description: "Description",
  action: {
    onPress: action("On click"),
    label: "Click here",
  },
});

export const WrappingTitleAndDescription = createStory({
  title: "Very long title that wraps to the next line",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
});

export const Background = createStory({
  description: "Description",
  action: {
    onPress: action("On click"),
    label: "Click here",
  },
  background: true,
});

export const CustomIllustration = createStory({
  illustration: IllustrationIdea,
  description: "Description",
  action: {
    onPress: action("On click"),
    label: "Click here",
  },
});

export const MediumSize = createStory({
  size: "medium",
  description: "Description",
  action: {
    onPress: action("On click"),
    label: "Click here",
  },
});
