import { Switch } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: Switch,
  args: {
    label: formatMessage("Label"),
    name: "switch-label",
  },
  argTypes: { label: textArgType },
});

export default defaultExport;

export const Unchecked = createControlledStory(false, {});

export const Checked = createControlledStory(true, {});

export const UncheckedDisabled = createControlledStory(false, { disabled: true });

export const CheckedDisabled = createControlledStory(true, { disabled: true });
