import { TextArea } from "..";
import { createComponentStories, fieldArgTypes, textArgType } from "../util";

const { defaultExport, createStory, createControlledStory } = createComponentStories({
  component: TextArea,
  args: {
    name: "description",
    label: "Description",
    placeholder: "Insert description",
    assistiveText: "Add a description",
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

export const Default = createControlledStory("", {});

export const Disabled = createControlledStory("", {
  disabled: true,
});

export const Error = createControlledStory("", {
  issues: ["Please insert at least 3 words"],
});

export const ReadOnly = createStory({
  value: "This is a description",
  assistiveText: "",
  isReadOnly: true,
});
