import { BentoProvider, Toast, useToast } from "..";
import { action } from "@storybook/addon-actions";
import { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";

const meta = {
  component: Toast,
  args: {
    message: "This is a message for you",
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Message = {
  args: {
    kind: "informative",
  },
} satisfies Story;

export const NonDismissable = {
  args: {
    kind: "informative",
  },
  parameters: { actions: { argTypesRegex: "" } },
} satisfies Story;

export const MessageAndAction = {
  args: {
    kind: "informative",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
} satisfies Story;

export const NonDismissableAndAction = {
  args: {
    kind: "informative",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
  parameters: { actions: { argTypesRegex: "" } },
} satisfies Story;

export const Positive = {
  args: {
    kind: "positive",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
} satisfies Story;

export const Negative = {
  args: {
    kind: "negative",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
} satisfies Story;

export const Warning = {
  args: {
    kind: "warning",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
} satisfies Story;

export const Secondary = {
  args: {
    kind: "secondary",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
  },
} satisfies Story;

export const WithProvider = {
  args: {
    kind: "informative",
  },
  render: ({ message, kind }) => {
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
  },
  decorators: [
    (Story) => (
      <BentoProvider toastDismissAfterMs={1000000} defaultMessages={defaultMessages}>
        <Story />
      </BentoProvider>
    ),
  ],
} satisfies Story;
