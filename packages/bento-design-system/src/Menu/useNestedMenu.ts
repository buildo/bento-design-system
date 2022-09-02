import { useMenuTriggerState } from "@react-stately/menu";
import { createRef, RefObject, useEffect, useMemo, useState } from "react";
import { MenuItemProps } from "./MenuProps";

export function useNestedMenu(items: MenuItemProps[]) {
  const nestedMenuTriggerRefs = useMemo<Array<RefObject<HTMLElement>>>(
    () =>
      Array(items.length)
        .fill(0)
        .map((_) => createRef()),
    [items]
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps>();
  const nestedMenuState = useMenuTriggerState({ defaultOpen: false });

  useEffect(() => {
    if (!!selectedMenuItem && !nestedMenuState.isOpen) nestedMenuState.open();
    if (!selectedMenuItem && nestedMenuState.isOpen) nestedMenuState.close();
  }, [selectedMenuItem, nestedMenuState]);

  const open = (menuItem: MenuItemProps) => setSelectedMenuItem(menuItem);
  const close = () => setSelectedMenuItem(undefined);
  const isOpen = (menuItem: MenuItemProps) => selectedMenuItem === menuItem;

  return { nestedMenuTriggerRefs, nestedMenuState, open, close, isOpen };
}
