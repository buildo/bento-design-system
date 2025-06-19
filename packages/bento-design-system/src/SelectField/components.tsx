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
  MultiValueProps,
} from "react-select";
import {
  MenuPortalProps,
  NoticeProps,
  MenuListProps,
} from "react-select/dist/declarations/src/components/Menu";
import {
  Body,
  Children,
  IconCheck,
  Box,
  Columns,
  Column,
  Inline,
  Inset,
  Button,
  Chip,
  LocalizedString,
} from "..";
import { singleValue, placeholder, menu, control } from "./SelectField.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { clsx } from "clsx";
import { SelectOption } from "./types";
import { InternalList } from "../List/InternalList";
import { ListItem } from "../List/ListItem";
import { useBentoConfig } from "../BentoConfigContext";
import { useSprinkles } from "../SprinklesContext";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

export function Control<A>({
  selectProps: { validationState: validation, isDisabled, isReadOnly = false },
  innerProps,
  innerRef,
  menuIsOpen,
  children,
}: ControlProps<A>) {
  const inputConfig = useBentoConfig().input;

  return (
    <Box
      {...innerProps}
      ref={innerRef}
      color={undefined}
      display="flex"
      className={control({ validation, menuIsOpen, isReadOnly })}
      disabled={isDisabled}
      {...getRadiusPropsFromConfig(inputConfig.radius)}
      paddingX={inputConfig.paddingX}
      paddingY={inputConfig.paddingY}
    >
      {children}
    </Box>
  );
}

export function ValueContainer<A>(props: ValueContainerProps<A>) {
  const sprinkles = useSprinkles();
  const dropdownConfig = useBentoConfig().dropdown;
  return (
    <defaultComponents.ValueContainer
      {...props}
      className={sprinkles({
        gap: dropdownConfig.chipSpacing,
        overflowX: "auto",
        flexWrap: "nowrap",
      })}
    />
  );
}

export function SingleValue<A extends SelectOption<unknown>>({
  children,
  isDisabled,
  data,
}: SingleValueProps<A>) {
  const inputConfig = useBentoConfig().input;

  return (
    <Box className={singleValue}>
      <Columns space={16} alignY="center">
        {data.icon && (
          <Column width="content">
            {data.icon({
              size: 24,
            })}
          </Column>
        )}
        <Body size={inputConfig.fontSize} color={isDisabled ? "disabled" : "primary"}>
          {children as any}
        </Body>
      </Columns>
    </Box>
  );
}

export function Placeholder<A>({ children, isDisabled }: PlaceholderProps<A>) {
  const inputConfig = useBentoConfig().input;

  return (
    <Box className={placeholder}>
      <Body size={inputConfig.fontSize} color={isDisabled ? "disabled" : "secondary"}>
        {children as any}
      </Body>
    </Box>
  );
}

export function DropdownIndicator<A>({
  isDisabled,
  selectProps: { isReadOnly },
}: DropdownIndicatorProps<A>) {
  const config = useBentoConfig().dropdown;

  if (isReadOnly) return null;
  return (
    <Box paddingLeft={16}>
      {config.openIndicatorIcon({
        size: config.openIndicatorIconSize,
        color: isDisabled ? "disabled" : "default",
      })}
    </Box>
  );
}

export function Input<A>(props: InputProps<A>) {
  const inputConfig = useBentoConfig().input;

  return (
    <defaultComponents.Input
      {...props}
      className={bodyRecipe({
        size: inputConfig.fontSize,
        weight: "default",
        color: "primary",
        ellipsis: false,
      })}
    />
  );
}

export function Menu<A>(props: MenuProps<A>) {
  const dropdownConfig = useBentoConfig().dropdown;
  const sprinkles = useSprinkles();

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
        sprinkles({
          boxShadow: elevation,
          borderStyle: "solid",
          borderColor: "outlineContainer",
          borderWidth: 1,
          ...getRadiusPropsFromConfig(dropdownConfig.radius),
        })
      )}
    >
      {props.children}
    </defaultComponents.Menu>
  );
}

