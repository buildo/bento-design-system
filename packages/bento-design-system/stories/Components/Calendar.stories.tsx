import { DateField } from "../../src/DateField2/DateField";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { DateFieldProps } from "../../src";

const ControlledDateField = (props: Omit<DateFieldProps, "value" | "onChange">) => {
  const [value, setValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));
  return (
    <DateField
      {...props}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};

const meta = {
  component: ControlledDateField,
  args: {
    type: "single",
    name: "date",
    label: "Date",
    assistiveText: "This is your favorite date",
    hint: "Some hint that is very useful to you",
  },
} satisfies Meta<DateFieldProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const value = today(getLocalTimeZone());

export const SingleDate = {} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    readOnly: true,
  },
} satisfies Story;
