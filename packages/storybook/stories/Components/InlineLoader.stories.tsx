import { InlineLoader } from "../";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: InlineLoader,
  args: {
    message: "This may take several minutes...",
  },
});

export default defaultExport;

export const Standalone = createStory({});
