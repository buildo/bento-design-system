import { createComponentStories, formatMessage, textArgType } from "../../util";
import { Headline } from "../..";

const { defaultExport, createStory } = createComponentStories({
  component: Headline,
  args: {
    children: formatMessage("The quick brown fox"),
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
