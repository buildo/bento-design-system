import { Modal, Body, Placeholder } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Modal,
  args: {
    title: formatMessage(
      "Create item title veeeery very long very long title here do you see how long it is?"
    ),
  },
  argTypes: {
    title: textArgType,
    closeButtonLabel: textArgType,
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 400,
    },
  },
});

export default defaultExport;

export const WithActions = createStory({
  children: [<Placeholder />],
  primaryAction: {
    label: formatMessage("Create"),
    onPress: action("Create"),
  },
  secondaryAction: {
    label: formatMessage("Cancel"),
    onPress: action("Cancel"),
  },
});

export const Destructive = createStory({
  isDestructive: true,
  title: formatMessage("Delete item"),
  children: (
    <Body size="medium">{formatMessage("Are you sure you want to delete this item?")}</Body>
  ),
  primaryAction: {
    label: formatMessage("Delete"),
    onPress: action("Delete"),
  },
  secondaryAction: {
    label: formatMessage("Cancel"),
    onPress: action("Cancel"),
  },
});

export const WithAsyncPrimaryAction = createStory({
  children: [<Placeholder />],
  primaryAction: {
    label: formatMessage("Create"),
    onPress: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          action("Create")();
          resolve(null);
        }, 3000);
      }),
  },
  secondaryAction: {
    label: formatMessage("Cancel"),
    onPress: action("Cancel"),
  },
});
