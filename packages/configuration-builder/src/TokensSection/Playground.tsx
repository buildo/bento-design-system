import { BentoThemeProvider, Box, Children } from "@buildo/bento-design-system";
import { useConfiguredTheme } from "../utils/preview";

export function Playground({ children }: { children: Children }) {
  const theme = useConfiguredTheme();

  return (
    <Box
      borderRadius={24}
      padding={40}
      background="backgroundSecondary"
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <BentoThemeProvider theme={theme}>{children}</BentoThemeProvider>
    </Box>
  );
}
