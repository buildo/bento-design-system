import { createComponentStories } from "../../util";
import { IconInformative, IconNegative, UnderlineTabs } from "../..";

const { defaultExport, createControlledStory } = createComponentStories({
  component: UnderlineTabs,
  args: {
    size: "medium",
  },
});

export default defaultExport;

export const medium = createControlledStory("tab1", {
  tabs: [
    {
      label: "Tab 1",
      value: "tab1",
      icon: IconNegative,
      hasNotification: true,
    },
    {
      label: "Tab 2",
      value: "tab2",
    },
    {
      label: "Tab 3",
      value: "tab3",
      disabled: true,
    },
    {
      label: "Tab 4",
      value: "tab4",
      icon: IconInformative,
      hasNotification: true,
    },
  ],
});

export const large = createControlledStory("tab1", {
  size: "large",
  tabs: [
    {
      label: "Tab 1",
      value: "tab1",
      icon: IconNegative,
      hasNotification: true,
    },
    {
      label: "Tab 2",
      value: "tab2",
    },
    {
      label: "Tab 3",
      value: "tab3",
      disabled: true,
    },
    {
      label: "Tab 4",
      value: "tab4",
      icon: IconInformative,
      hasNotification: true,
    },
  ],
});

export const scrollable = createControlledStory(
  "tab1",
  {
    size: "large",
    tabs: [
      {
        label: "Tab 1",
        value: "tab1",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: "Tab 2",
        value: "tab2",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: "Tab 3",
        value: "tab3",
        disabled: true,
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: "Tab 4",
        value: "tab4",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: "Tab 5",
        value: "tab5",
        icon: IconInformative,
        hasNotification: true,
      },
      {
        label: "Tab 6",
        value: "tab6",
        icon: IconInformative,
        hasNotification: true,
      },
    ],
  },
  { viewport: { defaultViewport: "tablet" } }
);
