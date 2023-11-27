import { NumberInput } from "../..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: NumberInput,
  args: {
    value: undefined,
    "aria-label": "number-input",
    validationState: "valid",
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: {
    value: 0,
    disabled: true,
  },
} satisfies Story;

export const Invalid = {
  args: {
    value: 0,
    validationState: "invalid",
  },
} satisfies Story;

export const Currency = {
  args: {
    value: 0,
    kind: "currency",
    currency: "EUR",
  },
} satisfies Story;

export const Percentage = {
  args: {
    value: 0,
    kind: "percentage",
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value: 50,
    kind: "percentage",
    isReadOnly: true,
  },
} satisfies Story;

export const MinMaxAndStep = {
  args: {
    value: 5,
    minValue: 0.1,
    maxValue: 10,
    step: 0.5,
  },
} satisfies Story;

export const RightAccessory = {
  args: {
    value: 0,
    rightAccessory: "👍",
  },
} satisfies Story;

export const KindAndRightAccessory = {
  args: {
    value: 0,
    rightAccessory: "💰",
    kind: "currency",
    currency: "EUR",
  },
} satisfies Story;
