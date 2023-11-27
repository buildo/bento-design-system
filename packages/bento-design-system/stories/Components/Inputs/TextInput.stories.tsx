import { TextInput } from "../..";
import { StoryObj, Meta } from "@storybook/react";

const meta = {
  component: TextInput,
  args: {
    value: "",
    validationState: "valid",
    "aria-label": "text-input",
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Invalid = {
  args: {
    validationState: "invalid",
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value: "Read only",
    isReadOnly: true,
  },
} satisfies Story;

export const CustomAccessory = {
  args: {
    value: "With a custom accessory",
    rightAccessory: "👍",
  },
} satisfies Story;

export const Password = {
  args: {
    value: "password",
    type: "password",
  },
} satisfies Story;
