import { FunctionComponent } from "react";
import {
  components as defaultComponents,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  InputProps,
  MenuProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
} from "react-select";
import { MenuPortalProps, NoticeProps } from "react-select/dist/declarations/src/components/Menu";
import {
  Body,
  IconChevronDown,
  TextChildren,
  LocalizedString,
  unsafeLocalizedString,
  Children,
  ChipProps,
  IconCheck,
} from "..";
import { Box, Columns, Column, Inline, Inset } from "../internal";
import { useModalContext } from "../Modal/useModalContext";
import {
  valueContainer,
  singleValue,
  placeholder,
  input,
  menu,
  optionRecipe,
  menuPortalRecipe,
  control,
} from "./SelectField.css";

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
    >
      {children}
    </Box>
  );
}

function ValueContainer<A, IsMulti extends boolean>(props: ValueContainerProps<A, IsMulti>) {
  return <defaultComponents.ValueContainer {...props} className={valueContainer} />;
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
        <Body size="large" color={isDisabled ? "disabled" : "default"}>
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
      <Body size="large" color={isDisabled ? "disabled" : "secondary"}>
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
  return <defaultComponents.Input {...props} className={input} />;
}

function Menu<A, IsMulti extends boolean>(props: MenuProps<A, IsMulti>) {
  return (
    <defaultComponents.Menu {...props} className={menu}>
      <Inset spaceY={8}>{props.children}</Inset>
    </defaultComponents.Menu>
  );
}

function Option<A, IsMulti extends boolean>(props: OptionProps<A, IsMulti>) {
  return (
    <defaultComponents.Option
      {...props}
      className={optionRecipe({
        isSelected: props.isSelected,
        isFocused: props.isFocused,
      })}
    >
      <Columns space={16} alignY="center">
        {"icon" in props.data && (
          <Column width="content">{(props.data as unknown as { icon: Children }).icon}</Column>
        )}
        <Body size="medium">{props.children as TextChildren}</Body>
        {props.isSelected && (
          <Column width="content">
            <IconCheck size={16} />
          </Column>
        )}
      </Columns>
    </defaultComponents.Option>
  );
}

function MenuPortal<A, IsMulti extends boolean>(props: MenuPortalProps<A, IsMulti, GroupBase<A>>) {
  console.log(props);
  const inDialog = useModalContext();
  return <defaultComponents.MenuPortal {...props} className={menuPortalRecipe({ inDialog })} />;
}

export function createMultiValue(Chip: FunctionComponent<ChipProps>) {
  return function MultiValue({
    valueRemoveLabel,
  }: {
    valueRemoveLabel: LocalizedString;
  }): <A extends { label: string }, IsMulti extends boolean>(
    props: MultiValueProps<A, IsMulti>
  ) => JSX.Element {
    return (props) => (
      // NOTE(gabro): small hack to keep the height of a MultiValue the same as the text
      // and avoid a layout shift
      <Box style={{ marginTop: -1, marginBottom: -1 }}>
        <Chip
          label={unsafeLocalizedString(props.data.label)}
          onDismiss={props.removeProps.onClick as () => void}
          color="violet"
          dismissButtonLabel={valueRemoveLabel}
        />
      </Box>
    );
  };
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

export const components = {
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

export const styles = <A, IsMulti extends boolean>(): StylesConfig<A, IsMulti> => ({
  menuPortal: ({ zIndex, ...provided }) => provided,
  valueContainer: ({ padding, ...provided }) => provided,
  input: ({ margin, paddingBottom, paddingTop, color, ...provided }) => provided,
  menu: () => ({}),
  menuList: ({ paddingTop, paddingBottom, ...provided }) => provided,
  option: () => ({}),
});
