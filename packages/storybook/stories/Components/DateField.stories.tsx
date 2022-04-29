import { createComponentStories, formatMessage, fieldArgTypes, textArgType } from "../util";
import { DateField } from "../";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

const { defaultExport, createControlledStory } = createComponentStories({
  component: DateField,
  args: {
    name: "date",
    label: formatMessage("Date"),
    placeholder: formatMessage("Select a date"),
    assistiveText: formatMessage("This is your favorite date"),
    hint: formatMessage("Some hint that is very useful to you"),
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

const value = new Date("2022-02-04T09:25:00.000Z");

export const SingleDate = createControlledStory(value, {});

export const Disabled = createControlledStory(null, {
  disabled: true,
});

export const ReadOnly = createControlledStory(value, {
  readOnly: true,
});

export const Range = createControlledStory([value, value], {
  type: "range",
});

const today = new Date();
const inOneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
export const SingleWithMinMax = createControlledStory(null, {
  minDate: today,
  maxDate: inOneWeek,
  assistiveText: formatMessage("You can select a date between today and one week from now"),
});

const inOneMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
export const RangeWithMinMax = createControlledStory([null, null], {
  type: "range",
  minDate: today,
  maxDate: inOneMonth,
  assistiveText: formatMessage("You can select a date between today and one month from now"),
});

export const SingleWithShortcuts = createControlledStory(null, {
  shortcuts: [
    {
      label: formatMessage("Today"),
      value: new Date(),
    },
    {
      label: formatMessage("In a week"),
      value: inOneWeek,
    },
    {
      label: formatMessage("In a month"),
      value: inOneMonth,
    },
  ],
});

export const RangeWithShortcuts = createControlledStory([null, null], {
  type: "range",
  shortcuts: [
    {
      label: formatMessage("This Week"),
      value: [startOfWeek(today), endOfWeek(today)],
    },
    {
      label: formatMessage("This Month"),
      value: [startOfMonth(today), endOfMonth(today)],
    },
    {
      label: formatMessage("This Year"),
      value: [startOfYear(today), endOfYear(today)],
    },
  ],
});
