import {
  ComponentProps,
  createRef,
  DOMAttributes,
  Ref,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Children, Popover, Box, Inset, List, ListProps } from "..";
import { menuRecipe } from "./Menu.css";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState, MenuTriggerState } from "@react-stately/menu";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { createPortal } from "react-dom";
import { FocusScope } from "@react-aria/focus";
import { useOverlayPosition } from "@react-aria/overlays";
import { useBentoConfig } from "../BentoConfigContext";
import { MenuConfig } from "./Config";

type MenuItemProps = ListProps["items"][number] & {
  subItems?: MenuItemProps[];
};

type NestedMenuProps = {
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

type Props = {
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

function useNestedMenu(items: MenuItemProps[]) {
  const childMenuTriggerRefs = useMemo<Array<RefObject<HTMLElement>>>(
    () =>
      Array(items.length)
        .fill(0)
        .map((_) => createRef()),
    [items]
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps>();
  const childMenuState = useMenuTriggerState({ defaultOpen: false });

  return { childMenuTriggerRefs, childMenuState, selectedMenuItem, setSelectedMenuItem };
}

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
  childMenuOffset: childMenuOffset_,
}: Props) {
  const config = useBentoConfig().menu;
  const childMenuOffset = childMenuOffset_ ?? config.defaultOffset;
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

  const nestedMenuPortal = useMemo(
    () =>
      createPortal(
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
      ),
    [config, dividers, items, maxHeight, menuProps, overlayRef, positionProps, size]
  );

  return (
    <Box>
      {label}
      {isSelected && state.isOpen ? nestedMenuPortal : null}
    </Box>
  );
}

function processMenuItems(
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
) {
  const processCloseOnSelect = (item: MenuItemProps) => {
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
      } as ListProps["items"][number];
    } else {
      return processCloseOnSelect(item);
    }
  });
}

export type { Props as MenuProps };
export type { MenuTriggerState };
