import { DOMAttributes, useRef } from "react";
import { Popover, Box, Inset, List } from "..";
import { menuRecipe } from "./Menu.css";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState, MenuTriggerState } from "@react-stately/menu";
import { useButton } from "@react-aria/button";
import { useBentoConfig } from "../BentoConfigContext";
import { MenuProps } from "./MenuProps";
import { useNestedMenu } from "./useNestedMenu";
import { processMenuItems } from "./NestedMenu";

export function Menu({
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
  childMenuPlacement = "right top",
  childMenuOffset: _childMenuOffset,
}: MenuProps) {
  const config = useBentoConfig().menu;
  const childMenuOffset = _childMenuOffset ?? config.defaultOffset;
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  const state = useMenuTriggerState({ defaultOpen: initialIsOpen });

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
  const { buttonProps: triggerProps } = useButton(
    { ...menuTriggerProps, elementType: "div" },
    triggerRef
  );

  const { childMenuTriggerRefs, childMenuState, selectedMenuItem, setSelectedMenuItem } =
    useNestedMenu(_items);

  const items = processMenuItems(
    _items,
    state,
    selectedMenuItem,
    setSelectedMenuItem,
    closeOnSelect,
    dividers,
    maxHeight,
    size,
    childMenuPlacement,
    childMenuOffset,
    childMenuState,
    childMenuTriggerRefs,
    overlayRef,
    config
  );

  return (
    <Box position="relative">
      {trigger(triggerRef, triggerProps, state)}
      {state.isOpen && (
        <Popover
          ref={overlayRef}
          onClose={() => {
            setSelectedMenuItem(undefined);
            childMenuState.close();
            state.close();
          }}
          triggerRef={triggerRef}
          placement={placement}
          offset={offset ?? config.defaultOffset}
        >
          <Box
            className={menuRecipe({ elevation: config.elevation })}
            // NOTE(gabro): the type of `autoFocus` does not match otherwise
            {...(menuProps as DOMAttributes<HTMLDivElement>)}
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
}

export type { MenuTriggerState };
export * from "./MenuProps";
