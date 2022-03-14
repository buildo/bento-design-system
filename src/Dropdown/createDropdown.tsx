import { ComponentProps, FunctionComponent, Ref, useRef } from "react";
import { Popover } from "..";
import { BentoSprinkles, Box, Inset } from "../internal";
import { dropdownRecipe } from "./Dropdown.css";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState, MenuTriggerState } from "@react-stately/menu";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { ListProps } from "../List/createListComponents";
import { ListItemProps } from "../List/createListItem";

type Props = {
  size: ListProps["size"];
  items: Array<ListItemProps>;
  trigger: (
    ref: Ref<HTMLElement>,
    props: Pick<AriaButtonProps, "id" | "aria-labelledby">,
    state: MenuTriggerState
  ) => JSX.Element;
  initialIsOpen?: boolean;
  placement?: ComponentProps<typeof Popover>["placement"];
};

type DropdownConfig = {
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  elevation: "small" | "medium" | "large";
};

export function createDropdown(List: FunctionComponent<ListProps>, config: DropdownConfig) {
  return function Dropdown({ items, trigger, initialIsOpen, placement, size }: Props) {
    const triggerRef = useRef(null);

    const state = useMenuTriggerState({
      defaultOpen: initialIsOpen,
    });

    const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
    const { buttonProps: triggerProps } = useButton(
      { ...menuTriggerProps, elementType: "div" },
      triggerRef
    );

    return (
      <Box position="relative">
        {trigger(triggerRef, triggerProps, state)}
        {state.isOpen && (
          <Popover onClose={() => state.close()} triggerRef={triggerRef} placement={placement}>
            <Box
              className={dropdownRecipe({ elevation: config.elevation })}
              {...menuProps}
              color={undefined}
              borderRadius={config.radius}
            >
              <Inset spaceY={config.paddingY}>
                <List items={items} size={size} />
              </Inset>
            </Box>
          </Popover>
        )}
      </Box>
    );
  };
}

export const defaultDropdownConfig: DropdownConfig = {
  paddingY: 8,
  radius: 8,
  elevation: "medium",
};
