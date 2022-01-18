import { createComponentStories, formatMessage, textArgType } from "../../util";
import { Label } from "../../../src/Typography/Label/Label";

const { defaultExport, createStory } = createComponentStories({
  component: Label,
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

export const Uppercase = createStory({
  size: "medium",
  uppercase: true,
});
