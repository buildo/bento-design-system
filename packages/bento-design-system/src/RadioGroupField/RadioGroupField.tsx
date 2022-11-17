import { Body, LocalizedString, Box, Column, Columns, Inline, Stack, Field } from "..";
import { FieldProps } from "../Field/FieldProps";
import { RadioGroupState, useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { AriaRadioGroupProps } from "@react-types/radio";
import { useField } from "@react-aria/label";
import { radioOption } from "./RadioGroupField.css";
import { useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { Radio } from "./Radio";
import { useBentoConfig } from "../BentoConfigContext";

export type RadioOption<A> = {
  value: A;
  label: LocalizedString;
  isDisabled?: boolean;
};

type Props<A> = FieldProps<A | undefined, A> & {
  name: string;
  options: Array<RadioOption<A>>;
  orientation?: "vertical" | "horizontal";
};

export function RadioGroupField<A extends string | number | boolean>(props: Props<A>) {
  const config = useBentoConfig().selectionControl;
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

  const paddingY = (config.group.internalSpacing.vertical as number) / 2;

  return (
    <FocusScope autoFocus={props.autoFocus}>
      <Box {...radioGroupProps}>
        <Field
          {...props}
          label={props.label}
          labelProps={labelProps}
          assistiveTextProps={descriptionProps}
          errorMessageProps={errorMessageProps}
          labelElement="span"
        >
          <Box
            style={{
              paddingTop: paddingY,
              paddingBottom: paddingY,
            }}
          >
            {(props.orientation ?? "vertical") === "vertical" ? (
              <Stack space={config.group.internalSpacing.vertical}>{radioOptions}</Stack>
            ) : (
              <Inline space={config.group.internalSpacing.horizontal}>{radioOptions}</Inline>
            )}
          </Box>
        </Field>
      </Box>
    </FocusScope>
  );
}

function RadioOption<A extends string | number | boolean>({
  option,
  state,
}: {
  option: RadioOption<A>;
  state: RadioGroupState;
}) {
  const config = useBentoConfig().selectionControl;
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
      <Columns space={config.element.controlLabelSpacing}>
        <Column width="content">
          <Radio selected={selected} focused={isFocusVisible} />
        </Column>
        <Box style={{ paddingTop: config.element.labelPaddingTop }}>
          <Body size={config.element.labelSize} color={option.isDisabled ? "disabled" : "primary"}>
            {option.label}
          </Body>
        </Box>
      </Columns>
    </Box>
  );
}

export type { Props as RadioGroupFieldProps };
