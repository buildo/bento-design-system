import { ReadOnlyField } from "..";
import { createComponentStories, fieldArgTypes } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: ReadOnlyField,
  args: {
    name: "nickname",
    label: "Nickname",
    assistiveText: "Your nickname is the name people commonly use to informally refer to you",
    value: "myNickname",
  },
  argTypes: {
    ...fieldArgTypes,
  },
});

export default defaultExport;

export const Default = createStory({});

export const Password = createStory({ type: "password" });
