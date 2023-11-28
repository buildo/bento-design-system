import { NumberFieldStateOptions, useNumberFieldState } from "@react-stately/numberfield";
import { FieldProps } from "../Field/FieldProps";
import { BaseNumberProps, FormatProps } from "./types";
import { useLocale } from "@react-aria/i18n";
import { useFormatOptions } from "./formatOptions";
import { HTMLAttributes, useRef } from "react";
import { useNumberField } from "@react-aria/numberfield";
import { BaseNumberInput } from "./BaseNumberInput";
import { AtLeast } from "../util/AtLeast";

type Props = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> &
  Pick<
    FieldProps<number | undefined, number>,
    "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value"
  > &
  BaseNumberProps & {
    validationState: "valid" | "invalid";
  } & FormatProps &
  Pick<NumberFieldStateOptions, "minValue" | "maxValue" | "step">;

export function NumberInput(props: Props) {
  const { locale } = useLocale();
  const formatOptions = useFormatOptions(props);
  const state = useNumberFieldState({ ...props, locale, formatOptions });
  const inputRef = useRef<HTMLInputElement>(null);

  const { inputProps } = useNumberField(
    {
      ...props,
      isDisabled: props.disabled,
      formatOptions,
    },
    state,
    inputRef
  );

  return <BaseNumberInput inputProps={inputProps} inputRef={inputRef} {...props} />;
}

export type { Props as NumberInputProps };
