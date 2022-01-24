import { Snackbar, SnackbarProvider, useSnackbar } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";
import { action } from "@storybook/addon-actions";
import { ComponentProps, useEffect } from "react";
import { Meta, StoryFn } from "@storybook/react";

const { defaultExport, createStory } = createComponentStories({
  component: Snackbar,
  args: {
    message: formatMessage("This is a message for you"),
  },
  argTypes: {
    message: textArgType,
  },
});

export default defaultExport;

export const Message = createStory({
  kind: "informative",
});

export const MessageAndAction = createStory({
  kind: "informative",
  action: {
    label: formatMessage("Action"),
    onPress: action("onPress"),
  },
});

export const Positive = createStory({
  kind: "positive",
  action: {
    label: formatMessage("Action"),
    onPress: action("onPress"),
  },
});

export const Negative = createStory({
  kind: "negative",
  action: {
    label: formatMessage("Action"),
    onPress: action("onPress"),
  },
});

export const Warning = createStory({
  kind: "warning",
  action: {
    label: formatMessage("Action"),
    onPress: action("onPress"),
  },
});

export const Secondary = createStory({
  kind: "secondary",
  action: {
    label: formatMessage("Action"),
    onPress: action("onPress"),
  },
});

export const WithProvider = ({
  message,
  kind = "informative",
}: Meta<ComponentProps<typeof Snackbar>>["args"]) => {
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    showSnackbar({
      message,
      kind,
      action: { label: formatMessage("Action"), onPress: action("onPress") },
    });
  }, [message, kind, showSnackbar]);

  return <div />;
};

WithProvider.decorators = [
  (StoryFn: StoryFn) => (
    <SnackbarProvider dismissAfterMs={1000000}>
      <StoryFn />
    </SnackbarProvider>
  ),
];
