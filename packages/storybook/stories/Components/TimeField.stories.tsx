import { TimeField, Time } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TimeField,
  args: {
    value: undefined,
    name: "time",
    label: "Time",
    assistiveText: "Choose the appointment time",
  },
} satisfies Meta<typeof TimeField>;

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
    issues: ["This time is not available"],
  },
} satisfies Story;

export const ReadOnly = {
  // NOTE(gabro): ok this is a weird bug of Storybook
  // It should use `new Time(10, 15)` but it generates a bug when doing so.
  // The reason seems to be that the constructor is minified
  // in @internationalized/date to a string starting with $ followed by digits.
  // Apparently the Storybook "reviver" function (which I assume restores the
  // manager cache) accidentally strips the $ from the string, resulting in an
  // invalid constructor name (starting with a digit).
  // In practice, this is a Storybook-specific bug, so we'll just work around it
  // and hope that future versions of Storybook will fix it.
  args: {
    value: {
      hour: 10,
      minute: 15,
    } as Time,
    isReadOnly: true,
  },
} satisfies Story;
