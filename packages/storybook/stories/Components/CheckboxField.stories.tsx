import { CheckboxField } from "../";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: CheckboxField,
  args: {
    label: "I agree with the terms and conditions",
    name: "terms-and-conditions",
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const Unchecked = createControlledStory(false, {});

export const Checked = createControlledStory(true, {});

export const Error = createControlledStory(false, {
  issues: ["This field is required"],
});

export const Disabled = createControlledStory(false, {
  disabled: true,
});

export const LongLabel = createControlledStory(false, {
  label:
    "Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.",
});
