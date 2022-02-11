import { createComponentStories, formatMessage } from "../util";
import { Actions } from "../";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Actions,
  args: {},
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

export const TwoActionsDestructive = createStory({
  primaryAction: {
    ...primaryAction,
    isDestructive: true,
  },
  secondaryAction,
});
