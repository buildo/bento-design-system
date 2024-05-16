import { DateField, DateFieldProps } from "..";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addMonths,
  startOfToday,
  addWeeks,
  addDays,
} from "date-fns";
import { screen, waitFor } from "@storybook/test";
import isChromatic from "chromatic/isChromatic";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: DateField,
  args: {
    name: "date",
    label: "Date",
    assistiveText: "This is your favorite date",
    hint: "Some hint that is very useful to you",
  },
} satisfies Meta<DateFieldProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const today = startOfToday();
const value = new Date(2022, 1, 4);

export const SingleDate = {
  args: {
    value,
  },
} satisfies Story;

export const Disabled = {
  args: {
    value: null,
    disabled: true,
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    value,
    readOnly: true,
  },
} satisfies Story;

const inOneWeek = addWeeks(today, 1);
export const SingleWithMinMax = {
  args: {
    value: null,
    minDate: today,
    maxDate: inOneWeek,
    assistiveText: "You can select a date between today and one week from now",
  },
} satisfies Story;

const inOneMonth = addMonths(today, 1);
export const SingleWithShortcuts = {
  args: {
    value: null,
    shortcuts: [
      { label: "Clear", value: null },
      {
        label: "Today",
        value: new Date(),
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
    shouldDisableDate: (date: Date) => date.getDay() === 0,
  },
};
export const CalendarOpen = {
  args: {
    value,
  },
  play: async () => {
    const button = screen.getByRole("button");
    await waitFor(async () => {
      await button.click();
    });
    // wait a bit to see if it solves Chromatic snapshot flakiness
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
    value: [value, addDays(value, 2)],
    type: "range",
  },
} satisfies Story;

export const RangeWithMinMax = {
  args: {
    value: null,
    type: "range",
    minDate: today,
    maxDate: inOneMonth,
    assistiveText: "You can select a date between today and one month from now",
  },
} satisfies Story;

export const RangeWithShortcuts = {
  args: {
    value: null,
    type: "range",
    shortcuts: [
      {
        label: "Clear all",
        value: null,
      },
      {
        label: "This Week",
        value: [startOfWeek(today), endOfWeek(today)],
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
