import { ReadOnlyField } from "..";
import { createComponentStories, fieldArgTypes, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: ReadOnlyField,
  args: {
    name: "nickname",
    label: formatMessage("Nickname"),
    assistiveText: formatMessage(
      "Your nickname is the name people commonly use to informally refer to you"
    ),
    value: "myNickname",
  },
  argTypes: {
    ...fieldArgTypes,
  },
});

export default defaultExport;

export const Default = createStory({});

export const Password = createStory({ type: "password" });
