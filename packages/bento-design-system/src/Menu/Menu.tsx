import { DOMAttributes, useRef } from "react";
import { Popover, Box, Inset } from "..";
import { menuRecipe } from "./Menu.css";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState, MenuTriggerState } from "@react-stately/menu";
import { useButton } from "@react-aria/button";
import { useBentoConfig } from "../BentoConfigContext";
import { MenuProps } from "./MenuProps";
import { MenuList } from "./MenuList";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

export function Menu({
  items,
  header,
  trigger,
  initialIsOpen,
  placement,
  offset,
  size,
  dividers,
  maxHeight,
  closeOnSelect,
  nestedMenuPlacement = "right top",
  nestedMenuOffset: _nestedMenuOffset,
}: MenuProps) {
  const config = useBentoConfig().menu;
  const nestedMenuOffset = _nestedMenuOffset ?? config.defaultOffset;
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  const state = useMenuTriggerState({ defaultOpen: initialIsOpen });

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
  const { buttonProps: triggerProps } = useButton(
    { ...menuTriggerProps, elementType: "div" },
    triggerRef
  );

  return (
    <Box position="relative">
      {trigger(triggerRef, triggerProps, state)}
      {state.isOpen && (
        <Popover
          ref={overlayRef}
          onClose={state.close}
          triggerRef={triggerRef}
          placement={placement}
          offset={offset ?? config.defaultOffset}
        >
          <Box
            className={menuRecipe({ elevation: config.elevation })}
            // NOTE(gabro): the type of `autoFocus` does not match otherwise
            {...(menuProps as DOMAttributes<HTMLDivElement>)}
            {...getRadiusPropsFromConfig(config.radius)}
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
            <Inset spaceX={config.paddingX} spaceY={config.paddingY}>
              <MenuList
                items={items}
                closeMenu={state.close}
                closeOnSelect={closeOnSelect || false}
                size={size}
                dividers={dividers || false}
                maxHeight={maxHeight}
                nestedMenuOffset={nestedMenuOffset}
                nestedMenuPlacement={nestedMenuPlacement}
                portalRef={overlayRef}
              />
            </Inset>
          </Box>
        </Popover>
      )}
    </Box>
  );
}

export type { MenuTriggerState };
export * from "./MenuProps";
