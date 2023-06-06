import { TextArea } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TextArea,
  args: {
    name: "description",
    label: "Description",
    placeholder: "Insert description",
    assistiveText: "Add a description",
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Error = {
  args: {
    issues: ["Please insert at least 3 words"],
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value: "This is a description",
    assistiveText: "",
    isReadOnly: true,
  },
} satisfies Story;
