import { createComponentStories, formatMessage } from "../../util";
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
      label: formatMessage("Tab 1"),
      value: "tab1",
      icon: IconNegative,
      hasNotification: true,
    },
    {
      label: formatMessage("Tab 2"),
      value: "tab2",
    },
    {
      label: formatMessage("Tab 3"),
      value: "tab3",
      disabled: true,
    },
    {
      label: formatMessage("Tab 4"),
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
      label: formatMessage("Tab 1"),
      value: "tab1",
      icon: IconNegative,
      hasNotification: true,
    },
    {
      label: formatMessage("Tab 2"),
      value: "tab2",
    },
    {
      label: formatMessage("Tab 3"),
      value: "tab3",
      disabled: true,
    },
    {
      label: formatMessage("Tab 4"),
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
        label: formatMessage("Tab 1"),
        value: "tab1",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: formatMessage("Tab 2"),
        value: "tab2",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: formatMessage("Tab 3"),
        value: "tab3",
        disabled: true,
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: formatMessage("Tab 4"),
        value: "tab4",
        icon: IconNegative,
        hasNotification: true,
      },
      {
        label: formatMessage("Tab 5"),
        value: "tab5",
        icon: IconInformative,
        hasNotification: true,
      },
      {
        label: formatMessage("Tab 6"),
        value: "tab6",
        icon: IconInformative,
        hasNotification: true,
      },
    ],
  },
  { viewport: { defaultViewport: "tablet" } }
);
