import { DisclosureGroup, Placeholder } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: DisclosureGroup,
  args: {},
  argTypes: {},
});

export default defaultExport;

export const Linear = createStory({
  items: [
    {
      title: "Title",
      children: <Placeholder />,
    },
    {
      title: "Title",
      children: <Placeholder />,
      initialIsOpen: true,
    },
    {
      title: "Title",
      children: <Placeholder />,
    },
  ],
});

const nestedItems = [
  {
    title: "Title",
    initialIsOpen: true,
    items: [
      {
        title: "Title",
        children: <Placeholder />,
        initialIsOpen: true,
      },
      {
        title: "Title",
        children: <Placeholder />,
      },
    ],
  },
  {
    title: "Title",
    children: <Placeholder />,
  },
  {
    title: "Title",
    children: <Placeholder />,
  },
];

export const Nested = createStory({
  items: nestedItems,
});

export const LeadingIcon = createStory({
  items: nestedItems,
  iconPosition: "leading",
});
