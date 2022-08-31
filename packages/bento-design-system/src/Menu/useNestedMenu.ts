import { useMenuTriggerState } from "@react-stately/menu";
import { createRef, RefObject, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (!!selectedMenuItem && !childMenuState.isOpen) childMenuState.open();
    if (!selectedMenuItem && childMenuState.isOpen) childMenuState.close();
  }, [selectedMenuItem, childMenuState]);

  const open = (menuItem: MenuItemProps) => setSelectedMenuItem(menuItem);
  const close = () => setSelectedMenuItem(undefined);
  const isOpen = (menuItem: MenuItemProps) => selectedMenuItem === menuItem;

  return { childMenuTriggerRefs, childMenuState, open, close, isOpen };
}
