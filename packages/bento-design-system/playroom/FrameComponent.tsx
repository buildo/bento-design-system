import { Box, DesignSystemProvider } from "../../storybook/stories";
import { defaultMessages } from "../../storybook/stories/defaultMessages";

export default function FrameComponent({ theme, children }) {
  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Box className={theme} background="backgroundPrimary">
        {children}
      </Box>
    </DesignSystemProvider>
  );
}
