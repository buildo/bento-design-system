import { AriaButtonProps } from "@react-types/button";
import { ComponentProps, Ref, RefObject } from "react";
import { Children, ListProps, MenuTriggerState, Popover } from "..";

export type MenuItemProps = ListProps["items"][number] & {
  subItems?: MenuItemProps[];
};

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
  closeOnSelect?: boolean;
  dividers?: boolean;
  maxHeight?: number;
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
  childMenuPlacement?: ComponentProps<typeof Popover>["placement"];
  childMenuOffset?: ComponentProps<typeof Popover>["offset"];
};
