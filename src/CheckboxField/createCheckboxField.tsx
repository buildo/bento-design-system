import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useField } from "@react-aria/label";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useRef } from "react";
import { FieldType } from "../Field/createField";
import { Body, TextChildren } from "..";
import { BentoSprinkles, Box, Column, Columns } from "../internal";
import { FieldProps } from "../Field/FieldProps";
import { vars } from "../vars.css";
import { checkboxRecipe, fieldContainer } from "./CheckboxField.css";

export type CheckboxFieldProps = Omit<FieldProps<boolean>, "assistiveText"> & {
  label: TextChildren;
};
export type CheckboxFieldConfig = {
  labelSpacing: BentoSprinkles["gap"];
};

export function createCheckboxField(
  Field: FieldType,
  config: CheckboxFieldConfig = {
    labelSpacing: "8",
  }
) {
  return function CheckboxField(props: CheckboxFieldProps) {
    const checkboxProps = {
      ...props,
      value: undefined,
      isSelected: props.value,
      isDisabled: props.disabled,
      children: props.label,
    };
    const state = useToggleState(checkboxProps);
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckbox(checkboxProps, state, ref);
    const { fieldProps, labelProps, errorMessageProps } = useField(checkboxProps);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
      <Field
        {...props}
        label={undefined}
        assistiveTextProps={{}}
        errorMessageProps={errorMessageProps}
      >
        <Box
          as="label"
          disabled={props.disabled}
          {...labelProps}
          {...focusProps}
          color={undefined}
          cursor={{ default: "pointer", disabled: "notAllowed" }}
          paddingBottom="4"
          className={fieldContainer}
        >
          <VisuallyHidden>
            <input {...mergeProps(inputProps, fieldProps, focusProps)} ref={ref} />
          </VisuallyHidden>
          <Columns space={config.labelSpacing} alignY="center">
            <Column width="content">
              <Checkbox
                value={props.value}
                isFocusVisible={isFocusVisible}
                isDisabled={props.disabled ?? false}
              />
            </Column>
            <Body size="medium" color={props.disabled ? "disabled" : "default"}>
              {props.label}
            </Body>
          </Columns>
        </Box>
      </Field>
    );
  };
}

type CheckboxProps = {
  value: boolean;
  isDisabled: boolean;
  isFocusVisible: boolean;
};

function Checkbox({ value, isFocusVisible, isDisabled }: CheckboxProps) {
  return (
    <Box className={checkboxRecipe({ isSelected: value, isFocused: isFocusVisible, isDisabled })}>
      {value && <CheckboxMark isDisabled={isDisabled} />}
    </Box>
  );
}

function CheckboxMark({ isDisabled }: { isDisabled: boolean }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path
        d="M2 5.89744L6 10L14 2"
        stroke={
          isDisabled
            ? vars.interactiveForegroundColor.solidDisabledForeground
            : vars.interactiveForegroundColor.solidEnabledForeground
        }
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
