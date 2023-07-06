import { Switch } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Switch,
  args: {
    label: "Label",
    name: "switch-label",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked = {
  args: {
    value: false,
  },
} satisfies Story;

export const Checked = {
  args: {
    value: true,
  },
} satisfies Story;

export const UncheckedDisabled = {
  args: {
    value: false,
    disabled: true,
  },
} satisfies Story;

export const CheckedDisabled = {
  args: {
    value: true,
    disabled: true,
  },
} satisfies Story;

export const LongLabel = {
  args: {
    value: false,
    label:
      "Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.",
  },
} satisfies Story;

export const TrailingSwitch = {
  args: {
    value: true,
    switchPosition: "trailing",
  },
} satisfies Story;
