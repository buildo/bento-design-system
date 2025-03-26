import { DatePickerAria, DateRangePickerAria } from "@react-aria/datepicker";
import { DatePickerState, DateRangePickerState } from "@react-stately/datepicker";
import React from "react";
import { match } from "ts-pattern";
import { Input } from "./Input";
import { Calendar } from "./Calendar";
import { Box } from "../Box/Box";
import { Inline } from "../Layout/Inline";
import { Button, FieldProps } from "..";
import { SingleDateProps, RangeDateProps } from "./types";

type BaseSingleDateProps = SingleDateProps & {
  datePickerAria: DatePickerAria;
  datePickerState: DatePickerState;
} & Pick<FieldProps<Date | null>, "onChange" | "value">;

type BaseRangeDateProps = RangeDateProps & {
  dateRangePickerAria: DateRangePickerAria;
  dateRangePickerState: DateRangePickerState;
} & Pick<FieldProps<[Date, Date] | null>, "onChange" | "value">;

type Props = (BaseSingleDateProps | BaseRangeDateProps) & {
  inputRef: React.RefObject<HTMLInputElement>;
};

function BaseSingleDateInput(props: Extract<Props, { type?: "single" }>) {
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
            props.datePickerState.close();
          }}
        />
      ))}
    </Inline>
  );

  return (
    <>
      <Box {...props.datePickerAria.groupProps} ref={props.inputRef}>
        <Input
          type="single"
          fieldProps={props.datePickerAria.fieldProps}
          buttonProps={props.datePickerAria.buttonProps}
          isCalendarOpen={props.datePickerState.isOpen}
        />
      </Box>
      {props.datePickerState.isOpen && (
        <Calendar
          type="single"
          {...props.datePickerAria.calendarProps}
          inputRef={props.inputRef}
          onClose={props.datePickerState.close}
          shortcuts={shortcuts}
        />
      )}
    </>
  );
}

function BaseRangeDateInput(props: Extract<Props, { type: "range" }>) {
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
            props.dateRangePickerState.close();
          }}
        />
      ))}
    </Inline>
  );

  return (
    <>
      <Box {...props.dateRangePickerAria.groupProps} ref={props.inputRef}>
        <Input
          type="range"
          fieldProps={{
            start: props.dateRangePickerAria.startFieldProps,
            end: props.dateRangePickerAria.endFieldProps,
          }}
          buttonProps={props.dateRangePickerAria.buttonProps}
          isCalendarOpen={props.dateRangePickerState.isOpen}
        />
      </Box>
      {props.dateRangePickerState.isOpen && (
        <Calendar
          type="range"
          {...props.dateRangePickerAria.calendarProps}
          inputRef={props.inputRef}
          onClose={props.dateRangePickerState.close}
          shortcuts={shortcuts}
        />
      )}
    </>
  );
}

export function BaseDateInput(props: Props) {
  return match(props)
    .with({ type: "single" }, { type: undefined }, (props) => <BaseSingleDateInput {...props} />)
    .with({ type: "range" }, (props) => <BaseRangeDateInput {...props} />)
    .exhaustive();
}
