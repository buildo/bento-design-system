import { FocusScope } from "@react-aria/focus";
import { useMenuTrigger } from "@react-aria/menu";
import { useOverlayPosition } from "@react-aria/overlays";
import { ComponentProps, DOMAttributes, RefObject, useRef } from "react";
import { createPortal } from "react-dom";
import { Box, Inset, MenuItemProps, Popover, ListProps, MenuTriggerState } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { menuRecipe } from "./Menu.css";
import { MenuList } from "./MenuList";
import { useIsSSR } from "@react-aria/ssr";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

type Props = {
  items: MenuItemProps[];
  placement: ComponentProps<typeof Popover>["placement"];
  offset: ComponentProps<typeof Popover>["offset"];
  size: ListProps["size"];
  state: MenuTriggerState;
  triggerRef: RefObject<HTMLElement>;
  portalRef: RefObject<HTMLElement>;
  dividers: boolean;
  maxHeight: number | undefined;
  closeOnSelect: boolean;
  closeMenu: () => void;
};

export function NestedMenu({
  items,
  placement,
  offset,
  size,
  state,
  triggerRef,
  portalRef,
  dividers,
  maxHeight,
  closeOnSelect,
  closeMenu,
}: Props) {
  const config = useBentoConfig().menu;
  const overlayRef = useRef(null);
  const isSSR = useIsSSR();

  const { menuProps } = useMenuTrigger({}, state, triggerRef);
  const { overlayProps: positionProps } = useOverlayPosition({
    containerPadding: 0,
    targetRef: triggerRef,
    overlayRef,
    isOpen: state.isOpen,
    placement,
    offset,
  });

  return state.isOpen && !isSSR
    ? createPortal(
        <FocusScope restoreFocus>
          <Box
            ref={overlayRef}
            className={menuRecipe({ elevation: config.elevation })}
            {...(menuProps as DOMAttributes<HTMLDivElement>)}
            {...getRadiusPropsFromConfig(config.radius)}
            style={{ maxHeight, ...positionProps.style }}
          >
            <Inset spaceY={config.paddingY}>
              <MenuList
                items={items}
                size={size}
                dividers={dividers}
                closeOnSelect={closeOnSelect}
                closeMenu={closeMenu}
                maxHeight={maxHeight}
                portalRef={portalRef}
                nestedMenuOffset={offset}
                nestedMenuPlacement={placement}
              />
            </Inset>
          </Box>
        </FocusScope>,
        portalRef.current ?? document.body
      )
    : null;
}
