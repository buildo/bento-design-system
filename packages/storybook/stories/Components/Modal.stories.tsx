import { Modal, Body, Placeholder, Stack } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";
import { action } from "@storybook/addon-actions";
import { screen } from "@testing-library/dom";

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

export const Scrollable = createStory({
  children: [
    <Stack space={16}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Stack>,
  ],
  primaryAction: {
    label: formatMessage("Create"),
    onPress: action("Create"),
  },
  secondaryAction: {
    label: formatMessage("Cancel"),
    onPress: action("Cancel"),
  },
});

export const WithError = createStory({
  children: [<Placeholder />],
  primaryAction: {
    label: formatMessage("Create"),
    onPress: action("Create"),
  },
  secondaryAction: {
    label: formatMessage("Cancel"),
    onPress: action("Cancel"),
  },
  error: formatMessage("Something went wrong"),
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
    label: formatMessage("Create new item"),
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
WithAsyncPrimaryAction.play = async () => {
  const button = screen.getByRole("button", { name: /create new item/i });
  await button.click();
};

export const Small = createStory({
  size: "small",
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

export const Large = createStory({
  size: "large",
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
