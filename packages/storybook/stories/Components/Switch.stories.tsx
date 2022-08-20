import { Switch } from "../";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: Switch,
  args: {
    label: "Label",
    name: "switch-label",
  },
  argTypes: { label: textArgType },
});

export default defaultExport;

export const Unchecked = createControlledStory(false, {});

export const Checked = createControlledStory(true, {});

export const UncheckedDisabled = createControlledStory(false, { disabled: true });

export const CheckedDisabled = createControlledStory(true, { disabled: true });

export const LongLabel = createControlledStory(false, {
  label:
    "Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.",
});

export const TrailingSwitch = createControlledStory(true, {
  switchPosition: "trailing",
});
