import { SpaceBetweenActions } from "../..";
import { createComponentStories, formatMessage } from "../../util";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";

const { defaultExport, createStory } = createComponentStories({
  component: SpaceBetweenActions,
  args: {
    size: "medium",
  },
});

export default defaultExport;

export const FillError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  errorBannerWidth: "fill",
  error: formatMessage("Something went wrong"),
});

export const ContentWidthError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  error: formatMessage("Something went wrong"),
});
