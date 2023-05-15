import * as React from "react";
import { Box, BentoProvider } from "../src";
import "../src/reset.css";
import "../src/global.css";
import "../src/defaultTheme.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import { defaultMessages } from "../src/defaultMessages/en";

export default function FrameComponent({ theme, children }) {
  return (
    <BentoProvider defaultMessages={defaultMessages}>
      <Box className={theme} background="backgroundPrimary">
        {children}
      </Box>
    </BentoProvider>
  );
}
