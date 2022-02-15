import { StoryFn } from "@storybook/react";
import { Modal, SelectField } from "../";
import { createComponentStories, fieldArgTypes, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: SelectField,
  args: {
    size: "large",
    name: "color",
    label: formatMessage("What's your favorite color?"),
    placeholder: formatMessage("Select a color"),
    options: [
      { value: 1, label: formatMessage("Red") },
      { value: 2, label: formatMessage("Blue") },
      { value: 3, label: formatMessage("Green") },
      {
        value: 4,
        label: formatMessage(`
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.`),
      },
    ],
    noOptionsMessage: formatMessage("No options"),
    multiValueMessage: (numberOfSelectedOptions: number) =>
      formatMessage(`${numberOfSelectedOptions} options selected`),
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

export const LargeMenu = createControlledStory(undefined, {});

export const MediumMenu = createControlledStory(undefined, { size: "medium" });

export const Disabled = createControlledStory(undefined, {
  disabled: true,
});

export const Error = createControlledStory(undefined, {
  issues: [formatMessage("Please select a color")],
});

export const InModal = createControlledStory(undefined, {});
InModal.decorators = [
  (Story: StoryFn) => (
    <Modal
      title={formatMessage("Title")}
      onClose={() => {}}
      closeButtonLabel={formatMessage("Close")}
    >
      <Story />
    </Modal>
  ),
];

export const MultiSelectOneOptionSelected = createControlledStory([1], {
  isMulti: true,
});

export const MultiSelectMultipleOptionsSelected = createControlledStory([1, 2], {
  isMulti: true,
});
