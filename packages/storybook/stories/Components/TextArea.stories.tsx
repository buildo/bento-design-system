import { TextArea } from "..";
import { createComponentStories, fieldArgTypes, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: TextArea,
  args: {
    name: "description",
    label: formatMessage("Description"),
    placeholder: formatMessage("Insert description"),
    assistiveText: formatMessage("Add a description"),
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

export const textArea = createControlledStory("", {});
