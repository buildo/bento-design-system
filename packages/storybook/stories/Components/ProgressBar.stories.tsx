import { ProgressBar } from "..";
import { createComponentStories } from "../util";

const { createStory, defaultExport } = createComponentStories({
  component: ProgressBar,
  args: {},
});

export default defaultExport;

export const Continue = createStory({
  discrete: false,
  value: 55,
  maxValue: 100,
});

export const Discrete = createStory({
  discrete: true,
  value: 3,
  maxValue: 5,
});
