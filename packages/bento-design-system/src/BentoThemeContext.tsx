import { createContext, useContext } from "react";
import { Children } from "./util/Children";
import { Box } from "./Box/Box";
import { BentoTheme } from "./util/makeBentoTheme";
import { defaultTheme } from "./defaultThemeClass.css";

const BentoThemeContext = createContext<BentoTheme | null>(defaultTheme);

export function useBentoTheme() {
  return useContext(BentoThemeContext);
}

export function BentoThemeProvider({
  value,
  children,
}: {
  value?: BentoTheme | null;
  children: Children;
}) {
  const theme = value === undefined ? defaultTheme : value;
  return (
    <BentoThemeContext.Provider value={theme}>
      {theme ? (
        <Box className={theme} style={{ display: "contents" }}>
          {children}
        </Box>
      ) : (
        children
      )}
    </BentoThemeContext.Provider>
  );
}
