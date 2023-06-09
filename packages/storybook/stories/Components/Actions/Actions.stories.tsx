import { Actions } from "../..";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Actions,
  args: {
    size: "medium",
  },
  excludeStories: ["primaryAction", "secondaryAction", "asyncPrimaryAction"],
} satisfies Meta<typeof Actions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const primaryAction = {
  label: "Primary Action",
  onPress: action("onPress"),
};

export const asyncPrimaryAction = {
  label: "Primary Action",
  onPress: () =>
    new Promise((resolve) =>
      setTimeout(() => {
        primaryAction.onPress();
        resolve(null);
      }, 3000)
    ),
};

export const secondaryAction = {
  label: "Secondary Action",
  onPress: action("onPress"),
};

export const OnePrimaryAction: Story = {
  args: {
    primaryAction,
  },
};

export const OnePrimaryActionDestructive: Story = {
  args: {
    primaryAction: {
      ...primaryAction,
      isDestructive: true,
    },
  },
};

export const OneSecondaryAction: Story = {
  args: {
    secondaryAction,
  },
};

export const TwoActions: Story = {
  args: {
    primaryAction,
    secondaryAction,
  },
};

export const TwoActionsWithErrorHug: Story = {
  args: {
    primaryAction,
    secondaryAction,
    error: "Something went wrong",
  },
};

export const TwoActionsWithErrorFit: Story = {
  args: {
    primaryAction,
    secondaryAction,
    errorBannerWidth: "fill",
    error: "Something went wrong",
  },
};

export const TwoActionsDestructive: Story = {
  args: {
    primaryAction: {
      ...primaryAction,
      isDestructive: true,
    },
    secondaryAction,
  },
};

export const TwoActionsSmall: Story = {
  args: {
    primaryAction,
    secondaryAction,
    size: "small",
  },
};

export const TwoActionsLarge: Story = {
  args: {
    primaryAction,
    secondaryAction,
    size: "large",
  },
};

export const AsyncPrimaryAction: Story = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
  },
};
