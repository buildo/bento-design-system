import { ReactPortal } from "react";
import { createPortal as createReactPortal } from "react-dom";
import { Children } from "./Children";
import { useIsSSR } from "@react-aria/ssr";
import { BentoThemeProvider, useBentoTheme } from "../BentoThemeContext";

export function useCreatePortal(): (children: Children) => ReactPortal | null {
  const isSSR = useIsSSR();
  const theme = useBentoTheme();
  return (children) => {
    const content = <BentoThemeProvider value={theme}>{children}</BentoThemeProvider>;
    return isSSR ? null : createReactPortal(content, document.body);
  };
}
