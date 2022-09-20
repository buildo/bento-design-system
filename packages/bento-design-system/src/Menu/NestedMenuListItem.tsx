import { useMenuTriggerState } from "@react-stately/menu";
import { ComponentProps, RefObject, useRef } from "react";
import { ListItem, ListSize, Popover, NestedMenuItemProps } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { NestedMenu } from "./NestedMenu";

type Props = {
  item: NestedMenuItemProps;
  dividers: boolean;
  placement: ComponentProps<typeof Popover>["placement"];
  offset: ComponentProps<typeof Popover>["offset"];
  maxHeight: number | undefined;
  closeOnSelect: boolean;
  size: ListSize;
  portalRef: RefObject<HTMLElement>;
  closeMenu: () => void;
  isOpen: boolean;
  onSelect: () => void;
};

export function NestedMenuListItem({ item, onSelect, isOpen, ...menuProps }: Props) {
  const config = useBentoConfig().menu;
  const itemRef = useRef<HTMLElement>(null);
  const state = useMenuTriggerState({ isOpen });

  return (
    <>
      <ListItem
        ref={itemRef}
        {...item}
        size={menuProps.size}
        trailingIcon={config.nestedMenuIcon}
        onPress={onSelect}
      />
      {isOpen && (
        <NestedMenu {...menuProps} items={item.items} state={state} triggerRef={itemRef} />
      )}
    </>
  );
}
