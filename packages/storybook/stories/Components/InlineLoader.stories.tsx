import { InlineLoader } from "../";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: InlineLoader,
  args: {
    message: formatMessage("This may take several minutes..."),
  },
});

export default defaultExport;

export const Standalone = createStory({});
