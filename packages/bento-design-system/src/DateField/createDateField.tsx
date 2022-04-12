import { FieldProps } from "../Field/FieldProps";
import { FunctionComponent, useRef, useState } from "react";
import { FieldType } from "../Field/createField";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { IconButtonProps } from "../IconButton/createIconButton";
import { MenuProps } from "../Menu/createMenu";
import {
  FocusedInput,
  useDatepicker,
  getInputValue as _getInputValue,
  parseDate as _parseDate,
  UseDatepickerProps,
} from "@datepicker-react/hooks";
import { createCalendar } from "./Calendar";
import { Box, Column, Columns } from "../internal";
import { DateFieldConfig } from "./Config";
import { InputConfig } from "../Field/Config";
import { useField } from "@react-aria/label";
import { Input } from "./Input";
import { IconChevronRight } from "../Icons";
import { dateFieldRecipe } from "./DateField.css";
import clsx from "clsx";

type SingleDateFieldProps = {
  type?: "single";
} & FieldProps<Date | null>;
type RangeDateFieldProps = {
  type: "range";
} & FieldProps<[Date | null, Date | null]>;
type Props = (SingleDateFieldProps | RangeDateFieldProps) & {
  minDate?: UseDatepickerProps["minBookingDate"];
  maxDate?: UseDatepickerProps["maxBookingDate"];
  readOnly?: boolean;
};

export function createDateField(
  config: DateFieldConfig,
  inputConfig: InputConfig,
  {
    Field,
    IconButton,
    Menu,
  }: {
    Field: FieldType;
    IconButton: FunctionComponent<IconButtonProps>;
    Menu: FunctionComponent<MenuProps>;
  }
) {
  const Calendar = createCalendar(config, { Menu, IconButton });

  return function DateField(props: Props) {
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);
    const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
    const validationState = props.readOnly ? "notSet" : props.issues ? "invalid" : "valid";

    const {
      goToDate,
      activeMonths,
      goToNextMonths,
      goToPreviousMonths,
      focusedDate,
      isDateFocused,
      isDateBlocked,
      isDateHovered,
      isDateSelected,
      isFirstOrLastSelectedDate,
      onDateFocus,
      onDateHover,
      onDateSelect: _onDateSelect,
      isStartDate,
      isEndDate,
    } = useDatepicker({
      onDatesChange: ({ startDate, endDate, focusedInput }) => {
        const newFocusedInput =
          props.type === "range" || focusedInput !== "endDate" ? focusedInput : null;
        setFocusedInput(newFocusedInput);
        if (newFocusedInput === "endDate" && endInputRef.current) endInputRef.current.focus();
        if (newFocusedInput === "startDate" && startInputRef.current) startInputRef.current.focus();

        if (props.type === "range") {
          const newValue: [Date | null, Date | null] = [startDate, endDate];
          props.onChange(newValue);
        } else {
          props.onChange(startDate);
        }
      },
      startDate: props.type === "range" ? props.value[0] : props.value,
      endDate: props.type === "range" ? props.value[1] : null,
      focusedInput,
      numberOfMonths: 1,
      minBookingDate: props.minDate,
      maxBookingDate: props.maxDate,
    });

    const onDateSelect = (date: Date) => {
      _onDateSelect(date);
      onDateFocus(date);
    };

    const { labelProps, descriptionProps, errorMessageProps } = useField({
      ...props,
    });

    const onDateClear = () => {
      if (props.type === "range") {
        if (focusedInput === "startDate") {
          props.onChange([null, props.value[1]]);
        } else {
          props.onChange([props.value[0], null]);
        }
      } else {
        props.onChange(null);
      }
    };

    const onInputFocus = (input: "startDate" | "endDate") => () => {
      if (!props.disabled) {
        setFocusedInput(input);
      }
    };

    return (
      <Field
        {...props}
        labelProps={labelProps}
        assistiveTextProps={descriptionProps}
        errorMessageProps={errorMessageProps}
      >
        <Box
          borderRadius={inputConfig.radius}
          paddingX={inputConfig.paddingX}
          paddingY={inputConfig.paddingY}
          className={clsx(
            inputRecipe({ validation: validationState || "notSet" }),
            bodyRecipe({
              color: props.disabled ? "disabled" : "default",
              weight: "default",
              size: inputConfig.fontSize,
            }),
            dateFieldRecipe({ validation: validationState || "notSet", isFocused: !!focusedInput }),
            {
              readOnly: props.readOnly,
            }
          )}
          disabled={props.disabled}
        >
          <Columns space={4} alignY="center">
            <Input
              for="startDate"
              currentDate={props.type === "range" ? props.value[0] : props.value}
              inputRef={startInputRef}
              disabled={props.disabled || false}
              readOnly={props.readOnly || false}
              focusDate={onDateFocus}
              inFocus={focusedInput === "startDate"}
              isDateBlocked={isDateBlocked}
              onDateSelect={onDateSelect}
              onDateClear={onDateClear}
              onInputFocus={onInputFocus("startDate")}
            />
            {props.type === "range" && (
              <>
                <Column width="content">
                  <IconChevronRight size={12} />
                </Column>
                <Input
                  for="endDate"
                  currentDate={props.value[1]}
                  inputRef={endInputRef}
                  disabled={props.disabled || false}
                  readOnly={props.readOnly || false}
                  focusDate={onDateFocus}
                  inFocus={focusedInput === "endDate"}
                  isDateBlocked={isDateBlocked}
                  onDateSelect={onDateSelect}
                  onDateClear={onDateClear}
                  onInputFocus={onInputFocus("endDate")}
                />
              </>
            )}
          </Columns>
        </Box>
        {!!focusedInput && (
          <Calendar
            inputRef={focusedInput === "startDate" ? startInputRef : endInputRef}
            type={props.type || "single"}
            focusedDate={focusedDate}
            isDateFocused={isDateFocused}
            isDateBlocked={isDateBlocked}
            isDateHovered={isDateHovered}
            isDateSelected={isDateSelected}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isFirstOrLastSelectedDate={isFirstOrLastSelectedDate}
            onDateFocus={onDateFocus}
            onDateHover={onDateHover}
            onDateSelect={onDateSelect}
            activeDate={activeMonths[0]}
            goToNextMonth={goToNextMonths}
            goToPreviousMonth={goToPreviousMonths}
            selectActiveDate={goToDate}
            onClose={() => {
              setFocusedInput(null);
              onDateFocus((props.type === "range" ? props.value[0] : props.value) || new Date());
              startInputRef.current && startInputRef.current.focus();
            }}
          />
        )}
      </Field>
    );
  };
}

export type { Props as DateFieldProps };
