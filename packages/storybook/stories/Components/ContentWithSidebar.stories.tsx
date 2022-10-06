import { Body, Box, ContentWithSidebar } from "..";
import { createComponentStories } from "../util";

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

const { defaultExport, createStory } = createComponentStories({
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
});

export default defaultExport;

export const StandardWidth = createStory({
  sidebarPosition: "right",
  sidebarWidth: "1/5",
  sidebarBackground: "backgroundOverlay",
});

export const CustomWidth = createStory({
  sidebarPosition: "right",
  sidebarWidth: { custom: 200 },
  sidebarBackground: "backgroundOverlay",
});

export const LeftSidebar = createStory({
  sidebarPosition: "left",
  sidebarWidth: "1/5",
  sidebarBackground: "backgroundOverlay",
  children: [sidebar, content],
});
