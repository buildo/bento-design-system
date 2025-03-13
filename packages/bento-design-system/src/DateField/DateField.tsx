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

type StandaloneProps<T> = Pick<
  FieldProps<T>,
  "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value"
>;

type SingleDateProps = { type?: "single"; shortcuts?: ShortcutProps<Date | null>[] };
type RangeDateProps = { type: "range"; shortcuts?: ShortcutProps<[Date, Date] | null>[] };

type SingleDateFieldProps = SingleDateProps & FieldProps<Date | null>;
type SingleDateStandaloneProps = SingleDateProps & StandaloneProps<Date | null>;

type RangeDateFieldProps = RangeDateProps & FieldProps<[Date, Date] | null>;
type RangeDateStandaloneProps = RangeDateProps & StandaloneProps<[Date, Date] | null>;

type DateProps = {
  minDate?: Date;
  maxDate?: Date;
  shouldDisableDate?: (date: Date) => boolean;
  readOnly?: boolean;
};

type PublicDateFieldProps = (SingleDateFieldProps | RangeDateFieldProps) & DateProps;
type PublicDateInputProps = (SingleDateStandaloneProps | RangeDateStandaloneProps) & DateProps;

type InternalDateProps =
  | ({
      isStandalone: true;
    } & PublicDateInputProps)
  | ({
      isStandalone?: false;
    } & PublicDateFieldProps);

function dateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function SingleDate({
  disabled,
  readOnly,
  ...props
}: Extract<InternalDateProps, { type?: "single" }>) {
  const localTimeZone = getLocalTimeZone();
  const internalProps = {
    ...props,
    value: props.value ? dateToCalendarDate(props.value) : props.value,
    onChange: (date: CalendarDate | null) => {
      props.onChange(date?.toDate(localTimeZone) ?? null);
    },
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: !props.isStandalone && props.issues ? "invalid" : "valid",
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
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

  const datePicker = (
    <>
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
    </>
  );

  return props.isStandalone ? (
    datePicker
  ) : (
    <Field
      {...props}
      disabled={disabled}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      {datePicker}
    </Field>
  );
}

function RangeDateField({
  disabled,
  readOnly,
  ...props
}: Extract<InternalDateProps, { type: "range" }>) {
  const localTimeZone = getLocalTimeZone();
  const internalProps = {
    ...props,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: !props.isStandalone && props.issues ? "invalid" : "valid",
    minValue: props.minDate ? dateToCalendarDate(props.minDate) : undefined,
    maxValue: props.maxDate ? dateToCalendarDate(props.maxDate) : undefined,
    isDateUnavailable: props.shouldDisableDate
      ? (date: DateValue) => props.shouldDisableDate!(date.toDate(localTimeZone))
      : undefined,
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
    shouldForceLeadingZeros: true,
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

  const datePicker = (
    <>
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
    </>
  );

  return props.isStandalone ? (
    datePicker
  ) : (
    <Field
      {...props}
      disabled={disabled}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      {datePicker}
    </Field>
  );
}

export function DateField(props: PublicDateFieldProps) {
  return props.type === "range" ? <RangeDateField {...props} /> : <SingleDate {...props} />;
}

export function DateInput(props: PublicDateInputProps) {
  return props.type === "range" ? (
    <RangeDateField {...props} isStandalone />
  ) : (
    <SingleDate {...props} isStandalone />
  );
}

export type { PublicDateFieldProps as DateFieldProps, PublicDateInputProps as DateInputProps };
