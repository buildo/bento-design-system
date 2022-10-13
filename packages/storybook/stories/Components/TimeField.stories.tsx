import { TimeField, Time } from "..";
import { createComponentStories, fieldArgTypes } from "../util";

const { defaultExport, createStory, createControlledStory } = createComponentStories({
  component: TimeField,
  args: {
    name: "time",
    label: "Time",
    assistiveText: "Choose the appointment time",
  },
  argTypes: fieldArgTypes,
});

export default defaultExport;

export const Default = createControlledStory("", {});

export const Disabled = createControlledStory("", {
  disabled: true,
});

export const Error = createControlledStory("", {
  issues: ["This time is not available"],
});

export const ReadOnly = createStory({
  // NOTE(gabro): ok this is a weird bug of Storybook
  // It should use `new Time(10, 15)` but it generates a bug when doing so.
  // The reason seems to be that the constructor is minified
  // in @internationalized/date to a string starting with $ followed by digits.
  // Apparently the Storybook "reviver" function (which I assume restores the
  // manager cache accidentally strips the $ from the string, resulting in an
  // invalid constructor name (starting with a digit).
  // In practice, this is a Storybook-specific bug, so we'll just work around it
  // and hope that future versions of Storybook will fix it.
  value: {
    hour: 10,
    minute: 15,
  } as Time,
  isReadOnly: true,
});
