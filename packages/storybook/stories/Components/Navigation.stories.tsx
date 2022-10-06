import { createComponentStories } from "../util";
import { Navigation } from "../";
import { ComponentProps } from "react";
import { IconInformative, IllustrationIdea } from "..";

const destinations: ComponentProps<typeof Navigation>["destinations"] = [
  {
    label: "Destination 1",
    href: "https://google.com",
    target: "_blank",
    active: true,
  },
  {
    label: "Destination 2",
    href: "https://amazon.com",
    target: "_blank",
  },
  {
    label: "Destination 3",
    href: "https://apple.com",
    disabled: true,
  },
  {
    label: "Destination 4",
    href: "https://microsoft.com",
  },
];

const { defaultExport, createControlledStory } = createComponentStories({
  component: Navigation,
  args: {
    kind: "none",
    destinations,
    size: "large",
  },
});

export default defaultExport;

export const medium = createControlledStory("destination1", { size: "medium" });
export const large = createControlledStory("destination1", {});
export const withIcons = createControlledStory("destination1", {
  kind: "icon",
  destinations: destinations.map((d) => ({ ...d, icon: IconInformative })) as any,
});
export const withIllustrations = createControlledStory("destination1", {
  kind: "illustration",
  destinations: destinations.map((d) => ({ ...d, illustration: IllustrationIdea })) as any,
});
