import Select, {
  GroupBase,
  MultiValue as MultiValueT,
  MultiValueProps,
  SingleValue as SingleValueT,
} from "react-select";
import { Body, ButtonProps, ListSize, LocalizedString } from "..";
import { useField } from "@react-aria/label";
import { FunctionComponent, useEffect, useMemo } from "react";
import { FieldProps } from "../Field/FieldProps";
import { FieldType } from "../Field/Field";
import { createComponents, styles } from "./components";
import { ListItemProps } from "../List/ListItem";
import { Omit } from "../util/Omit";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { InputConfig } from "../Field/Config";
import { DropdownConfig } from "./Config";

export type SelectOption<A> = Omit<
  ListItemProps,
  "trailingIcon" | "onPress" | "href" | "isFocused" | "ignoreTabIndex" | "size" | "isSelected"
> & {
  value: A;
};

type Props<A, IsMulti extends boolean> = (IsMulti extends false
  ? FieldProps<A | undefined>
  : FieldProps<A[]>) & {
  menuSize?: ListSize;
  placeholder: LocalizedString;
  options: Array<SelectOption<A>>;
  isMulti?: IsMulti;
  noOptionsMessage?: LocalizedString;
  isReadOnly?: boolean;
  searchable?: boolean;
} & (IsMulti extends true
    ? {
        multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
        showMultiSelectBulkActions?: boolean;
        selectAllButtonLabel?: LocalizedString;
        clearAllButtonLabel?: LocalizedString;
      }
    : {});

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    menuSize?: ListSize;
    validationState: "valid" | "invalid";
    multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
    isReadOnly?: boolean;
    showMultiSelectBulkActions?: boolean;
    selectAllButtonLabel?: LocalizedString;
    clearAllButtonLabel?: LocalizedString;
  }
}

export function createSelectField(
  inputConfig: InputConfig,
  dropdownConfig: DropdownConfig,
  { Field, Button }: { Field: FieldType; Button: FunctionComponent<ButtonProps> }
) {
  const selectComponents = createComponents(inputConfig, dropdownConfig, { Button });

  return function SelectField<A, IsMulti extends boolean = false>(props: Props<A, IsMulti>) {
    const {
      value,
      onChange,
      options,
      onBlur,
      label,
      hint,
      assistiveText,
      issues,
      placeholder,
      disabled,
      isReadOnly,
      isMulti,
      noOptionsMessage,
      autoFocus,
      menuSize = dropdownConfig.defaultMenuSize,
      searchable,
    } = props;

    const validationState = issues ? "invalid" : "valid";
    const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
      label,
      description: assistiveText,
      errorMessage: issues,
      validationState,
    });

    const menuPortalTarget = useMemo(() => document.createElement("div"), []);
    useEffect(() => {
      document.body.appendChild(menuPortalTarget);

      return () => {
        if (document.body.contains(menuPortalTarget)) {
          document.body.removeChild(menuPortalTarget);
        }
      };
    }, [menuPortalTarget]);

    const { defaultMessages } = useDefaultMessages();

    return (
      <Field
        label={label}
        hint={hint}
        labelProps={labelProps}
        assistiveText={assistiveText}
        issues={issues}
        assistiveTextProps={descriptionProps}
        errorMessageProps={errorMessageProps}
        disabled={disabled}
      >
        <Select
          id={fieldProps.id}
          aria-label={fieldProps["aria-label"]}
          aria-labelledby={fieldProps["aria-labelledby"]}
          isDisabled={disabled}
          isReadOnly={isReadOnly || false}
          autoFocus={autoFocus}
          value={
            isMulti
              ? options.filter((o) => ((value ?? []) as readonly A[]).includes(o.value))
              : options.find((o) => o.value === value)
          }
          onChange={(o) => {
            if (isMulti) {
              const multiValue = o as MultiValueT<SelectOption<A>>;
              (onChange as Props<A, true>["onChange"])(multiValue.map((a) => a.value));
            } else {
              const singleValue = o as SingleValueT<SelectOption<A>>;
              (onChange as Props<A, false>["onChange"])(
                singleValue == null ? undefined : singleValue.value
              );
            }
          }}
          onBlur={onBlur}
          options={options
            .slice() // avoid mutating the original array
            .sort((a, b) => {
              // In case of multi-select, we display the selected options first
              if (isMulti) {
                const selectedValues = (value ?? []) as readonly A[];
                const isSelected = (a: SelectOption<A>) => selectedValues.includes(a.value);
                if (isSelected(a) && !isSelected(b)) {
                  return -1;
                }
                if (!isSelected(a) && isSelected(b)) {
                  return 1;
                }
              }
              return 0;
            })}
          placeholder={placeholder}
          menuPortalTarget={menuPortalTarget}
          components={{
            ...selectComponents,
            MultiValue,
          }}
          openMenuOnFocus
          styles={styles<SelectOption<A>, IsMulti>()}
          validationState={validationState}
          isMulti={isMulti}
          isClearable={false}
          noOptionsMessage={() => noOptionsMessage ?? defaultMessages.SelectField.noOptionsMessage}
          multiValueMessage={
            isMulti
              ? (props as unknown as Props<A, true>).multiValueMessage ??
                defaultMessages.SelectField.multiOptionsSelected
              : undefined
          }
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          menuSize={menuSize}
          menuIsOpen={isReadOnly ? false : undefined}
          isSearchable={isReadOnly ? false : searchable ?? true}
          showMultiSelectBulkActions={
            isMulti ? (props as unknown as Props<A, true>).showMultiSelectBulkActions : false
          }
          clearAllButtonLabel={
            isMulti
              ? (props as unknown as Props<A, true>).clearAllButtonLabel ??
                defaultMessages.SelectField.clearAllButtonLabel
              : undefined
          }
          selectAllButtonLabel={
            isMulti
              ? (props as unknown as Props<A, true>).selectAllButtonLabel ??
                defaultMessages.SelectField.selectAllButtonLabel
              : undefined
          }
        />
      </Field>
    );
  };

  // NOTE(gabro): we override MultiValue instead of ValueContainer (which would be more natural)
  // because overriding ValueContainer breaks the logic for closing the menu when clicking away.
  // See: https://github.com/JedWatson/react-select/issues/2239#issuecomment-861848975
  function MultiValue<A, IsMulti extends boolean>(props: MultiValueProps<A, IsMulti>) {
    const numberOfSelectedOptions = props.getValue().length;

    if (props.index > 0 || !props.selectProps.multiValueMessage) {
      return null;
    }

    if (numberOfSelectedOptions === 1) {
      return selectComponents.SingleValue(props);
    }

    return <Body size="large">{props.selectProps.multiValueMessage(numberOfSelectedOptions)}</Body>;
  }
}

export type { Props as SelectFieldProps };
