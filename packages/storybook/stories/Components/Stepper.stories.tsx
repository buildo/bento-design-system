import { Stepper } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Stepper,
  args: {},
});

export default defaultExport;

export const stepper = createStory({
  currentStep: 2,
  steps: [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Step 4" },
    { label: "Step 5" },
  ],
});
