import { SearchBar } from "../";
import { createComponentStories, formatMessage, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: SearchBar,
  args: {
    "aria-label": formatMessage("Search for anything"),
    placeholder: formatMessage("Search for anything"),
  },
  argTypes: {
    placeholder: textArgType,
  },
});

export default defaultExport;

export const searchBar = createControlledStory("design systems", {});
