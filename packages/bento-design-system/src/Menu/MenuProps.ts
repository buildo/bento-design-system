import { AriaButtonProps } from "@react-types/button";
import { ComponentProps, Ref, RefObject } from "react";
import {
  Children,
  CommonItemProps,
  ListItemKind,
  ListItemProps,
  ListLeftItem,
  ListProps,
  MenuTriggerState,
  Popover,
} from "..";

export type NestedMenuItemProps = ListItemKind &
  ListLeftItem &
  CommonItemProps & {
    items: MenuItemProps[];
    trailingIcon?: never;
    onPress?: never;
    href?: never;
    target?: never;
  };

export type MenuItemProps = NestedMenuItemProps | (ListItemProps & { items?: never });

export type NestedMenuProps = {
  label: Children;
  items: MenuItemProps[];
  isSelected: boolean;
  placement: ComponentProps<typeof Popover>["placement"];
  offset: ComponentProps<typeof Popover>["offset"];
  size: ListProps["size"];
  state: MenuTriggerState;
  triggerRef: RefObject<HTMLElement>;
  overlayRef: RefObject<HTMLElement>;
  closeOnSelect: boolean | undefined;
  dividers: boolean | undefined;
  maxHeight: number | undefined;
};

export type MenuProps = {
  size: ListProps["size"];
  items: MenuItemProps[];
  /**
   * Optional static content that is displayed before the menu items.
   */
  header?: Children;
  /**
   * The trigger element that will be used to open the menu.
   * It must accept a `ref` prop and other accessibility props to ensure the menu is properly
   * connected to its trigger, for accessibility purposes.
   *
   * It can use the `state` parameter to determine and change the menu state.
   */
  trigger: (
    ref: Ref<HTMLElement>,
    props: Pick<AriaButtonProps, "id" | "aria-labelledby">,
    state: MenuTriggerState
  ) => JSX.Element;
  initialIsOpen?: boolean;
  placement?: ComponentProps<typeof Popover>["placement"];
  offset?: ComponentProps<typeof Popover>["offset"];
  dividers?: boolean;
  maxHeight?: number;
  closeOnSelect?: boolean;
  nestedMenuPlacement?: ComponentProps<typeof Popover>["placement"];
  nestedMenuOffset?: ComponentProps<typeof Popover>["offset"];
};
