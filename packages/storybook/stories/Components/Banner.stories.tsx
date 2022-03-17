import { createComponentStories, formatMessage, textArgType } from "../util";
import { Banner } from "../";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Banner,
  args: {},
  argTypes: {
    title: textArgType,
    description: textArgType,
  },
});

export default defaultExport;

const title = formatMessage("Title");
const shortDescription = formatMessage("Description");
const longDescription = formatMessage(`Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.
Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.
Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.`);

export const Dismissable = createStory({
  kind: "informative",
  title,
  description: shortDescription,
});

export const DismissableWithAction = createStory({
  kind: "informative",
  title,
  description: shortDescription,
  action: {
    label: formatMessage("Close"),
    onPress: action("onAction"),
  },
});

export const NonDismissable = createStory(
  {
    kind: "informative",
    title,
    description: shortDescription,
  },
  { actions: { argTypesRegex: "" } }
);

export const Informative = createStory({
  kind: "informative",
  title,
  description: shortDescription,
});

export const Positive = createStory({
  kind: "positive",
  title,
  description: shortDescription,
});

export const Warning = createStory({
  kind: "warning",
  title,
  description: shortDescription,
});

export const Negative = createStory({
  kind: "negative",
  title,
  description: shortDescription,
});

export const Secondary = createStory({
  kind: "secondary",
  title,
  description: shortDescription,
});

export const NoDescription = createStory({
  kind: "informative",
  title,
});

export const NoTitle = createStory({
  kind: "informative",
  description: shortDescription,
});

export const ShortDescription = createStory({
  kind: "informative",
  title,
  description: shortDescription,
});

export const LongDescription = createStory({
  kind: "informative",
  title,
  description: longDescription,
});
