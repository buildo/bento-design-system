import { ReactChild } from "react";

export function childKey(child: ReactChild, index: number): string | number | undefined | null {
  if (typeof child === "number" || typeof child === "string") {
    return index;
  } else {
    return child.key;
  }
}
