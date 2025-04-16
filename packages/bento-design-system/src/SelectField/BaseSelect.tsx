import Select, { MultiValue as MultiValueT, SingleValue as SingleValueT } from "react-select";
import { useDefaultMessages } from "..";
import { FieldProps } from "../Field/FieldProps";
import { BentoConfigProvider, useBentoConfig } from "../BentoConfigContext";
import { AriaLabelingProps, DOMProps } from "@react-types/shared";
import * as selectComponents from "./components";
import { useEffect, useId, useRef } from "react";
import { BaseMultiProps, BaseSelectProps, BaseSingleProps, SelectOption } from "./types";

type MultiProps<A> = BaseMultiProps &
  Pick<FieldProps<A[]>, "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value">;

type SingleProps<A> = BaseSingleProps &
  Pick<
    FieldProps<A | undefined>,
    "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value"
  >;

type Props<A> = BaseSelectProps<A> & {
  fieldProps: AriaLabelingProps & DOMProps;
  validationState: "valid" | "invalid";
} & (SingleProps<A> | MultiProps<A>);

export function BaseSelect<A>(props: Props<A>) {
  const dropdownConfig = useBentoConfig().dropdown;
  const { defaultMessages } = useDefaultMessages();

  const menuPortalTarget = useRef<HTMLDivElement>();
  useEffect(() => {
    if (!menuPortalTarget.current) {
      menuPortalTarget.current = document.createElement("div");
    }
    document.body.appendChild(menuPortalTarget.current);

    return () => {
      if (document.body.contains(menuPortalTarget.current!)) {
        document.body.removeChild(menuPortalTarget.current!);
      }
    };
  }, [menuPortalTarget]);

  const {
    fieldProps,
    validationState,
    value,
    onChange,
    options,
    onBlur,
    name,
    placeholder,
    disabled,
    isReadOnly,
    isMulti,
    noOptionsMessage,
    autoFocus,
    menuSize = dropdownConfig.defaultMenuSize,
    searchable,
    clearable = true,
  } = props;

  // NOTE(gabro): we want to make sure we have a stable ID across SSR rendering, to overcome this issue with react-select https://github.com/JedWatson/react-select/issues/2629
  const generatedId = useId();
  const id = fieldProps.id ?? generatedId;

  const assignValue = isMulti
    ? options.filter((o) => ((value ?? []) as readonly A[]).includes(o.value))
    : options.find((o) => o.value === value);

  return (
    // NOTE(gabro): SelectField has its own config for List, so we override it here using BentoConfigProvider
    <BentoConfigProvider value={{ list: dropdownConfig.list }}>
      <Select
        id={id}
        instanceId={id}
        name={name}
        aria-label={fieldProps["aria-label"]}
        aria-labelledby={fieldProps["aria-labelledby"]}
        isDisabled={disabled}
        isReadOnly={isReadOnly || false}
        autoFocus={autoFocus}
        value={assignValue ?? null}
        onChange={(o) => {
          if (isMulti) {
            const multiValue = o as MultiValueT<SelectOption<A>>;
            onChange(multiValue.map((a) => a.value));
          } else {
            const singleValue = o as SingleValueT<SelectOption<A>>;
            if (clearable) {
              onChange(singleValue == null ? undefined : singleValue.value);
            } else {
              singleValue != null && onChange(singleValue.value);
            }
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
        menuPortalTarget={menuPortalTarget.current}
        components={selectComponents}
        openMenuOnFocus={props.openMenuOnFocus ?? dropdownConfig.openMenuOnFocus}
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
    </BentoConfigProvider>
  );
}

export type { SelectOption };
