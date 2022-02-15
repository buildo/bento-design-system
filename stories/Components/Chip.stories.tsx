import { Chip } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Chip,
  args: {
    label: formatMessage("Label"),
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const NonDismissable = createStory(
  {
    color: "blue",
  },
  { actions: { argTypesRegex: "" } }
);

export const Dismissable = createStory({
  color: "blue",
});
