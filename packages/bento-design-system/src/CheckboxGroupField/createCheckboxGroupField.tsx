import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { useRef } from "react";
import { FieldType } from "../Field/createField";
import { TextChildren } from "..";
import { FieldProps } from "../Field/FieldProps";
import { createCheckbox } from "../Checkbox/createCheckbox";
import { useField } from "@react-aria/label";
import { CheckboxGroupState, useCheckboxGroupState } from "@react-stately/checkbox";
import { Box, Inline, Inset, Stack } from "../internal";
import {
  SelectionControlConfig,
  SelectionControlGroupConfig,
} from "../Field/SelectionControlConfig";

export type CheckboxOption = {
  value: string;
  label: TextChildren;
  isDisabled?: boolean;
};

type Props = FieldProps<string[]> & {
  label: TextChildren;
  options: Array<CheckboxOption>;
  orientation?: "vertical" | "horizontal";
};

export function createCheckboxGroupField(
  config: {
    group: SelectionControlGroupConfig;
    element: SelectionControlConfig;
  },
  { Field }: { Field: FieldType }
) {
  const Checkbox = createCheckbox(config.element);

  function CheckboxItem({ state, option }: { state: CheckboxGroupState; option: CheckboxOption }) {
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckboxGroupItem({ ...option, children: option.label }, state, ref);

    const isDisabled = state.isDisabled || option.isDisabled;
    const isSelected = state.isSelected(option.value);

    return (
      <Checkbox
        option={{ ...option, isSelected, isDisabled }}
        inputProps={inputProps}
        inputRef={ref}
      />
    );
  }

  return function CheckboxGroupField(props: Props) {
    const checkboxGroupProps = {
      ...props,
      children: props.label,
      validationState:
        props.issues && props.issues.length > 0 ? ("invalid" as const) : ("valid" as const),
      errorMessage: props.issues && props.issues.join(" "),
    };
    const state = useCheckboxGroupState(checkboxGroupProps);
    const { groupProps, labelProps } = useCheckboxGroup(checkboxGroupProps, state);
    const { fieldProps, descriptionProps, errorMessageProps } = useField(checkboxGroupProps);

    const groupOptions = props.options.map((option) => (
      <CheckboxItem key={option.value} state={state} option={option} />
    ));

    return (
      <Box {...groupProps} aria-describedby={fieldProps["aria-describedby"]} color={undefined}>
        <Field
          {...props}
          label={props.label}
          labelProps={labelProps}
          assistiveTextProps={descriptionProps}
          errorMessageProps={errorMessageProps}
        >
          <Inset spaceY={config.group.paddingY}>
            {(props.orientation || "vertical") === "vertical" ? (
              <Stack space={config.group.internalSpacing.vertical}>{groupOptions}</Stack>
            ) : (
              <Inline space={config.group.internalSpacing.horizontal}>{groupOptions}</Inline>
            )}
          </Inset>
        </Field>
      </Box>
    );
  };
}

export type { Props as CheckboxGroupFieldProps };
