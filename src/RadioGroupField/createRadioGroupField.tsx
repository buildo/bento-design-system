import { Body, LocalizedString } from "..";
import { Box, Column, Columns, Inline, Inset, Stack } from "../internal";
import { FieldProps } from "../Field/FieldProps";
import { FieldType } from "../Field/createField";
import { RadioGroupState, useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { AriaRadioGroupProps } from "@react-types/radio";
import { useField } from "@react-aria/label";
import { radioOption } from "./RadioGroupField.css";
import { useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { Radio } from "./Radio";
import { SelectionControlConfig } from "../Field/SelectionControlConfig";

type Option<A> = {
  value: A;
  label: LocalizedString;
  isDisabled?: boolean;
};

export type RadioGroupFieldProps<A> = FieldProps<A | undefined, A> & {
  name: string;
  options: Array<Option<A>>;
  orientation?: "vertical" | "horizontal";
};

export function createRadioGroupField(
  Field: FieldType,
  config: SelectionControlConfig = {
    paddingY: 8,
    controlLabelSpacing: 8,
    internalSpacing: {
      horizontal: 24,
      vertical: 16,
    },
  }
) {
  return function RadioGroupField<A extends string | number | boolean>(
    props: RadioGroupFieldProps<A>
  ) {
    const ariaProps: AriaRadioGroupProps = {
      ...props,
      isDisabled: props.disabled,
      value: String(props.value),
      onChange: (a) => {
        // NOTE(gabro): we represent the value internally as a string, since it's what
        // <input type="radio"> supports, but this hack allows us to accept also booleans and numbers
        props.onChange(props.options.find((o) => String(o.value) === a)!.value as A);
      },
    };
    const state = useRadioGroupState(ariaProps);
    const { labelProps, radioGroupProps } = useRadioGroup(ariaProps, state);
    const { errorMessageProps, descriptionProps } = useField({
      ...ariaProps,
      labelElementType: "span",
    });

    const radioOptions = props.options.map((option) => (
      <RadioOption
        key={String(option.value)}
        option={{ ...option, isDisabled: props.disabled || option.isDisabled }}
        state={state}
      />
    ));

    return (
      <Box {...radioGroupProps} color={undefined}>
        <Field
          {...props}
          label={props.label}
          labelProps={labelProps}
          assistiveTextProps={descriptionProps}
          errorMessageProps={errorMessageProps}
          labelElement="span"
        >
          <Inset spaceY={config.paddingY}>
            {(props.orientation || "vertical") === "vertical" ? (
              <Stack space={config.internalSpacing.vertical}>{radioOptions}</Stack>
            ) : (
              <Inline space={config.internalSpacing.horizontal}>{radioOptions}</Inline>
            )}
          </Inset>
        </Field>
      </Box>
    );
  };

  function RadioOption<A extends string | number | boolean>({
    option,
    state,
  }: {
    option: Option<A>;
    state: RadioGroupState;
  }) {
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useRadio(
      { ...option, value: String(option.value), children: option.label },
      state,
      ref
    );
    const { isFocusVisible, focusProps } = useFocusRing();
    const selected = state.selectedValue === String(option.value);

    return (
      <Box as="label" className={radioOption} disabled={option.isDisabled}>
        <VisuallyHidden>
          <input {...inputProps} {...focusProps} ref={ref} />
        </VisuallyHidden>
        <Columns space={config.controlLabelSpacing} alignY="center">
          <Column width="content">
            <Radio selected={selected} focused={isFocusVisible} />
          </Column>
          <Body size="medium">{option.label}</Body>
        </Columns>
      </Box>
    );
  }
}