export function MenuList<A extends { disabled?: boolean }>(props: MenuListProps<A>) {
  const dropdownConfig = useBentoConfig().dropdown;

  return (
    <defaultComponents.MenuList {...props}>
      <Inset spaceX={dropdownConfig.menuPaddingX} spaceY={dropdownConfig.menuPaddingY}>
        {props.isMulti && props.selectProps.showMultiSelectBulkActions && (
          <Inset space={8}>
            <Inline space={0} align="right">
              <Button
                kind="transparent"
                hierarchy="primary"
                label={
                  props.hasValue
                    ? props.selectProps.clearAllButtonLabel!
                    : props.selectProps.selectAllButtonLabel!
                }
                onPress={() => {
                  const nonDisabledOptions = (props.selectProps.options as A[]).filter(
                    (o) => !o.disabled
                  );
                  props.hasValue
                    ? props.clearValue()
                    : props.selectProps.onChange(nonDisabledOptions as any, {
                        action: "select-option",
                        option: nonDisabledOptions as any,
                      });
                }}
                // @ts-expect-error
                // NOTE(gabro): see the note about this in createButton
                internal_unsafe__bypassUsePress
              />
            </Inline>
          </Inset>
        )}
        <InternalList dividers>{props.children as unknown as Children}</InternalList>
      </Inset>
    </defaultComponents.MenuList>
  );
}

export function Option<B, A extends SelectOption<B>>(props: OptionProps<A>) {
  return (
    <defaultComponents.Option {...props}>
      <ListItem
        {...props.data}
        size={props.selectProps.menuSize ?? "medium"}
        onPress={() =>
          props.isSelected && !props.selectProps.isMulti
            ? props.setValue(null as any, "deselect-option")
            : props.selectOption(props.data)
        }
        trailingIcon={props.isSelected ? IconCheck : undefined}
        isFocused={props.isFocused}
        isSelected={props.isSelected}
        ignoreTabIndex
        target={undefined}
      />
    </defaultComponents.Option>
  );
}

export function MenuPortal<A>(props: MenuPortalProps<A, boolean, GroupBase<A>>) {
  return <defaultComponents.MenuPortal {...props} />;
}

export function NoOptionsMessage<A>(props: NoticeProps<A>) {
  return (
    <Inset space={16}>
      <Inline space={0} align="center" alignY="center">
        <Body size="medium" color="secondary">
          {props.children as Children}
        </Body>
      </Inline>
    </Inset>
  );
}

// NOTE(gabro): we override MultiValue instead of ValueContainer (which would be more natural)
// because overriding ValueContainer breaks the logic for closing the menu when clicking away.
// See: https://github.com/JedWatson/react-select/issues/2239#issuecomment-861848975
export function MultiValue<A extends SelectOption<unknown>>(props: MultiValueProps<A>) {
  const inputConfig = useBentoConfig().input;
  const dropdownConfig = useBentoConfig().dropdown;
  switch (props.selectProps.multiSelectMode ?? "summary") {
    case "summary":
      const numberOfSelectedOptions = props.getValue().length;

      if (props.index > 0 || !props.selectProps.multiValueMessage) {
        return null;
      }

      // note(fede): we split the SingleValue instantiation from the return
      // in order to avoid the conditional calling of hooks that would result from
      // the short-circuiting
      const singleValue = SingleValue(props);
      if (numberOfSelectedOptions === 1) return singleValue;

      return (
        <Body size={inputConfig.fontSize}>
          {props.selectProps.multiValueMessage(numberOfSelectedOptions)}
        </Body>
      );
    case "chips":
      return (
        <Chip
          color={dropdownConfig.chipColor}
          label={props.data.label as LocalizedString}
          onDismiss={props.removeProps.onClick as () => void}
        />
      );
  }
}

export const IndicatorSeparator = null;

export function styles<A>(): StylesConfig<A> {
  return {
    menuPortal: ({ zIndex, ...provided }) => provided,
    valueContainer: ({ padding, ...provided }) => provided,
    input: ({ margin, paddingBottom, paddingTop, color, ...provided }) => provided,
    menu: () => ({}),
    menuList: ({ paddingTop, paddingBottom, ...provided }) => provided,
    option: () => ({}),
  };
}
