import { createContext, useContext } from "react";
import { Children } from "./util/Children";
import { Box, BoxProps } from "./Box/Box";
import { defaultTheme } from "./defaultThemeClass.css";
import { bentoThemeProvider } from "./BentoThemeProvider.css";
import { BentoTokens } from "./util/bentoTokens";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "./vars.css";
import { PartialDeep } from "./util/PartialDeep";
import { deepmerge } from "deepmerge-ts";

export type BentoTheme = string | PartialDeep<BentoTokens>;

/**
 * The theme context is mainly used to keep track of the theme overrides eventually applied by various nested theme providers.
 * Token overrides are always applied on top of a main theme, represented by the `className` property.
 * This context is useful to reapply the whole theme in Portals, or to know
 * in any component what theme is currently applied using the useBentoTheme hook.
 */
export type BentoThemeContext = {
  className: string;
  tokenOverrides: PartialDeep<BentoTokens>;
};

const BentoThemeContext = createContext<BentoThemeContext>({
  className: defaultTheme,
  tokenOverrides: {},
});

export function useBentoTheme() {
  return useContext(BentoThemeContext);
}

export function BentoThemeProvider({
  theme,
  children,
  as,
  className,
}: {
  theme: BentoTheme;
  children: Children;
  as?: BoxProps["as"];
  className?: string;
}) {
  const parentContext = useBentoTheme();
  const {
    context,
    style,
    themeClassName,
  }: {
    context: BentoThemeContext;
    style: React.CSSProperties | undefined;
    themeClassName: string | undefined;
  } =
    typeof theme === "string"
      ? {
          // whenever a new theme is applied via a className, all the token overrides referring to the old theme are cleared out.
          context: { className: theme, tokenOverrides: {} },
          style: undefined,
          themeClassName: theme,
        }
      : {
          context: {
            className: parentContext.className,
            tokenOverrides: deepmerge(
              parentContext.tokenOverrides,
              theme
            ) as PartialDeep<BentoTokens>,
          },
          style: assignInlineVars(vars, theme as any),
          themeClassName: undefined,
        };

  return (
    <BentoThemeContext.Provider value={context}>
      <Box as={as} className={[bentoThemeProvider, className, themeClassName]} style={style}>
        {children}
      </Box>
    </BentoThemeContext.Provider>
  );
}

/**
 * This is mainly used to reapply the current theme in Portals.
 * This is done using two BentoThemeProviders, the first one to apply the theme className,
 * the second one to apply the token overrides on top of it.
 */
export function BentoThemePortalProvider({ children }: { children: Children }) {
  const theme = useBentoTheme();
  return (
    <BentoThemeProvider theme={theme.className}>
      <BentoThemeProvider theme={theme.tokenOverrides}>{children}</BentoThemeProvider>
    </BentoThemeProvider>
  );
}
