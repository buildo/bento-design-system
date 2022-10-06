import { Breadcrumb } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Breadcrumb,
  args: {},
});

export default defaultExport;

export const breadcrumb = createStory({
  items: [
    {
      label: "Root",
      href: "https://www.example.com",
    },
    {
      label: "1st Level",
      href: "https://www.example.com",
    },
    {
      label: "2nd Level",
      href: "https://www.example.com",
    },
    {
      label: "3rd Level",
      href: "https://www.example.com",
    },
    {
      label: "4th Level",
      href: "https://www.example.com",
    },
    {
      label: "5th Level",
    },
  ],
});
