import { action } from "@storybook/addon-actions";
import { Feedback } from "..";
import { IllustrationIdea } from "..";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Feedback,
  args: {
    title: formatMessage("Title"),
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
  description: formatMessage("Description"),
});

export const TitleAndButton = createStory({
  action: {
    onPress: action("On click"),
    label: formatMessage("Click here"),
  },
});

export const TitleDescriptionAndButton = createStory({
  description: formatMessage("Description"),
  action: {
    onPress: action("On click"),
    label: formatMessage("Click here"),
  },
});

export const WrappingTitleAndDescription = createStory({
  title: formatMessage("Very long title that wraps to the next line"),
  description: formatMessage(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ),
});

export const Background = createStory({
  description: formatMessage("Description"),
  action: {
    onPress: action("On click"),
    label: formatMessage("Click here"),
  },
  background: true,
});

export const CustomIllustration = createStory({
  illustration: IllustrationIdea,
  description: formatMessage("Description"),
  action: {
    onPress: action("On click"),
    label: formatMessage("Click here"),
  },
});

export const MediumSize = createStory({
  size: "medium",
  description: formatMessage("Description"),
  action: {
    onPress: action("On click"),
    label: formatMessage("Click here"),
  },
});
