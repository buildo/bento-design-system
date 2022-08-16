import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { InternalCheckbox } from "../Checkbox/InternalCheckbox";
import { useField } from "@react-aria/label";
import { CheckboxGroupState, useCheckboxGroupState } from "@react-stately/checkbox";
import { Box, Inline, Stack, Field } from "..";
import { Children } from "../util/Children";
import { FocusScope } from "@react-aria/focus";
import { useBentoConfig } from "../BentoConfigProvider";

export type CheckboxOption = {
  value: string;
  label: Children;
  isDisabled?: boolean;
  autoFocus?: boolean;
};

type Props = FieldProps<string[]> & {
  label: Children;
  options: Array<CheckboxOption>;
  orientation?: "vertical" | "horizontal";
};

function CheckboxItem({ state, option }: { state: CheckboxGroupState; option: CheckboxOption }) {
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckboxGroupItem({ ...option, children: option.label }, state, ref);

  const isDisabled = state.isDisabled || option.isDisabled;
  const isSelected = state.isSelected(option.value);

  return (
    <InternalCheckbox
      option={{ ...option, isSelected, isDisabled }}
      inputProps={inputProps}
      inputRef={ref}
    />
  );
}

export function CheckboxGroupField(props: Props) {
  const config = useBentoConfig().selectionControl;
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

  const paddingY = (config.group.internalSpacing.vertical as number) / 2;

  return (
    <FocusScope autoFocus={props.autoFocus}>
      <Box {...groupProps} aria-describedby={fieldProps["aria-describedby"]}>
        <Field
          {...props}
          label={props.label}
          labelProps={labelProps}
          assistiveTextProps={descriptionProps}
          errorMessageProps={errorMessageProps}
        >
          <Box
            style={{
              paddingTop: paddingY,
              paddingBottom: paddingY,
            }}
          >
            {(props.orientation ?? "vertical") === "vertical" ? (
              <Stack space={config.group.internalSpacing.vertical}>{groupOptions}</Stack>
            ) : (
              <Inline space={config.group.internalSpacing.horizontal}>{groupOptions}</Inline>
            )}
          </Box>
        </Field>
      </Box>
    </FocusScope>
  );
}

export type { Props as CheckboxGroupFieldProps };
