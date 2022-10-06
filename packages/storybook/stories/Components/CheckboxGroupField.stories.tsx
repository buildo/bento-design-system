import { CheckboxGroupField } from "../";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: CheckboxGroupField,
  args: {
    label: "What are your favourite colors?",
    orientation: "vertical",
    assistiveText: "You can select multiple options",
    options: [
      {
        value: "blue",
        label: "Blue",
      },
      {
        value: "green",
        label: "Green",
      },
      {
        value: "pink",
        label: "Pink",
        isDisabled: true,
      },
      {
        value: "red",
        label: "Red",
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
  issues: ["Select at least 1 option"],
});
