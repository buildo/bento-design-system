import { StoryFn, Meta, StoryObj } from "@storybook/react";
import {
  IconLightbulb,
  IconUser,
  IconPlaceholder,
  Modal,
  AsyncSelectField,
  BentoConfigProvider,
  SelectOption,
  AsyncSelectFieldProps,
} from "..";
import { useState } from "react";

const options: AsyncSelectFieldProps<number>["options"] = [
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
];

const meta = {
  component: AsyncSelectField,
  args: {
    value: undefined,
    menuSize: "large",
    name: "color",
    label: "What's your favorite color?",
    placeholder: "Select a color",
    options,
    noOptionsMessage: "No options",
    loadOptions: (inputValue: string) =>
      new Promise<AsyncSelectFieldProps<number>["options"]>((resolve) => {
        setTimeout(() => {
          resolve(
            options.filter((option) =>
              option.label?.toString().toLowerCase().includes(inputValue.toLowerCase())
            )
          );
        }, 1000);
      }),
  },
} satisfies Meta<AsyncSelectFieldProps<number>>;

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

export const Error = {
  args: {
    issues: ["Please select a color"],
  },
} satisfies Story;

export const InModal = {
  args: {
    hint: "Something useful",
  },
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

// This story tests that we can configure List specifically for SelectField
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

// NOTE(gabro): using a render function instead of just args, because the `value/onChange` trick we
// use to make the story controlled doesn't play well with the implementation of `clearable`
export const NotClearable = {
  args: {
    clearable: false,
  },
  render: (args) => {
    const [value, onChange] = useState<number | undefined>(undefined);
    return (
      <AsyncSelectField
        label={args.label}
        clearable={args.clearable}
        options={args.options as SelectOption<number>[]}
        value={value}
        onChange={onChange}
        loadOptions={args.loadOptions}
      />
    );
  },
} satisfies Story;
