import { useDatePicker } from "@react-aria/datepicker";
import { useDatePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue } from "@internationalized/date";
import { Input } from "./Input";
import { Calendar } from "./Calendar";
import { Box } from "../Box/Box";
import { Field } from "../Field/Field";

type Props = {
  type?: "single";
  readOnly?: boolean;
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
  shouldDisableDate?: (date: DateValue) => boolean;
} & FieldProps<CalendarDate | null>;

export function DateField({ disabled, readOnly, ...props }: Props) {
  const internalProps = {
    ...props,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: props.issues ? "invalid" : "valid",
    minValue: props.minDate,
    maxValue: props.maxDate,
    isDateUnavailable: props.shouldDisableDate,
  } as const;
  const state = useDatePickerState(internalProps);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    // dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
  } = useDatePicker(internalProps, state, ref);

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box {...groupProps} ref={ref}>
        <Input fieldProps={fieldProps} buttonProps={buttonProps} ref={inputRef} />
      </Box>
      {state.isOpen && <Calendar {...calendarProps} inputRef={inputRef} onClose={state.close} />}
    </Field>
  );
}

export type { Props as DateFieldProps };
