import { ReactPortal } from "react";
import { createPortal as createReactPortal } from "react-dom";
import { Children } from "./Children";
import { useIsSSR } from "@react-aria/ssr";
import { BentoThemeProvider } from "../BentoThemeContext";

export function useCreatePortal(): (children: Children) => ReactPortal | null {
  const isSSR = useIsSSR();
  return (children) => {
    const content = <BentoThemeProvider>{children}</BentoThemeProvider>;
    return isSSR ? null : createReactPortal(content, document.body);
  };
}
