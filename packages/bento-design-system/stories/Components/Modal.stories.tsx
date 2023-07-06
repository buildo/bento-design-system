import { Modal, Body, Placeholder, Stack, CustomModal, Feedback, Inset } from "..";
import { action } from "@storybook/addon-actions";
import { screen } from "@storybook/testing-library";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Modal,
  args: {
    title: "Create item title veeeery very long very long title here do you see how long it is?",
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 400,
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithActions = {
  args: {
    children: [<Placeholder />],
    primaryAction: {
      label: "Create",
      onPress: action("Create"),
    },
    secondaryAction: {
      label: "Cancel",
      onPress: action("Cancel"),
    },
  },
} satisfies Story;

export const Scrollable = {
  args: {
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
  },
} satisfies Story;

export const WithError = {
  args: {
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
  },
} satisfies Story;

export const Destructive = {
  args: {
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
  },
} satisfies Story;

export const Warning = {
  args: {
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
  },
} satisfies Story;

export const WithAsyncPrimaryAction = {
  args: {
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
  },
  play: async () => {
    const button = screen.getByRole("button", { name: /create new item/i });
    await button.click();
  },
} satisfies Story;

export const Small = {
  args: {
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
  },
} satisfies Story;

export const Large = {
  args: {
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
  },
} satisfies Story;

export const Wide = {
  args: {
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
  },
} satisfies Story;

export const Custom = {
  args: {
    isDestructive: true,
    size: "medium",
  },
  render: (args) => (
    <CustomModal {...args} aria-label="Custom modal">
      <Inset space={24}>
        <Stack space={0} align="center">
          <Feedback
            size="medium"
            status="negative"
            title="Something went wrong"
            description="Wait a few minutes and retry"
            action={{ label: "Retry", onPress: action("onPress") }}
          />
        </Stack>
      </Inset>
    </CustomModal>
  ),
} satisfies Story;
