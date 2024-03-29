import { Navigation, IconInfoSolid, Box, NavigationProps, withBentoConfig } from "..";
import { Meta, StoryObj } from "@storybook/react";

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

const meta = {
  component: Navigation,
  args: {
    kind: "none",
    destinations,
    size: "large",
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium = {
  args: {
    size: "medium",
  },
} satisfies Story;

export const Large = {
  args: {},
} satisfies Story;

export const WithIcons = {
  args: {
    kind: "icon",
    destinations: destinations.map((d) => ({ ...d, icon: IconInfoSolid })),
  },
} satisfies Story;

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

export const WithCustomActiveVisualElement = {
  render: (args) => <CustomNavigation {...args} />,
} satisfies Story;
