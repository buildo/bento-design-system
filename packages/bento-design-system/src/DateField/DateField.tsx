import { useDatePicker, useDateRangePicker } from "@react-aria/datepicker";
import { useDatePickerState, useDateRangePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { FieldProps } from "../Field/FieldProps";
import { CalendarDate, DateValue, getLocalTimeZone } from "@internationalized/date";
import { Input } from "./Input";
import { Calendar } from "./Calendar";
import { Box } from "../Box/Box";
import { Field } from "../Field/Field";
import { LocalizedString } from "../util/ConfigurableTypes";
import { RangeValue } from "@react-types/shared";
import { Inline } from "../Layout/Inline";
import { Button } from "..";

export type ShortcutProps<Value> = {
  label: LocalizedString;
  value: Value;
};
type SingleDateFieldProps = {
  type?: "single";
  shortcuts?: ShortcutProps<Date>[];
} & FieldProps<Date | null>;
type RangeDateFieldProps = {
  type: "range";
  shortcuts?: ShortcutProps<[Date, Date]>[];
} & FieldProps<[Date, Date] | null>;
type Props = (SingleDateFieldProps | RangeDateFieldProps) & {
  minDate?: Date;
  maxDate?: Date;
  shouldDisableDate?: (date: DateValue) => boolean;
  readOnly?: boolean;
};

function dateToCalendarDate(date: Date): CalendarDate {
  if (!date) return date;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function SingleDateField({ disabled, readOnly, ...props }: Extract<Props, { type?: "single" }>) {
  const internalProps = {
    ...props,
    value: props.value ? dateToCalendarDate(props.value) : props.value,
    onChange: (date: CalendarDate | null) => {
      props.onChange(date?.toDate(getLocalTimeZone()) ?? null);
    },
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: props.issues ? "invalid" : "valid",
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate,
    shouldForceLeadingZeros: true,
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

  const shortcuts = props.shortcuts && (
    <Inline space={4}>
      {props.shortcuts.map((shortcut) => (
        <Button
          key={shortcut.label}
          kind="transparent"
          hierarchy="secondary"
          size="small"
          label={shortcut.label}
          onPress={() => {
            props.onChange(shortcut.value);
            state.close();
          }}
        />
      ))}
    </Inline>
  );

  return (
    <Field
      {...props}
      disabled={disabled}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box {...groupProps} ref={ref}>
        <Input
          type="single"
          fieldProps={fieldProps}
          buttonProps={buttonProps}
          isCalendarOpen={state.isOpen}
        />
      </Box>
      {state.isOpen && (
        <Calendar
          type="single"
          {...calendarProps}
          inputRef={ref}
          onClose={state.close}
          shortcuts={shortcuts}
        />
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
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate,
    value: props.value
      ? {
          start: dateToCalendarDate(props.value[0]),
          end: dateToCalendarDate(props.value[1]),
        }
      : props.value,
    onChange: (range: RangeValue<CalendarDate>) => {
      const localTimeZone = getLocalTimeZone();
      props.onChange([range.start.toDate(localTimeZone), range.end.toDate(localTimeZone)]);
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

  const shortcuts = props.shortcuts && (
    <Inline space={4}>
      {props.shortcuts.map((shortcut) => (
        <Button
          key={shortcut.label}
          kind="transparent"
          hierarchy="secondary"
          size="small"
          label={shortcut.label}
          onPress={() => {
            props.onChange(shortcut.value);
            state.close();
          }}
        />
      ))}
    </Inline>
  );

  return (
    <Field
      {...props}
      disabled={disabled}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box {...groupProps} ref={ref}>
        <Input
          type="range"
          fieldProps={{ start: startFieldProps, end: endFieldProps }}
          buttonProps={buttonProps}
          isCalendarOpen={state.isOpen}
        />
      </Box>
      {state.isOpen && (
        <Calendar
          type="range"
          {...calendarProps}
          inputRef={ref}
          onClose={state.close}
          shortcuts={shortcuts}
        />
      )}
    </Field>
  );
}

export function DateField(props: Props) {
  return props.type === "range" ? <RangeDateField {...props} /> : <SingleDateField {...props} />;
}

export type { Props as DateFieldProps };
