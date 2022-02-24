import { CheckboxGroupField } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: CheckboxGroupField,
  args: {
    label: formatMessage("What are your favourite colors?"),
    orientation: "vertical",
    assistiveText: "You can select multiple options",
    options: [
      {
        value: "blue",
        label: formatMessage("Blue"),
      },
      {
        value: "green",
        label: formatMessage("Green"),
      },
      {
        value: "pink",
        label: formatMessage("Pink"),
        isDisabled: true,
      },
      {
        value: "red",
        label: formatMessage("Red"),
      },
    ],
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const Vertical = createControlledStory([], {});

export const Horizontal = createControlledStory([], { orientation: "horizontal" });

export const Error = createControlledStory([], {
  issues: [formatMessage("Select at least 1 option")],
});
