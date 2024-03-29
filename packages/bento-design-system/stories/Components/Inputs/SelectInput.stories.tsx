import { StoryFn, Meta, StoryObj } from "@storybook/react";
import {
  IconLightbulb,
  IconUser,
  IconPlaceholder,
  Modal,
  SelectInput,
  BentoConfigProvider,
  SelectFieldProps,
} from "../..";

const meta = {
  component: SelectInput,
  args: {
    value: undefined,
    "aria-label": "select-input",
    validationState: "valid",
    menuSize: "large",
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
} satisfies Meta<typeof SelectInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LargeMenu = {} satisfies Story;

export const MediumMenu = {
  args: {
    menuSize: "medium",
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Invalid = {
  args: {
    validationState: "invalid",
  },
} satisfies Story;

export const InModal = {
  decorators: [
    (Story: StoryFn) => (
      <Modal title="Title" onClose={() => {}} closeButtonLabel="Close">
        <Story />
      </Modal>
    ),
  ],
} satisfies Story;

export const MultiSelectOneOptionSelected = {
  args: {
    value: [1],
    isMulti: true,
    multiValueMessage: (numberOfSelectedOptions: number) =>
      `${numberOfSelectedOptions} options selected`,
    showMultiSelectBulkActions: true,
  },
} satisfies Story;

export const MultiSelectMultipleOptionsSelected = {
  args: {
    value: [1, 2],
    isMulti: true,
    multiValueMessage: (numberOfSelectedOptions: number) =>
      `${numberOfSelectedOptions} options selected`,
  },
} satisfies Story;

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

export const MultiSelectModeChipsSelected = {
  args: {
    value: manyColors,
    isMulti: true,
    multiSelectMode: "chips",
    showMultiSelectBulkActions: true,
    options: manyColors.map((color) => ({
      value: color,
      label: color,
      kind: "single-line",
    })),
  },
} satisfies Story;

export const WithIconSelected = {
  args: {
    value: 1,
    options: [
      { value: 1, label: "Idea", icon: IconLightbulb },
      { value: 2, label: "User", icon: IconUser },
    ],
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value: 1,
    options: [
      { value: 1, label: "Idea", icon: IconLightbulb },
      { value: 2, label: "User", icon: IconUser },
    ],
    isReadOnly: true,
  },
} satisfies Story;

// This story tests that we can configure List specifically for SelectInput
export const CustomListConfig = {
  args: {
    autoFocus: true,
  },
  decorators: [
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
  ],
} satisfies Story;
