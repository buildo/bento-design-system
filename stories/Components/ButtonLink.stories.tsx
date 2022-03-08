import { createComponentStories, formatMessage, textArgType } from "../util";
import { ButtonLink } from "../";

const { defaultExport, createStory } = createComponentStories({
  component: ButtonLink,
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

export const Primary = createStory({
  kind: "solid",
  hierarchy: "primary",
});

export const Active = createStory({
  kind: "solid",
  hierarchy: "primary",
  active: true,
});
