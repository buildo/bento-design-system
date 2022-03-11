import { createComponentStories, formatMessage } from "../util";
import { Navigation } from "../";
import { ComponentProps } from "react";
import { IconInformative, IllustrationIdea } from "../../src";

const destinations: ComponentProps<typeof Navigation>["destinations"] = [
  {
    label: formatMessage("Destination 1"),
    value: "destination1",
  },
  {
    label: formatMessage("Destination 2"),
    value: "destination2",
  },
  {
    label: formatMessage("Destination 3"),
    value: "destination3",
    disabled: true,
  },
  {
    label: formatMessage("Destination 4"),
    value: "destination4",
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
