import { Modal, Body, Placeholder, Stack, CustomModal, Feedback, Inset } from "../";
import { createComponentStories, textArgType } from "../util";
import { action } from "@storybook/addon-actions";
import { screen } from "@storybook/testing-library";

const { defaultExport, createStory } = createComponentStories({
  component: Modal,
  args: {
    title: "Create item title veeeery very long very long title here do you see how long it is?",
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
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
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
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const WithError = createStory({
  children: [<Placeholder />],
  primaryAction: {
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
  error: "Something went wrong",
});

export const Destructive = createStory({
  kind: "destructive",
  title: "Delete item",
  children: <Body size="medium">Are you sure you want to delete this item?</Body>,
  primaryAction: {
    label: "Delete",
    onPress: action("Delete"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const Warning = createStory({
  title: "Warning",
  kind: "warning",
  children: <Body size="medium">Are you sure you want to create this item?</Body>,
  primaryAction: {
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const WithAsyncPrimaryAction = createStory({
  children: [<Placeholder />],
  primaryAction: {
    label: "Create new item",
    onPress: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          action("Create")();
          resolve(null);
        }, 3000);
      }),
  },
  secondaryAction: {
    label: "Cancel",
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
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const Large = createStory({
  size: "large",
  children: [<Placeholder />],
  primaryAction: {
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const Wide = createStory({
  size: "wide",
  children: [<Placeholder />],
  primaryAction: {
    label: "Create",
    onPress: action("Create"),
  },
  secondaryAction: {
    label: "Cancel",
    onPress: action("Cancel"),
  },
});

export const Custom = () => {
  return (
    <CustomModal aria-label="Custom modal" isDestructive size="medium">
      <Inset space={24}>
        <Stack space={0} align="center">
          <Feedback
            size="medium"
            status="negative"
            title="Something went wrong"
            description="Wait a few minutes and retry"
            action={{ label: "retry", onPress: action("onPress") }}
          />
        </Stack>
      </Inset>
    </CustomModal>
  );
};
