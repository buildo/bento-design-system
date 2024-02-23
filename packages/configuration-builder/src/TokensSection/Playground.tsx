import { BentoThemeProvider, Box, BoxProps, Children } from "@buildo/bento-design-system";
import { useConfiguredTheme } from "../utils/preview";

export function Playground({
  borderRadius,
  children,
}: {
  borderRadius?: BoxProps["borderRadius"];
  children: Children;
}) {
  const theme = useConfiguredTheme();

  return (
    <div ref={(node) => node && node.setAttribute("inert", "true")} style={{ height: "100%" }}>
      <Box
        borderRadius={borderRadius ?? 0}
        padding={40}
        background="backgroundSecondary"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        overflow="hidden"
        height="full"
      >
        <BentoThemeProvider theme={theme}>{children}</BentoThemeProvider>
      </Box>
    </div>
  );
}
