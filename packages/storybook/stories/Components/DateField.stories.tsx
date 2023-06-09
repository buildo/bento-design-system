import { DateField } from "../";
import type { DateFieldProps } from "@buildo/bento-design-system";
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
import { screen, waitFor } from "@storybook/testing-library";
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

export const Range = {
  args: {
    value: [value, addDays(value, 2)],
    type: "range",
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
export const RangeWithMinMax = {
  args: {
    value: [null, null],
    type: "range",
    minDate: today,
    maxDate: inOneMonth,
    assistiveText: "You can select a date between today and one month from now",
  },
} satisfies Story;

export const SingleWithShortcuts = {
  args: {
    value: null,
    shortcuts: [
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

export const RangeWithShortcuts = {
  args: {
    value: [null, null],
    type: "range",
    shortcuts: [
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
    const input = screen.getByRole("textbox");
    await waitFor(async () => {
      await input.click();
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
