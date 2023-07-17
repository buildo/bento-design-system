import { Body, Box, ContentWithSidebar } from "..";
import { Meta, StoryObj } from "@storybook/react";

const content = (
  <Box display="flex" height="full" justifyContent="center" alignItems="center">
    <Body key="main" size="large">
      Main content
    </Body>
  </Box>
);

const sidebar = (
  <Box display="flex" height="full" justifyContent="center" alignItems="center">
    <Body key="sidebar" size="large">
      Sidebar
    </Body>
  </Box>
);

const meta = {
  component: ContentWithSidebar,
  args: {
    children: [content, sidebar],
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box style={{ height: "100vh" }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ContentWithSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardWidth = {
  args: {
    sidebarPosition: "right",
    sidebarWidth: "1/5",
    sidebarBackground: "backgroundOverlay",
  },
} satisfies Story;

export const CustomWidth = {
  args: {
    sidebarPosition: "right",
    sidebarWidth: { custom: 200 },
    sidebarBackground: "backgroundOverlay",
  },
} satisfies Story;

export const LeftSidebar = {
  args: {
    sidebarPosition: "left",
    sidebarWidth: "1/5",
    sidebarBackground: "backgroundOverlay",
    children: [sidebar, content],
  },
} satisfies Story;
