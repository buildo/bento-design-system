import { createComponentStories } from "../../util";
import { IconInfoSolid, IconNegative, FolderTabs, Chip } from "../..";

const { defaultExport, createControlledStory } = createComponentStories({
  component: FolderTabs,
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
      icon: IconInfoSolid,
      hasNotification: true,
      rightAccessory: <Chip color="blue" label="A" />,
    },
    {
      label: "Tab 5",
      value: "tab5",
      icon: IconInfoSolid,
      rightAccessory: <Chip color="blue" label="A" />,
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
      icon: IconInfoSolid,
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
        icon: IconInfoSolid,
        hasNotification: true,
      },
      {
        label: "Tab 6",
        value: "tab6",
        icon: IconInfoSolid,
        hasNotification: true,
      },
    ],
  },
  { viewport: { defaultViewport: "tablet" } }
);
