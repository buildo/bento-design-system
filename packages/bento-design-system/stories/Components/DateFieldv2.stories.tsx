import { DateField, DateFieldProps } from "../../src/DateField2/DateField";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  CalendarDate,
  getLocalTimeZone,
  today as _today,
  getDayOfWeek,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "@internationalized/date";
import isChromatic from "chromatic";
import { screen, waitFor } from "@storybook/testing-library";

const ControlledDateField = (props: Omit<DateFieldProps, "value" | "onChange">) => {
  const [value, setValue] = useState<CalendarDate | null>(null);
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

const today = _today(getLocalTimeZone());

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

const inOneWeek = today.add({ weeks: 1 });
export const SingleWithMinMax = {
  args: {
    minDate: today,
    maxDate: inOneWeek,
    assistiveText: "You can select a date between today and one week from now",
  },
} satisfies Story;

const inOneMonth = today.add({ months: 1 });
export const SingleWithShortcuts = {
  args: {
    value: null,
    shortcuts: [
      {
        label: "Today",
        value: today,
      },
      {
        label: "In a week",
        value: inOneWeek,
      },
      {
        label: "In a month",
        value: inOneMonth,
      },
    ],
  },
} satisfies Story;
export const DisabledDates = {
  args: {
    shouldDisableDate: (date: CalendarDate) => getDayOfWeek(date, "en-EN") === 0,
  },
};
export const CalendarOpen = {
  args: {
    value: today,
  },
  play: async () => {
    const button = screen.getByRole("button");
    await waitFor(async () => {
      await button.click();
    });
  },
  decorators: isChromatic()
    ? [
        (Story) => (
          <div style={{ paddingBottom: "600px" }}>
            <Story />
          </div>
        ),
      ]
    : [],
} satisfies Story;

export const Range = {
  args: {
    value: [today, today.add({ days: 2 })],
    type: "range",
  },
} satisfies Story;
export const RangeWithMinMax = {
  args: {
    value: [null, null],
    type: "range",
    minDate: today,
    maxDate: inOneMonth,
    assistiveText: "You can select a date between today and one month from now",
  },
} satisfies Story;
export const RangeWithShortcuts = {
  args: {
    value: [null, null],
    type: "range",
    shortcuts: [
      {
        label: "This Week",
        value: [startOfWeek(today, "en-EN"), endOfWeek(today, "en-EN")],
      },
      {
        label: "This Month",
        value: [startOfMonth(today), endOfMonth(today)],
      },
      {
        label: "This Year",
        value: [startOfYear(today), endOfYear(today)],
      },
    ],
  },
};
