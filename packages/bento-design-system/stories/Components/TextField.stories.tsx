import { TextField } from "..";
import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

const meta = {
  component: TextField,
  args: {
    value: "",
    name: "nickname",
    label: "Nickname",
    placeholder: "Insert your nickname",
    assistiveText: "Your nickname is the name people commonly use to informally refer to you",
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Error = {
  args: {
    issues: ["Please insert at least 3 characters"],
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value: "MyNickname",
    isReadOnly: true,
  },
} satisfies Story;

export const CustomAccessory = {
  args: {
    value: "With a custom accessory",
    rightAccessory: "👍",
  },
} satisfies Story;

export const NonDefaultType = {
  args: {
    value: "bento@example.com",
    type: "email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textField = canvas.getByRole("textbox");
    await expect(textField).toHaveAttribute("type", "email");
  },
} satisfies Story;
