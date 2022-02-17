import {
  components as defaultComponents,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  InputProps,
  MenuProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
} from "react-select";
import { MenuPortalProps, NoticeProps } from "react-select/dist/declarations/src/components/Menu";
import { Body, IconChevronDown, TextChildren, Children, IconCheck } from "..";
import { Box, Columns, Column, Inline, Inset, bentoSprinkles } from "../internal";
import { useModalContext } from "../Modal/useModalContext";
import {
  singleValue,
  placeholder,
  menu,
  optionRecipe,
  menuPortalRecipe,
  control,
} from "./SelectField.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { InputConfig } from "../Field/InputConfig";
import { DropdownConfig } from "./createSelectField";
import clsx from "clsx";

export function createComponents(inputConfig: InputConfig, dropdownConfig: DropdownConfig) {
  function Control<A, IsMulti extends boolean>({
    selectProps: { validationState: validation, isDisabled },
    innerProps,
    innerRef,
    menuIsOpen,
    children,
  }: ControlProps<A, IsMulti>) {
    return (
      <Box
        {...innerProps}
        ref={innerRef}
        color={undefined}
        display="flex"
        className={control({ validation, menuIsOpen })}
        disabled={isDisabled}
        borderRadius={inputConfig.radius}
        paddingX={inputConfig.paddingX}
        paddingY={inputConfig.paddingY}
      >
        {children}
      </Box>
    );
  }

  function ValueContainer<A, IsMulti extends boolean>(props: ValueContainerProps<A, IsMulti>) {
    return (
      <defaultComponents.ValueContainer
        {...props}
        className={bentoSprinkles({
          paddingX: inputConfig.paddingX,
          paddingY: inputConfig.paddingY,
          gap: 8,
        })}
      />
    );
  }

  function SingleValue<A, IsMulti extends boolean>({
    children,
    isDisabled,
    data,
  }: SingleValueProps<A, IsMulti>) {
    return (
      <Box className={singleValue}>
        <Columns space={16} alignY="center">
          {"icon" in data && (
            <Column width="content">{(data as unknown as { icon: Children }).icon}</Column>
          )}
          <Body size={inputConfig.fontSize} color={isDisabled ? "disabled" : "default"}>
            {children as any}
          </Body>
        </Columns>
      </Box>
    );
  }

  function Placeholder<A, IsMulti extends boolean>({
    children,
    isDisabled,
  }: PlaceholderProps<A, IsMulti>) {
    return (
      <Box className={placeholder}>
        <Body size={inputConfig.fontSize} color={isDisabled ? "disabled" : "secondary"}>
          {children as any}
        </Body>
      </Box>
    );
  }

  function DropdownIndicator<A, IsMulti extends boolean>({
    isDisabled,
  }: DropdownIndicatorProps<A, IsMulti>) {
    return (
      <Box paddingX={16}>
        <IconChevronDown size={16} color={isDisabled ? "disabled" : "default"} />
      </Box>
    );
  }

  function Input<A, IsMulti extends boolean>(props: InputProps<A, IsMulti>) {
    return (
      <defaultComponents.Input
        {...props}
        className={bodyRecipe({
          size: inputConfig.fontSize,
          weight: "regular",
          color: "default",
        })}
      />
    );
  }

  function Menu<A, IsMulti extends boolean>(props: MenuProps<A, IsMulti>) {
    const elevation = (() => {
      switch (dropdownConfig.elevation) {
        case "small":
          return "elevationSmall" as const;
        case "medium":
          return "elevationMedium" as const;
        case "large":
          return "elevationLarge" as const;
      }
    })();
    return (
      <defaultComponents.Menu
        {...props}
        className={clsx(
          menu,
          bentoSprinkles({
            boxShadow: elevation,
            borderRadius: dropdownConfig.radius,
          })
        )}
      >
        <Inset spaceY={dropdownConfig.list.paddingY}>{props.children}</Inset>
      </defaultComponents.Menu>
    );
  }

  function Option<A, IsMulti extends boolean>(props: OptionProps<A, IsMulti>) {
    return (
      <defaultComponents.Option
        {...props}
        className={clsx(
          optionRecipe({
            isSelected: props.isSelected,
            isFocused: props.isFocused,
          }),
          bentoSprinkles({
            paddingX: dropdownConfig.list.itemPaddingX,
            paddingY: dropdownConfig.list.itemPaddingY[props.selectProps.size],
          })
        )}
      >
        <Columns space={dropdownConfig.list.internalSpacing} alignY="center">
          {"icon" in props.data && ( // TODO(vince): should this be just an Icon component?
            <Column width="content">{(props.data as unknown as { icon: Children }).icon}</Column>
          )}
          <Body size={dropdownConfig.list.fontSize.firstLine}>
            {props.children as TextChildren}
          </Body>
          {props.isSelected && (
            <Column width="content">
              <IconCheck size={dropdownConfig.list.iconSize.trailing} />
            </Column>
          )}
        </Columns>
      </defaultComponents.Option>
    );
  }

  function MenuPortal<A, IsMulti extends boolean>(
    props: MenuPortalProps<A, IsMulti, GroupBase<A>>
  ) {
    const inDialog = useModalContext();
    return <defaultComponents.MenuPortal {...props} className={menuPortalRecipe({ inDialog })} />;
  }

  function NoOptionsMessage<A, IsMulti extends boolean>(props: NoticeProps<A, IsMulti>) {
    return (
      <Inset space={16}>
        <Inline space={0} align="center" alignY="center">
          <Body size="medium" color="secondary">
            {props.children as TextChildren}
          </Body>
        </Inline>
      </Inset>
    );
  }

  return {
    Control,
    ValueContainer,
    SingleValue,
    Placeholder,
    DropdownIndicator,
    Input,
    Menu,
    Option,
    MenuPortal,
    IndicatorSeparator: null,
    NoOptionsMessage,
  };
}

export const styles = <A, IsMulti extends boolean>(): StylesConfig<A, IsMulti> => ({
  menuPortal: ({ zIndex, ...provided }) => provided,
  valueContainer: ({ padding, ...provided }) => provided,
  input: ({ margin, paddingBottom, paddingTop, color, ...provided }) => provided,
  menu: () => ({}),
  menuList: ({ paddingTop, paddingBottom, ...provided }) => provided,
  option: () => ({}),
});
