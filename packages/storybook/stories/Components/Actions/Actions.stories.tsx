import { createComponentStories, formatMessage } from "../../util";
import { Actions } from "../..";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Actions,
  args: {
    size: "medium",
  },
});

export const primaryAction = {
  label: formatMessage("Primary Action"),
  onPress: action("onPress"),
};

export const asyncPrimaryAction = {
  label: formatMessage("Primary Action"),
  onPress: () =>
    new Promise((resolve) =>
      setTimeout(() => {
        primaryAction.onPress();
        resolve(null);
      }, 3000)
    ),
};

export const secondaryAction = {
  label: formatMessage("Secondary Action"),
  onPress: action("onPress"),
};

export default defaultExport;

export const OnePrimaryAction = createStory({
  primaryAction,
});

export const OnePrimaryActionDestructive = createStory({
  primaryAction: {
    ...primaryAction,
    isDestructive: true,
  },
});

export const OneSecondaryAction = createStory({
  secondaryAction,
});

export const TwoActions = createStory({
  primaryAction,
  secondaryAction,
});

export const TwoActionsWithErrorHug = createStory({
  primaryAction,
  secondaryAction,
  error: formatMessage("Something went wrong"),
});

export const TwoActionsWithErrorFit = createStory({
  primaryAction,
  secondaryAction,
  errorBannerWidth: "fill",
  error: formatMessage("Something went wrong"),
});

export const TwoActionsDestructive = createStory({
  primaryAction: {
    ...primaryAction,
    isDestructive: true,
  },
  secondaryAction,
});

export const TwoActionsSmall = createStory({
  primaryAction,
  secondaryAction,
  size: "small",
});

export const TwoActionsLarge = createStory({
  primaryAction,
  secondaryAction,
  size: "large",
});

export const AsyncPrimaryAction = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
});
