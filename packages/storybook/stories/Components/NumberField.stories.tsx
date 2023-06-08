import { NumberField } from "../";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: NumberField,
  args: {
    value: 0,
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
    disabled: true,
  },
} satisfies Story;

export const Error = {
  args: {
    issues: ["Please insert a number greater than 2"],
  },
} satisfies Story;

export const Currency = {
  args: {
    kind: "currency",
    currency: "EUR",
  },
} satisfies Story;

export const Percentage = {
  args: {
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
    rightAccessory: "👍",
  },
} satisfies Story;

export const KindAndRightAccessory = {
  args: {
    rightAccessory: "💰",
    kind: "currency",
    currency: "EUR",
  },
} satisfies Story;
