import { SearchBar } from "../";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: SearchBar,
  args: {
    "aria-label": "Search for anything",
    placeholder: "Search for anything",
  },
  argTypes: {
    placeholder: textArgType,
  },
});

export default defaultExport;

export const searchBar = createControlledStory("design systems", {});
