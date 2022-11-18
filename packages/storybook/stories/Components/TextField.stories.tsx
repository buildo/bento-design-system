import { TextField } from "..";
import { createComponentStories, fieldArgTypes, textArgType } from "../util";

const { defaultExport, createStory, createControlledStory } = createComponentStories({
  component: TextField,
  args: {
    name: "nickname",
    label: "Nickname",
    placeholder: "Insert your nickname",
    assistiveText: "Your nickname is the name people commonly use to informally refer to you",
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
  issues: ["Please insert at least 3 characters"],
});

export const ReadOnly = createStory({
  value: "MyNickname",
  isReadOnly: true,
});

export const CustomAccessory = createStory({
  value: "With a custom accessory",
  rightAccessory: "👍",
});
