import { ReactPortal } from "react";
import { createPortal as createReactPortal } from "react-dom";
import { Children } from "./Children";
import { useIsSSR } from "@react-aria/ssr";
import { BentoThemePortalProvider } from "../BentoThemeContext";

export function useCreatePortal(
  portalContainer?: HTMLElement
): (children: Children) => ReactPortal | null {
  const isSSR = useIsSSR();

  return (children) => {
    const content = <BentoThemePortalProvider>{children}</BentoThemePortalProvider>;
    return isSSR ? null : createReactPortal(content, portalContainer ?? document.body);
  };
}
