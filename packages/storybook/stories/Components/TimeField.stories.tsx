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

const x = new Time(12, 30);

console.log(x);

// export const ReadOnly = createStory({
//   value: x,
//   isReadOnly: true,
// });
