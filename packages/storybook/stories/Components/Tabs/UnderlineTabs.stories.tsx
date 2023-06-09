import { IconInfoSolid, IconNegative, UnderlineTabs } from "../..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: UnderlineTabs,
  args: {
    size: "medium",
  },
} satisfies Meta<typeof UnderlineTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium = {
  args: {
    value: "tab1",
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
  },
} satisfies Story;

export const Large = {
  args: {
    value: "tab1",
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
  },
} satisfies Story;

export const Scrollable = {
  args: {
    value: "tab1",
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
  parameters: { viewport: { defaultViewport: "tablet" } },
} satisfies Story;
