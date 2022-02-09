import { createComponentStories, formatMessage, textArgType } from "../util";
import { Link } from "../";

const { defaultExport, createStory } = createComponentStories({
  component: Link,
  args: {
    label: formatMessage("Button"),
    href: "https://google.com",
    target: "blank",
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const Default = createStory({});
export const Disabled = createStory({
  isDisabled: true,
});
