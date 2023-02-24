import Select, {
  GroupBase,
  MultiValue as MultiValueT,
  MultiValueProps,
  SingleValue as SingleValueT,
} from "react-select";
import { Body, Chip, ListSize, LocalizedString } from "..";
import { useField } from "@react-aria/label";
import { useEffect, useMemo } from "react";
import { FieldProps } from "../Field/FieldProps";
import { Field } from "../Field/Field";
import * as selectComponents from "./components";
import { ListItemProps } from "../List/ListItem";
import { Omit } from "../util/Omit";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { BentoConfigProvider, useBentoConfig } from "../BentoConfigContext";

export type SelectOption<A> = Omit<
  ListItemProps,
  "trailingIcon" | "onPress" | "href" | "isFocused" | "ignoreTabIndex" | "size" | "isSelected"
> & {
  value: A;
};

type MultiProps<A> = {
  isMulti: true;
  showMultiSelectBulkActions?: boolean;
  selectAllButtonLabel?: LocalizedString;
  clearAllButtonLabel?: LocalizedString;
} & FieldProps<A[]> &
  (
    | {
        multiSelectMode?: "summary";
        multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
      }
    | {
        multiSelectMode: "chips";
        multiValueMessage?: never;
      }
  );

type SingleProps<A> = {
  isMulti?: false;
} & FieldProps<A | undefined>;

type Props<A> = {
  menuSize?: ListSize;
  placeholder: LocalizedString;
  options: Array<SelectOption<A>>;
  noOptionsMessage?: LocalizedString;
  isReadOnly?: boolean;
  searchable?: boolean;
} & (SingleProps<A> | MultiProps<A>);

export type { Props as SelectFieldProps };

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    menuSize?: ListSize;
    validationState: "valid" | "invalid";
    multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
    isReadOnly?: boolean;
    showMultiSelectBulkActions?: boolean;
    selectAllButtonLabel?: LocalizedString;
    clearAllButtonLabel?: LocalizedString;
    multiSelectMode?: "summary" | "chips";
  }
}

export function SelectField<A>(props: Props<A>) {
  const dropdownConfig = useBentoConfig().dropdown;

  const {
    value,
    onChange,
    options,
    onBlur,
    label,
    hint,
    hintPlacement,
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

  const hintProps = hint !== undefined ? { hint, hintPlacement } : { hint };

  return (
    // NOTE(gabro): SelectField has its own config for List, so we override it here using BentoConfigProvider
    <BentoConfigProvider value={{ list: dropdownConfig.list }}>
      <Field
        label={label}
        labelProps={labelProps}
        assistiveText={assistiveText}
        issues={issues}
        assistiveTextProps={descriptionProps}
        errorMessageProps={errorMessageProps}
        disabled={disabled}
        {...hintProps}
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
              onChange(multiValue.map((a) => a.value));
            } else {
              const singleValue = o as SingleValueT<SelectOption<A>>;
              onChange(singleValue == null ? undefined : singleValue.value);
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
          styles={selectComponents.styles<SelectOption<A>>()}
          validationState={validationState}
          isMulti={isMulti}
          isClearable={false}
          noOptionsMessage={() => noOptionsMessage ?? defaultMessages.SelectField.noOptionsMessage}
          multiValueMessage={
            props.isMulti && (!props.multiSelectMode || props.multiSelectMode === "summary")
              ? props.multiValueMessage ?? defaultMessages.SelectField.multiOptionsSelected
              : undefined
          }
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          menuSize={menuSize}
          menuIsOpen={isReadOnly ? false : undefined}
          isSearchable={isReadOnly ? false : searchable ?? true}
          showMultiSelectBulkActions={isMulti ? props.showMultiSelectBulkActions : false}
          clearAllButtonLabel={
            isMulti
              ? props.clearAllButtonLabel ?? defaultMessages.SelectField.clearAllButtonLabel
              : undefined
          }
          selectAllButtonLabel={
            isMulti
              ? props.selectAllButtonLabel ?? defaultMessages.SelectField.selectAllButtonLabel
              : undefined
          }
          multiSelectMode={isMulti ? props.multiSelectMode : undefined}
        />
      </Field>
    </BentoConfigProvider>
  );
}

// NOTE(gabro): we override MultiValue instead of ValueContainer (which would be more natural)
// because overriding ValueContainer breaks the logic for closing the menu when clicking away.
// See: https://github.com/JedWatson/react-select/issues/2239#issuecomment-861848975
function MultiValue<A extends SelectOption<unknown>>(props: MultiValueProps<A>) {
  const inputConfig = useBentoConfig().input;
  const dropdownConfig = useBentoConfig().dropdown;
  switch (props.selectProps.multiSelectMode ?? "summary") {
    case "summary":
      const numberOfSelectedOptions = props.getValue().length;

      if (props.index > 0 || !props.selectProps.multiValueMessage) {
        return null;
      }

      if (numberOfSelectedOptions === 1) {
        return selectComponents.SingleValue(props);
      }

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
