import { createComponentStories, fieldArgTypes, textArgType } from "../util";
import { DateField } from "../";
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

const { defaultExport, createControlledStory } = createComponentStories({
  component: DateField,
  args: {
    name: "date",
    label: "Date",
    placeholder: "Select a date",
    assistiveText: "This is your favorite date",
    hint: "Some hint that is very useful to you",
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

const today = startOfToday();
const value = new Date(2022, 1, 4);

export const SingleDate = createControlledStory(value, {});

export const Disabled = createControlledStory(null, {
  disabled: true,
});

export const ReadOnly = createControlledStory(value, {
  readOnly: true,
});

export const Range = createControlledStory([value, addDays(value, 2)], {
  type: "range",
});

const inOneWeek = addWeeks(today, 1);
export const SingleWithMinMax = createControlledStory(null, {
  minDate: today,
  maxDate: inOneWeek,
  assistiveText: "You can select a date between today and one week from now",
});

const inOneMonth = addMonths(today, 1);
export const RangeWithMinMax = createControlledStory([null, null], {
  type: "range",
  minDate: today,
  maxDate: inOneMonth,
  assistiveText: "You can select a date between today and one month from now",
});

export const SingleWithShortcuts = createControlledStory(null, {
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
});

export const RangeWithShortcuts = createControlledStory([null, null], {
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
});

export const DisabledDates = createControlledStory(null, {
  shouldDisableDate: (date: Date) => date.getDay() === 0,
});
