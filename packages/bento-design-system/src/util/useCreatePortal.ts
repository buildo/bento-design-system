import { ReactPortal } from "react";
import { createPortal as createReactPortal } from "react-dom";
import { Children } from "./Children";
import { useIsSSR } from "@react-aria/ssr";

export function useCreatePortal(): (children: Children) => ReactPortal | null {
  const isSSR = useIsSSR();
  return (children) => (isSSR ? null : createReactPortal(children, document.body));
}
