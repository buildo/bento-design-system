import { createComponentStories, formatMessage, textArgType } from "../../util";
import { Display } from "../../../src/Typography/Display/Display";

const { defaultExport, createStory } = createComponentStories({
  component: Display,
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
