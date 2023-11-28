import { useLocale } from "@react-aria/i18n";
import { useNumberField } from "@react-aria/numberfield";
import { NumberFieldStateOptions, useNumberFieldState } from "@react-stately/numberfield";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { BaseNumberProps, FormatProps } from "./types";
import { useFormatOptions } from "./formatOptions";
import { Field } from "../Field/Field";
import { BaseNumberInput } from "./BaseNumberInput";

type Props = FieldProps<number | undefined, number> &
  BaseNumberProps &
  FormatProps &
  Pick<NumberFieldStateOptions, "minValue" | "maxValue" | "step">;

export function NumberField(props: Props) {
  const { locale } = useLocale();
  const formatOptions = useFormatOptions(props);
  const state = useNumberFieldState({ ...props, locale, formatOptions });
  const inputRef = useRef<HTMLInputElement>(null);

  const validationState = props.issues ? "invalid" : "valid";

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useNumberField(
    {
      ...props,
      errorMessage: props.issues,
      description: props.assistiveText,
      isDisabled: props.disabled,
      isReadOnly: props.isReadOnly,
      validationState,
      formatOptions,
    },
    state,
    inputRef
  );

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <BaseNumberInput
        inputProps={inputProps}
        inputRef={inputRef}
        validationState={validationState}
        {...props}
      />
    </Field>
  );
}

export type { Props as NumberFieldProps };
