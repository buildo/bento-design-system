import * as React from "react";
import { Box, BentoProvider } from "../src";
import "../src/reset.css";
import "../src/global.css";
import "../src/defaultTheme.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
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
