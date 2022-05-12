import { SpaceBetweenActions } from "../..";
import { createComponentStories, formatMessage } from "../../util";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";

const { defaultExport, createStory } = createComponentStories({
  component: SpaceBetweenActions,
  args: {
    size: "medium",
    errorBannerResizing: "hug",
  },
});

export default defaultExport;

export const FillError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  errorBannerResizing: "fill",
  error: formatMessage("Something went wrong"),
});

export const HugError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  errorBannerResizing: "hug",
  error: formatMessage("Something went wrong"),
});
