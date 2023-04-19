import { createContext, useContext } from "react";
import { BentoTheme, PartialBentoTheme } from "./BentoTheme";
import { defaultTheme } from "./util/defaultTheme";
import { deepmerge } from "deepmerge-ts";
import { Children } from "./util/Children";
import { Box } from "./Box/Box";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "./vars.css";

const BentoThemeContext = createContext<typeof defaultTheme>(defaultTheme);

export function useBentoTheme() {
  return useContext(BentoThemeContext);
}

export function BentoThemeProvider({
  value,
  children,
}: {
  value: PartialBentoTheme;
  children: Children;
}) {
  // NOTE(vince): in case we nest theme providers, each nested provider should only override the
  // partial theme it was given.
  // We may just set the variables we want to override, but this wouldn't work with Portals,
  // since the base theme would be inherited from the root element and not from the parent theme provider.
  const parentTheme = useBentoTheme();
  const theme = deepmerge(parentTheme, value) as BentoTheme;

  return (
    <BentoThemeContext.Provider value={theme}>
      <Box style={assignInlineVars(vars, theme)}>{children}</Box>
    </BentoThemeContext.Provider>
  );
}
