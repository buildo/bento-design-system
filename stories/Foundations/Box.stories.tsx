import { Box } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Box,
  args: {
    children: formatMessage("Test"),
  },
});

export default defaultExport;

export const Primary = createStory({
  color: "primary",
  fontFamily: "default",
  padding: "16",
});

export const CustomTokens = createStory({
  color: "customColor1",
  fontFamily: "customFontFamily",
  padding: "12",
});
