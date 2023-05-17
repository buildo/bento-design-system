import { StoryFn } from "@storybook/react";
import {
  IconLightbulb,
  IconUser,
  IconPlaceholder,
  Modal,
  SelectField,
  BentoConfigProvider,
} from "../";
import { createComponentStories, fieldArgTypes, textArgType } from "../util";

const { defaultExport, createStory, createControlledStory } = createComponentStories({
  component: SelectField,
  args: {
    menuSize: "large",
    name: "color",
    label: "What's your favorite color?",
    placeholder: "Select a color",
    options: [
      {
        value: 1,
        label: "Red",
        kind: "two-line",
        secondLine: "prova",
        icon: IconPlaceholder,
      },
      {
        value: 2,
        label: "Blue",
        kind: "two-line",
        secondLine: "prova",
        icon: IconPlaceholder,
      },
      {
        value: 3,
        label: "Green",
        kind: "two-line",
        secondLine: "prova",
        icon: IconPlaceholder,
        disabled: true,
      },
      {
        value: 4,
        label: `
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.`,
        kind: "single-line",
      },
    ],
    noOptionsMessage: "No options",
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

export const LargeMenu = createControlledStory(undefined, {});

export const MediumMenu = createControlledStory(undefined, { menuSize: "medium" });

export const Disabled = createControlledStory(undefined, {
  disabled: true,
});

export const Error = createControlledStory(undefined, {
  issues: ["Please select a color"],
});

export const InModal = createControlledStory(undefined, {
  hint: "Something useful",
});
InModal.decorators = [
  (Story: StoryFn) => (
    <Modal title="Title" onClose={() => {}} closeButtonLabel="Close">
      <Story />
    </Modal>
  ),
];

export const MultiSelectOneOptionSelected = createControlledStory([1], {
  isMulti: true,
  multiValueMessage: (numberOfSelectedOptions: number) =>
    `${numberOfSelectedOptions} options selected`,
  showMultiSelectBulkActions: true,
});

export const MultiSelectMultipleOptionsSelected = createControlledStory([1, 2], {
  isMulti: true,
  multiValueMessage: (numberOfSelectedOptions: number) =>
    `${numberOfSelectedOptions} options selected`,
});

const manyColors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "maroon",
  "navy",
  "olive",
  "teal",
  "aqua",
  "fuchsia",
];

export const MultiSelectModeChipsSelected = createControlledStory(manyColors, {
  isMulti: true,
  multiSelectMode: "chips",
  showMultiSelectBulkActions: true,
  options: manyColors.map((color) => ({
    value: color,
    label: color,
    kind: "single-line",
  })),
});

export const WithIconSelected = createControlledStory(1, {
  options: [
    { value: 1, label: "Idea", icon: IconLightbulb },
    { value: 2, label: "User", icon: IconUser },
  ],
});

export const ReadOnly = createStory({
  value: 1,
  options: [
    { value: 1, label: "Idea", icon: IconLightbulb },
    { value: 2, label: "User", icon: IconUser },
  ],
  isReadOnly: true,
});

// This story tests that we can configure List specifically for SelectField
export const CustomListConfig = createStory({
  autoFocus: true,
});
CustomListConfig.decorators = [
  (Story: StoryFn) => (
    <BentoConfigProvider
      value={{
        dropdown: {
          list: {
            item: {
              paddingX: { large: 80, medium: 80 },
            },
          },
        },
      }}
    >
      <Modal title="Title" onClose={() => {}}>
        <Story />
      </Modal>
    </BentoConfigProvider>
  ),
];
