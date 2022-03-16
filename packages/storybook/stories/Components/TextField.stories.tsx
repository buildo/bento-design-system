import { TextField } from "..";
import { createComponentStories, fieldArgTypes, formatMessage, textArgType } from "../util";

const { defaultExport, createStory, createControlledStory } = createComponentStories({
  component: TextField,
  args: {
    name: "nickname",
    label: formatMessage("Nickname"),
    placeholder: formatMessage("Insert your nickname"),
    assistiveText: formatMessage(
      "Your nickname is the name people commonly use to informally refer to you"
    ),
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
  issues: [formatMessage("Please insert at least 3 characters")],
});

export const ReadOnly = createStory({
  value: "MyNickname",
  isReadOnly: true,
});
