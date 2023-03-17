import { BentoProvider, Toast, useToast } from "..";
import { createComponentStories, textArgType } from "../util";
import { action } from "@storybook/addon-actions";
import { ComponentProps, useEffect } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";

const { defaultExport, createStory } = createComponentStories({
  component: Toast,
  args: {
    message: "This is a message for you",
  },
  argTypes: {
    message: textArgType,
  },
});

export default defaultExport;

export const Message = createStory({
  kind: "informative",
});

export const NonDismissable = createStory(
  {
    kind: "informative",
  },
  { actions: { argTypesRegex: "" } }
);

export const MessageAndAction = createStory({
  kind: "informative",
  action: {
    label: "Action",
    onPress: action("onPress"),
  },
});

export const NonDismissableAndAction = createStory(
  {
    kind: "informative",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
  { actions: { argTypesRegex: "" } }
);

export const Positive = createStory({
  kind: "positive",
  action: {
    label: "Action",
    onPress: action("onPress"),
  },
});

export const Negative = createStory({
  kind: "negative",
  action: {
    label: "Action",
    onPress: action("onPress"),
  },
});

export const Warning = createStory({
  kind: "warning",
  action: {
    label: "Action",
    onPress: action("onPress"),
  },
});

export const Secondary = createStory({
  kind: "secondary",
  action: {
    label: "Action",
    onPress: action("onPress"),
  },
});

export const WithProvider = ({
  message,
  kind = "informative",
}: Meta<ComponentProps<typeof Toast>>["args"]) => {
  const { showToast } = useToast();
  useEffect(() => {
    showToast({
      message,
      kind,
      action: { label: "Action", onPress: action("onPress") },
      dismissable: true,
    });
  }, [message, kind, showToast]);

  return <div />;
};

WithProvider.decorators = [
  (StoryFn: StoryFn) => (
    <BentoProvider toastDismissAfterMs={1000000} defaultMessages={defaultMessages}>
      <StoryFn />
    </BentoProvider>
  ),
];
