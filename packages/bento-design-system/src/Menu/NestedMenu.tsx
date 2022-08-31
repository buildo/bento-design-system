import { FocusScope } from "@react-aria/focus";
import { useMenuTrigger } from "@react-aria/menu";
import { useOverlayPosition } from "@react-aria/overlays";
import { MenuTriggerState } from "@react-stately/menu";
import { ComponentProps, DOMAttributes, RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Box, Inset, List, ListItemProps, ListProps, Popover } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { menuRecipe } from "./Menu.css";
import { MenuItemProps, NestedMenuProps } from "./MenuProps";
import { useNestedMenu } from "./useNestedMenu";
import { MenuConfig } from "./Config";

function NestedMenu({
  label,
  items: _items,
  isSelected,
  placement,
  offset,
  size,
  state,
  triggerRef,
  overlayRef,
  closeOnSelect,
  dividers,
  maxHeight,
}: NestedMenuProps) {
  const config = useBentoConfig().menu;
  const componentRef = useRef(null);

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
    placement,
    offset,
    childMenuState,
    childMenuTriggerRefs,
    overlayRef,
    config
  );

  const { menuProps } = useMenuTrigger({}, state, triggerRef);
  const { overlayProps: positionProps } = useOverlayPosition({
    containerPadding: 0,
    targetRef: triggerRef,
    overlayRef: componentRef,
    isOpen: isSelected,
    placement,
    offset,
  });

  useEffect(() => {
    if (!isSelected) {
      childMenuState.close();
      setSelectedMenuItem(undefined);
    }
  }, [isSelected, childMenuState, setSelectedMenuItem]);

  const nestedMenuPortal = createPortal(
    <FocusScope restoreFocus>
      <Box
        ref={componentRef}
        className={menuRecipe({ elevation: config.elevation })}
        {...(menuProps as DOMAttributes<HTMLDivElement>)}
        borderRadius={config.radius}
        style={{ maxHeight, ...positionProps.style }}
      >
        <Inset spaceY={config.paddingY}>
          <List items={items} size={size} dividers={dividers} />
        </Inset>
      </Box>
    </FocusScope>,
    overlayRef.current ?? document.body
  );

  return (
    <Box>
      {label}
      {isSelected && state.isOpen ? nestedMenuPortal : null}
    </Box>
  );
}

export function processMenuItems(
  items: MenuItemProps[],
  state: MenuTriggerState,
  selectedItem: MenuItemProps | undefined,
  setSelectedItem: (item?: MenuItemProps) => void,
  closeOnSelect: boolean | undefined,
  dividers: boolean | undefined,
  maxHeight: number | undefined,
  size: ListProps["size"],
  childMenuPlacement: ComponentProps<typeof Popover>["placement"],
  childMenuOffset: ComponentProps<typeof Popover>["offset"],
  childMenuState: MenuTriggerState,
  childMenuTriggers: Array<RefObject<HTMLElement>>,
  overlayRef: RefObject<HTMLElement>,
  config: MenuConfig
): ListItemProps[] {
  const processCloseOnSelect = (item: ListItemProps) => {
    if (closeOnSelect && item.onPress) {
      const onPress = item.onPress;
      return {
        ...item,
        onPress: () => {
          setSelectedItem(undefined);
          childMenuState.close();
          state.close();
          onPress();
        },
      };
    } else {
      return item;
    }
  };

  return items.map((item, index) => {
    if (item.subItems) {
      const { subItems, label, ...itemProps } = item;
      return {
        ...itemProps,
        label: (
          <NestedMenu
            label={label}
            items={subItems}
            isSelected={selectedItem === item}
            placement={childMenuPlacement}
            offset={childMenuOffset}
            size={size}
            state={childMenuState}
            triggerRef={childMenuTriggers[index]}
            overlayRef={overlayRef}
            closeOnSelect={closeOnSelect}
            dividers={dividers}
            maxHeight={maxHeight}
          />
        ),
        ref: childMenuTriggers[index],
        trailingIcon: config.childMenuIcon,
        onPress: () => {
          if (selectedItem === item) {
            setSelectedItem(undefined);
            childMenuState.close();
          } else {
            setSelectedItem(item);
            childMenuState.open();
          }
        },
      } as ListItemProps;
    } else {
      return processCloseOnSelect(item);
    }
  });
}
