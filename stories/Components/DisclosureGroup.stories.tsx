import { DisclosureGroup, Placeholder } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: DisclosureGroup,
  args: {},
  argTypes: {},
});

export default defaultExport;

export const linear = createStory({
  items: [
    {
      title: formatMessage("Title"),
      children: <Placeholder />,
    },
    {
      title: formatMessage("Title"),
      children: <Placeholder />,
      initialIsOpen: true,
    },
    {
      title: formatMessage("Title"),
      children: <Placeholder />,
    },
  ],
});

export const nested = createStory({
  items: [
    {
      title: formatMessage("Title"),
      initialIsOpen: true,
      items: [
        {
          title: formatMessage("Title"),
          children: <Placeholder />,
          initialIsOpen: true,
        },
        {
          title: formatMessage("Title"),
          children: <Placeholder />,
        },
      ],
    },
    {
      title: formatMessage("Title"),
      children: <Placeholder />,
    },
    {
      title: formatMessage("Title"),
      children: <Placeholder />,
    },
  ],
});
