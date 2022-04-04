import { ProgressBar } from "..";
import { createComponentStories } from "../util";

const { createStory, defaultExport } = createComponentStories({
  component: ProgressBar,
  args: {},
});

export default defaultExport;

export const Continue = createStory({
  kind: "continuous",
  value: 55,
  maxValue: 100,
});

export const Discrete = createStory({
  kind: "discrete",
  value: 3,
  maxValue: 5,
});
