import { createComponentStories } from "../util";
import { Navigation } from "../";
import { IconInfoSolid, IllustrationIdea } from "..";
import { Box, NavigationProps, withBentoConfig } from "@buildo/bento-design-system";

const destinations: NavigationProps<"none">["destinations"] = [
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
  destinations: destinations.map((d) => ({ ...d, icon: IconInfoSolid })) as any,
});
export const withIllustrations = createControlledStory("destination1", {
  kind: "illustration",
  destinations: destinations.map((d) => ({ ...d, illustration: IllustrationIdea })) as any,
});

// Note(vince): test that the nested activeVisualElement completely replace the parent one,
// and their props are not merged, i.e. the resulting activeVisualElement
const CustomNavigation = withBentoConfig(
  {
    navigation: {
      activeVisualElement: <Box background="brandPrimary" height={8} borderRadius={4} />,
      uppercaseLabel: true,
    },
  },
  withBentoConfig(
    {
      navigation: {
        activeVisualElement: <Box background="brandSecondary" height={8} />,
      },
    },
    Navigation
  )
);
export const withCustomActiveVisualElement = () => {
  return <CustomNavigation kind="none" destinations={destinations} size="large" />;
};
