import { ComponentProps, RefObject, useState } from "react";
import { InternalList } from "../List/InternalList";
import { ListProps } from "../List/List";
import { ListItem, ListItemProps } from "../List/ListItem";
import { Popover } from "../Popover/Popover";
import { MenuItemProps } from "./MenuProps";
import { NestedMenuListItem } from "./NestedMenuListItem";

type Props = {
  items: MenuItemProps[];
  closeOnSelect: boolean;
  dividers: boolean;
  size: ListProps["size"];
  closeMenu: () => void;
  nestedMenuPlacement: ComponentProps<typeof Popover>["placement"];
  nestedMenuOffset: ComponentProps<typeof Popover>["offset"];
  maxHeight: number | undefined;
  portalRef: RefObject<HTMLElement>;
};

export function MenuList({
  dividers,
  items,
  closeOnSelect,
  size,
  closeMenu,
  nestedMenuPlacement,
  nestedMenuOffset,
  maxHeight,
  portalRef,
}: Props) {
  const [nestedMenuOpen, setNestedMenuOpen] = useState<number | null>(null);

  const toggleNestedMenu = (i: number) =>
    nestedMenuOpen === null || nestedMenuOpen !== i
      ? setNestedMenuOpen(i)
      : setNestedMenuOpen(null);

  function processItemProps(item: ListItemProps): ListItemProps {
    if (closeOnSelect && item.onPress) {
      const onPress = item.onPress;
      return {
        ...item,
        onPress: () => {
          onPress();
          closeMenu();
        },
      };
    }
    return item;
  }

  return (
    <InternalList dividers={dividers}>
      {items.map((item, i) => {
        if ("items" in item && item["items"]) {
          return (
            <NestedMenuListItem
              item={item}
              size={size}
              closeOnSelect={closeOnSelect}
              closeMenu={closeMenu}
              dividers={dividers}
              placement={nestedMenuPlacement}
              offset={nestedMenuOffset}
              maxHeight={maxHeight}
              portalRef={portalRef}
              isOpen={nestedMenuOpen === i}
              onSelect={() => toggleNestedMenu(i)}
            />
          );
        } else {
          return <ListItem key={item.key ?? i} {...processItemProps(item)} size={size} />;
        }
      })}
    </InternalList>
  );
}
