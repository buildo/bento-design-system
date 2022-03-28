import { ReactPortal } from "react";
import { createPortal as createReactPortal } from "react-dom";
import { Children } from "./Children";

export function createPortal(children: Children): ReactPortal {
  return createReactPortal(children, document.body);
}
