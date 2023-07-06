import { ReadOnlyField } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ReadOnlyField,
  args: {
    name: "nickname",
    label: "Nickname",
    assistiveText: "Your nickname is the name people commonly use to informally refer to you",
    value: "myNickname",
  },
} satisfies Meta<typeof ReadOnlyField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Password = {
  args: {
    type: "password",
  },
} satisfies Story;

export const RightAccessory = {
  args: {
    rightAccessory: "👍",
  },
} satisfies Story;

export const WithCopyButton = {
  args: {
    withCopyButton: true,
    copyButtonLabel: "Copy to clipboard",
    copySuccessMessage: "Copied to clipboard",
  },
} satisfies Story;

export const WithCopyButtonAndRightAccessory = {
  args: {
    withCopyButton: true,
    copyButtonLabel: "Copy to clipboard",
    copySuccessMessage: "Copied to clipboard",
    rightAccessory: "👍",
  },
} satisfies Story;
