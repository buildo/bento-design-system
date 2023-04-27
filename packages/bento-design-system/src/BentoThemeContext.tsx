import { createContext, useContext, useMemo } from "react";
import { Children } from "./util/Children";
import { Box, BoxProps } from "./Box/Box";
import { makeBentoTheme } from "./util/makeBentoTheme";
import { defaultTheme } from "./defaultThemeClass.css";
import clsx from "clsx";
import { bentoThemeProvider } from "./BentoThemeProvider.css";
import { BentoTokens } from "./util/bentoTokens";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "./vars.css";
import { PartialDeep } from "./util/PartialDeep";
import { deepmerge } from "deepmerge-ts";

export type BentoTheme = {
  theme: ReturnType<typeof makeBentoTheme>;
  tokenOverrides?: PartialDeep<BentoTokens>;
};

export type BentoThemeOverride =
  | BentoTheme
  | {
      theme?: never;
      tokenOverrides: PartialDeep<BentoTokens>;
    };

const BentoThemeContext = createContext<BentoTheme>({
  theme: defaultTheme,
});

export function useBentoTheme() {
  return useContext(BentoThemeContext);
}

export function BentoThemeProvider({
  theme: _theme,
  children,
  as,
  className,
}: {
  theme?: BentoThemeOverride;
  children: Children;
  as?: BoxProps["as"];
  className?: string;
}) {
  const parentTheme = useBentoTheme();
  const theme = useMemo(
    () =>
      _theme
        ? {
            theme: _theme.theme ?? parentTheme.theme,
            tokenOverrides: deepmerge(parentTheme.tokenOverrides, _theme.tokenOverrides),
          }
        : parentTheme,
    [_theme, parentTheme]
  );
  const styles =
    theme?.tokenOverrides && Object.keys(theme?.tokenOverrides).length > 0
      ? assignInlineVars<PartialDeep<typeof vars>>(vars, theme.tokenOverrides as any)
      : undefined;
  return (
    <BentoThemeContext.Provider value={theme}>
      <Box as={as} className={clsx(bentoThemeProvider, className, theme.theme)} style={styles}>
        {children}
      </Box>
    </BentoThemeContext.Provider>
  );
}
