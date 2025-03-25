import { useDatePicker, useDateRangePicker } from "@react-aria/datepicker";
import { useDatePickerState, useDateRangePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { match } from "ts-pattern";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue, getLocalTimeZone } from "@internationalized/date";
import { BaseDateInput } from "./BaseDateInput";
import { RangeValue } from "@react-types/shared";
import { DateProps, ShortcutProps } from "./types";

type StandaloneProps<T> = Pick<
  FieldProps<T>,
  "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value"
>;

type SingleDateProps = {
  type?: "single";
  shortcuts?: ShortcutProps<Date | null>[];
};

type RangeDateProps = {
  type: "range";
  shortcuts?: ShortcutProps<[Date, Date] | null>[];
};

type SingleDateInputProps = SingleDateProps &
  StandaloneProps<Date | null> &
  DateProps & { validationState: "valid" | "invalid" };

type RangeDateInputProps = RangeDateProps &
  StandaloneProps<[Date, Date] | null> &
  DateProps & { validationState: "valid" | "invalid" };

function dateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function SingleDateInput(props: SingleDateInputProps) {
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
    validationState: props.validationState,
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
    shouldForceLeadingZeros: true,
  } as const;

  const datePickerState = useDatePickerState(internalProps);
  const datePickerAria = useDatePicker(internalProps, datePickerState, ref);

  return (
    <BaseDateInput
      type="single"
      value={props.value}
      onChange={props.onChange}
      shortcuts={props.shortcuts}
      datePickerAria={datePickerAria}
      datePickerState={datePickerState}
      inputRef={ref}
    />
  );
}

function RangeDateInput(props: RangeDateInputProps) {
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
    validationState: props.validationState,
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
    shouldForceLeadingZeros: true,
  } as const;

  const rangeDatePickerState = useDateRangePickerState(internalProps);
  const rangeDatePickerAria = useDateRangePicker(internalProps, rangeDatePickerState, ref);

  return (
    <BaseDateInput
      type="range"
      value={props.value}
      onChange={props.onChange}
      shortcuts={props.shortcuts}
      dateRangePickerAria={rangeDatePickerAria}
      dateRangePickerState={rangeDatePickerState}
      inputRef={ref}
    />
  );
}

export function DateInput(props: SingleDateInputProps | RangeDateInputProps) {
  return match(props)
    .with({ type: "single" }, { type: undefined }, (props) => <SingleDateInput {...props} />)
    .with({ type: "range" }, (props) => <RangeDateInput {...props} />)
    .exhaustive();
}
