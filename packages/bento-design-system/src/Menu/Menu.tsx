import {
  ComponentProps,
  createRef,
  DOMAttributes,
  Ref,
  RefObject,
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
import { useOverlayPosition } from "@react-aria/overlays";
import { useBentoConfig } from "../BentoConfigContext";

type MenuItemProps = ListProps["items"][number] & {
  subItems?: ListProps["items"];
};

type SubMenuProps = {
  label: Children;
  items: ListProps["items"];
  isSelected: boolean;
  placement: ComponentProps<typeof Popover>["placement"];
  offset: ComponentProps<typeof Popover>["offset"];
  size: ListProps["size"];
  state: MenuTriggerState;
  triggerRef: RefObject<HTMLElement>;
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
  subMenuPlacement?: ComponentProps<typeof Popover>["placement"];
  subMenuOffset?: ComponentProps<typeof Popover>["offset"];
};

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
  subMenuPlacement = "right top",
  subMenuOffset: subMenuOffset_,
}: Props) {
  const config = useBentoConfig().menu;
  const subMenuOffset = subMenuOffset_ ?? config.defaultOffset;
  const triggerRef = useRef(null);

  const state = useMenuTriggerState({
    defaultOpen: initialIsOpen,
  });

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
  const { buttonProps: triggerProps } = useButton(
    { ...menuTriggerProps, elementType: "div" },
    triggerRef
  );

  const subMenuTriggerRefs = useMemo<Array<RefObject<HTMLElement>>>(
    () =>
      Array(_items.length)
        .fill(0)
        .map((_) => createRef()),
    [_items]
  );
  const [selectedSubMenu, setSelectedSubMenu] = useState<MenuItemProps>();
  const subState = useMenuTriggerState({ defaultOpen: false });

  const processCloseOnSelect = (item: ListProps["items"][number] | MenuItemProps) => {
    if (closeOnSelect && item.onPress) {
      const onPress = item.onPress;
      return {
        ...item,
        onPress: () => {
          onPress();
          subState.close();
          state.close();
        },
      };
    } else {
      return item;
    }
  };

  const items = _items.map((item, index) => {
    if (item.subItems) {
      const { subItems, label, ...itemProps } = item;
      return {
        ...itemProps,
        label: (
          <SubMenu
            label={label}
            items={subItems.map(processCloseOnSelect)}
            isSelected={selectedSubMenu === item}
            placement={subMenuPlacement}
            offset={subMenuOffset}
            size={size}
            state={subState}
            triggerRef={subMenuTriggerRefs[index]}
            dividers={dividers}
            maxHeight={maxHeight}
          />
        ),
        ref: subMenuTriggerRefs[index],
        trailingIcon: config.subMenuIcon,
        onPress: () => {
          if (selectedSubMenu === item) {
            setSelectedSubMenu(undefined);
            subState.close();
          } else {
            setSelectedSubMenu(item);
            subState.open();
          }
        },
      } as ListProps["items"][number];
    } else {
      return processCloseOnSelect(item);
    }
  });

  return (
    <Box position="relative">
      {trigger(triggerRef, triggerProps, state)}
      {state.isOpen && (
        <Popover
          onClose={() => {
            subState.close();
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

function SubMenu({
  label,
  items,
  isSelected,
  placement,
  offset,
  size,
  state,
  triggerRef,
  dividers,
  maxHeight,
}: SubMenuProps) {
  const config = useBentoConfig().menu;
  const subMenuRef = useRef(null);

  const { menuProps } = useMenuTrigger({}, state, triggerRef);
  const { overlayProps: positionProps } = useOverlayPosition({
    containerPadding: 0,
    targetRef: triggerRef,
    overlayRef: subMenuRef,
    isOpen: isSelected,
    placement,
    offset,
  });

  return (
    <Box>
      {label}
      {isSelected && state.isOpen && (
        <Box
          ref={subMenuRef}
          className={menuRecipe({ elevation: config.elevation })}
          {...(menuProps as DOMAttributes<HTMLDivElement>)}
          borderRadius={config.radius}
          style={{ maxHeight, height: "fit-content", ...positionProps.style }}
        >
          <Inset spaceY={config.paddingY}>
            <List items={items} size={size} dividers={dividers} />
          </Inset>
        </Box>
      )}
    </Box>
  );
}

export type { Props as MenuProps };
export type { MenuTriggerState };
