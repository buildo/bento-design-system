import { Stepper } from "../";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Stepper,
  args: {},
  parameters: {
    backgrounds: { default: "neutral10" },
  },
});

export default defaultExport;

export const stepper = createStory({
  currentStep: 2,
  steps: [
    { label: formatMessage("Step 1") },
    { label: formatMessage("Step 2") },
    { label: formatMessage("Step 3") },
    { label: formatMessage("Step 4") },
    { label: formatMessage("Step 5") },
  ],
});
