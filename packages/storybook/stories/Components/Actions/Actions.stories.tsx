import { createComponentStories } from "../../util";
import { Actions } from "../..";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Actions,
  args: {
    size: "medium",
  },
  excludeStories: ["primaryAction", "secondaryAction", "asyncPrimaryAction"],
});

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
  error: "Something went wrong",
});

export const TwoActionsWithErrorFit = createStory({
  primaryAction,
  secondaryAction,
  errorBannerWidth: "fill",
  error: "Something went wrong",
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
