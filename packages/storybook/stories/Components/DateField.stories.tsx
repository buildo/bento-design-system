import { createComponentStories, formatMessage, fieldArgTypes, textArgType } from "../util";
import { DateField } from "../";

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
