import { useCheckbox } from "@react-aria/checkbox";
import { useToggleState } from "@react-stately/toggle";
import { FunctionComponent, useRef } from "react";
import { FieldType } from "../Field/createField";
import { TextChildren } from "..";
import { FieldProps } from "../Field/FieldProps";
import { CheckboxProps } from "src/Checkbox/createCheckbox";
import { useField } from "@react-aria/label";

export type CheckboxFieldProps = Omit<FieldProps<boolean>, "assistiveText"> & {
  label: TextChildren;
};

export function createCheckboxField(Field: FieldType, Checkbox: FunctionComponent<CheckboxProps>) {
  return function CheckboxField(props: CheckboxFieldProps) {
    const checkboxProps = {
      ...props,
      value: undefined,
      isSelected: props.value,
      isDisabled: props.disabled,
      children: props.label,
      validationState:
        props.issues && props.issues.length > 0 ? ("invalid" as const) : ("valid" as const),
      errorMessage: props.issues && props.issues.join("\n"),
    };
    const state = useToggleState(checkboxProps);
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckbox(checkboxProps, state, ref);
    const { errorMessageProps } = useField(checkboxProps);

    return (
      <Field
        {...props}
        label={undefined}
        assistiveTextProps={{}}
        errorMessageProps={errorMessageProps}
      >
        <Checkbox option={props} inputProps={inputProps} inputRef={ref} />
      </Field>
    );
  };
}
