import { ComponentProps, FunctionComponent, Ref, useRef } from "react";
import { Children, Popover } from "..";
import { Box, Inset } from "../internal";
import { menuRecipe } from "./Menu.css";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState, MenuTriggerState } from "@react-stately/menu";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { ListProps } from "../List/createListComponents";
import { MenuConfig } from "./Config";

type Props = {
  size: ListProps["size"];
  items: ListProps["items"];
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
};

export function createMenu(
  config: MenuConfig,
  {
    List,
  }: {
    List: FunctionComponent<ListProps>;
  }
) {
  return function Menu({
    items: _items,
    header,
    trigger,
    initialIsOpen,
    placement,
    offset,
    size,
    dividers,
    maxHeight,
    closeOnSelect,
  }: Props) {
    const triggerRef = useRef(null);

    const state = useMenuTriggerState({
      defaultOpen: initialIsOpen,
    });

    const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
    const { buttonProps: triggerProps } = useButton(
      { ...menuTriggerProps, elementType: "div" },
      triggerRef
    );

    const items = closeOnSelect
      ? _items.map((item) => {
          if (item.onPress) {
            const onPress = item.onPress;
            return {
              ...item,
              onPress: () => {
                onPress();
                state.close();
              },
            };
          }
          return item;
        })
      : _items;

    return (
      <Box position="relative">
        {trigger(triggerRef, triggerProps, state)}
        {state.isOpen && (
          <Popover
            onClose={() => state.close()}
            triggerRef={triggerRef}
            placement={placement}
            offset={offset ?? config.defaultOffset}
          >
            <Box
              className={menuRecipe({ elevation: config.elevation })}
              {...menuProps}
              color={undefined}
              borderRadius={config.radius}
              style={{ maxHeight }}
            >
              {header && (
                <Box
                  background="backgroundSecondary"
                  paddingX={config.headerPaddingX}
                  paddingY={config.headerPaddingY}
                >
                  {header}
                </Box>
              )}
              <Inset spaceY={config.paddingY}>
                <List items={items} size={size} dividers={dividers} />
              </Inset>
            </Box>
          </Popover>
        )}
      </Box>
    );
  };
}

export type { Props as MenuProps };
export type { MenuTriggerState };
