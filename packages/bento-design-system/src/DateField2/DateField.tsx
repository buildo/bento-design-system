import { useDatePicker } from "@react-aria/datepicker";
import { useDatePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue } from "@internationalized/date";
import { Input } from "./Input";
import { Calendar } from "./Calendar";
import { Box } from "../Box/Box";
import { Field } from "../Field/Field";
import { LocalizedString } from "../util/ConfigurableTypes";

export type ShortcutProps<Value> = {
  label: LocalizedString;
  value: Value;
};
type SingleDateFieldProps = {
  type?: "single";
  shortcuts?: ShortcutProps<CalendarDate>[];
} & FieldProps<CalendarDate | null>;
type Props = SingleDateFieldProps & {
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
  shouldDisableDate?: (date: DateValue) => boolean;
  readOnly?: boolean;
};

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
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps,
    calendarProps,
  } = useDatePicker(internalProps, state, ref);

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box {...groupProps} ref={ref}>
        <Input fieldProps={fieldProps} buttonProps={buttonProps} ref={ref} />
      </Box>
      {state.isOpen && (
        <Calendar
          type={props.type ?? "single"}
          {...calendarProps}
          inputRef={ref}
          onClose={state.close}
        />
      )}
    </Field>
  );
}

export type { Props as DateFieldProps };
