import { useDatePicker, useDateRangePicker } from "@react-aria/datepicker";
import { useDatePickerState, useDateRangePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { match } from "ts-pattern";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue, getLocalTimeZone } from "@internationalized/date";
import { BaseDateInput } from "./BaseDateInput";
import { Field } from "../Field/Field";
import { RangeValue } from "@react-types/shared";
import { DateProps, SingleDateProps, RangeDateProps } from "./types";
import { dateToCalendarDate } from "./utils";

type SingleDateFieldProps = SingleDateProps & FieldProps<Date | null> & DateProps;
type RangeDateFieldProps = RangeDateProps & FieldProps<[Date, Date] | null> & DateProps;

function SingleDateField(props: SingleDateFieldProps) {
  const localTimeZone = getLocalTimeZone();
  const ref = useRef(null);

  const internalProps = {
    ...props,
    value: props.value ? dateToCalendarDate(props.value) : props.value,
    onChange: (date: CalendarDate | null) => {
      props.onChange(date?.toDate(localTimeZone) ?? null);
    },
    isDisabled: props.disabled,
    isReadOnly: props.isReadOnly ?? props.readOnly,
    validationState: props.issues ? "invalid" : "valid",
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
    shouldForceLeadingZeros: true,
    onBlur: props.onBlur,
    autoFocus: props.autoFocus,
  } as const;

  const datePickerState = useDatePickerState(internalProps);
  const datePickerAria = useDatePicker(internalProps, datePickerState, ref);

  return (
    <Field
      {...props}
      disabled={props.disabled}
      labelProps={datePickerAria.labelProps}
      assistiveTextProps={datePickerAria.descriptionProps}
      errorMessageProps={datePickerAria.errorMessageProps}
    >
      <BaseDateInput
        type="single"
        value={props.value}
        onChange={props.onChange}
        shortcuts={props.shortcuts}
        datePickerAria={datePickerAria}
        datePickerState={datePickerState}
        inputRef={ref}
      />
    </Field>
  );
}

function RangeDateField(props: RangeDateFieldProps) {
  const localTimeZone = getLocalTimeZone();
  const ref = useRef(null);

  const internalProps = {
    ...props,
    value: props.value
      ? {
          start: dateToCalendarDate(props.value[0]),
          end: dateToCalendarDate(props.value[1]),
        }
      : props.value,
    onChange: (range: RangeValue<CalendarDate> | null) => {
      if (!range) {
        props.onChange(null);
      } else {
        props.onChange([range.start.toDate(localTimeZone), range.end.toDate(localTimeZone)]);
      }
    },
    isDisabled: props.disabled,
    isReadOnly: props.isReadOnly ?? props.readOnly,
    validationState: props.issues ? "invalid" : "valid",
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
    shouldForceLeadingZeros: true,
    onBlur: props.onBlur,
    autoFocus: props.autoFocus,
  } as const;

  const rangeDatePickerState = useDateRangePickerState(internalProps);
  const rangeDatePickerAria = useDateRangePicker(internalProps, rangeDatePickerState, ref);

  return (
    <Field
      {...props}
      disabled={props.disabled}
      labelProps={rangeDatePickerAria.labelProps}
      assistiveTextProps={rangeDatePickerAria.descriptionProps}
      errorMessageProps={rangeDatePickerAria.errorMessageProps}
    >
      <BaseDateInput
        type="range"
        value={props.value}
        onChange={props.onChange}
        shortcuts={props.shortcuts}
        dateRangePickerAria={rangeDatePickerAria}
        dateRangePickerState={rangeDatePickerState}
        inputRef={ref}
      />
    </Field>
  );
}

export type DateFieldProps = SingleDateFieldProps | RangeDateFieldProps;

export function DateField(props: DateFieldProps) {
  // @ts-ignore
  return match(props)
    .with({ type: "single" }, { type: undefined }, (props) => <SingleDateField {...props} />)
    .with({ type: "range" }, (props) => <RangeDateField {...props} />)
    .exhaustive();
}
