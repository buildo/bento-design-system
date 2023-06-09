import { NumberField } from "../";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: NumberField,
  args: {
    value: undefined,
    name: "applications",
    label: "Applications",
    placeholder: "Number of target applications",
    assistiveText: "The number of applications this campaign is targeting",
  },
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: {
    value: 0,
    disabled: true,
  },
} satisfies Story;

export const Error = {
  args: {
    value: 0,
    issues: ["Please insert a number greater than 2"],
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
