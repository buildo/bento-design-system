import { CheckboxField } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: CheckboxField,
  args: {
    label: formatMessage("I agree with the terms and conditions"),
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
  issues: [formatMessage("This field is required")],
});

export const Disabled = createControlledStory(false, {
  disabled: true,
});
