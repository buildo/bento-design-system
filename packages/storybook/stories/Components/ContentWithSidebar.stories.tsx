import { Body, Box, ContentWithSidebar } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: ContentWithSidebar,
  args: {
    children: [
      <Box display="flex" height="full" justifyContent="center" alignItems="center">
        <Body key="main" size="large">
          {formatMessage("Main content")}
        </Body>
      </Box>,
      <Box display="flex" height="full" justifyContent="center" alignItems="center">
        <Body key="sidebar" size="large">
          {formatMessage("Sidebar")}
        </Body>
      </Box>,
    ],
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
  sidebar: {
    width: "1/5",
    background: "backgroundOverlay",
  },
});

export const CustomWidth = createStory({
  space: "16",
  sidebar: {
    width: { custom: 200 },
    background: "backgroundOverlay",
  },
});
