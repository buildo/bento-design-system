import { Box, BentoProvider } from "../../storybook/stories";
import { defaultMessages } from "../../storybook/stories/defaultMessages";

export default function FrameComponent({ theme, children }) {
  return (
    <BentoProvider defaultMessages={defaultMessages}>
      <Box className={theme} background="backgroundPrimary">
        {children}
      </Box>
    </BentoProvider>
  );
}
