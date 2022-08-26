import { useMenuTriggerState } from "@react-stately/menu";
import { createRef, RefObject, useMemo, useState } from "react";
import { MenuItemProps } from "./MenuProps";

export function useNestedMenu(items: MenuItemProps[]) {
  const childMenuTriggerRefs = useMemo<Array<RefObject<HTMLElement>>>(
    () =>
      Array(items.length)
        .fill(0)
        .map((_) => createRef()),
    [items]
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps>();
  const childMenuState = useMenuTriggerState({ defaultOpen: false });

  return { childMenuTriggerRefs, childMenuState, selectedMenuItem, setSelectedMenuItem };
}
