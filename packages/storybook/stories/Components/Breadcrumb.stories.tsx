import { Breadcrumb, unsafeLocalizedString } from "../";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Breadcrumb,
  args: {},
});

export default defaultExport;

export const breadcrumb = createStory({
  items: [
    {
      label: unsafeLocalizedString("Root"),
      href: "https://www.example.com",
    },
    {
      label: unsafeLocalizedString("1st Level"),
      href: "https://www.example.com",
    },
    {
      label: unsafeLocalizedString("2nd Level"),
      href: "https://www.example.com",
    },
    {
      label: unsafeLocalizedString("3rd Level"),
      href: "https://www.example.com",
    },
    {
      label: unsafeLocalizedString("4th Level"),
      href: "https://www.example.com",
    },
    {
      label: unsafeLocalizedString("5th Level"),
    },
  ],
});
