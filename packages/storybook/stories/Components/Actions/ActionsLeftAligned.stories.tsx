import { LeftActions } from "../..";
import { createComponentStories } from "../../util";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";

const { defaultExport, createStory } = createComponentStories({
  component: LeftActions,
  args: {
    size: "medium",
  },
});

export default defaultExport;

export const FillError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  errorBannerWidth: "fill",
  error: "Something went wrong",
});

export const ContentWidthError = createStory({
  primaryAction: asyncPrimaryAction,
  secondaryAction,
  error: "Something went wrong",
});
