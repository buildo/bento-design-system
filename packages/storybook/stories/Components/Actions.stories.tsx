import { createComponentStories, formatMessage } from "../util";
import { Actions } from "../";
import { action } from "@storybook/addon-actions";
import { componentShowcase } from "../../../bento-design-system/src/componentShowcase";

const { defaultExport, createStory } = createComponentStories({
  component: Actions,
  args: {
    size: "medium",
    error: formatMessage("Something went wrong"),
  },
});

const primaryAction = {
  label: formatMessage("Primary Action"),
  onPress: action("onPress"),
};

const secondaryAction = {
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

export const TwoActionsWithError = createStory({
  primaryAction,
  secondaryAction,
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
  primaryAction: {
    ...primaryAction,
    onPress: () =>
      new Promise((resolve) =>
        setTimeout(() => {
          primaryAction.onPress();
          resolve(null);
        }, 3000)
      ),
  },
  secondaryAction,
});

export const Showcase = () =>
  componentShowcase({
    Component: Actions,
    variants: [[{ primaryAction, secondaryAction }]],
  });
