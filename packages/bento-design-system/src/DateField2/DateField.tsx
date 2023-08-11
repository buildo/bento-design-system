import { useDatePicker, useDateRangePicker } from "@react-aria/datepicker";
import { useDatePickerState, useDateRangePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue } from "@internationalized/date";
import { Input } from "./Input";
import { Calendar } from "./Calendar";
import { Box } from "../Box/Box";
import { Field } from "../Field/Field";
import { LocalizedString } from "../util/ConfigurableTypes";
import { RangeValue } from "@react-types/shared";

export type ShortcutProps<Value> = {
  label: LocalizedString;
  value: Value;
};
type SingleDateFieldProps = {
  type?: "single";
  shortcuts?: ShortcutProps<CalendarDate>[];
} & FieldProps<CalendarDate | null>;
type RangeDateFieldProps = {
  type: "range";
  shortcuts?: ShortcutProps<[CalendarDate, CalendarDate]>[];
} & FieldProps<[CalendarDate, CalendarDate] | null>;
type Props = (SingleDateFieldProps | RangeDateFieldProps) & {
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
  shouldDisableDate?: (date: DateValue) => boolean;
  readOnly?: boolean;
};

function SingleDateField({ disabled, readOnly, ...props }: Extract<Props, { type?: "single" }>) {
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
        <Input type="single" fieldProps={fieldProps} buttonProps={buttonProps} ref={ref} />
      </Box>
      {state.isOpen && (
        <Calendar type="single" {...calendarProps} inputRef={ref} onClose={state.close} />
      )}
    </Field>
  );
}

function RangeDateField({ disabled, readOnly, ...props }: Extract<Props, { type: "range" }>) {
  const internalProps = {
    ...props,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: props.issues ? "invalid" : "valid",
    minValue: props.minDate,
    maxValue: props.maxDate,
    isDateUnavailable: props.shouldDisableDate,
    value: props.value
      ? {
          start: props.value[0],
          end: props.value[1],
        }
      : props.value,
    onChange: (range: RangeValue<CalendarDate>) => {
      props.onChange([range.start, range.end]);
    },
  } as const;
  const state = useDateRangePickerState(internalProps);
  const ref = useRef(null);
  const {
    groupProps,
    labelProps,
    buttonProps,
    descriptionProps,
    errorMessageProps,
    calendarProps,
    startFieldProps,
    endFieldProps,
  } = useDateRangePicker(internalProps, state, ref);

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box {...groupProps} ref={ref}>
        <Input
          type="range"
          fieldProps={{ start: startFieldProps, end: endFieldProps }}
          buttonProps={buttonProps}
          ref={ref}
        />
      </Box>
      {state.isOpen && (
        <Calendar type="range" {...calendarProps} inputRef={ref} onClose={state.close} />
      )}
    </Field>
  );
}

export function DateField(props: Props) {
  return props.type === "range" ? <RangeDateField {...props} /> : <SingleDateField {...props} />;
}

export type { Props as DateFieldProps };
