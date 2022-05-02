import { FieldProps } from "../Field/FieldProps";
import { FunctionComponent, useRef, useState } from "react";
import { FieldType } from "../Field/createField";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { IconButtonProps } from "../IconButton/createIconButton";
import { MenuProps } from "../Menu/createMenu";
import { FocusedInput, useDatepicker, UseDatepickerProps } from "@datepicker-react/hooks";
import { createCalendar } from "./Calendar";
import { Box, Column, Columns, Inline } from "../internal";
import { DateFieldConfig } from "./Config";
import { InputConfig } from "../Field/Config";
import { useField } from "@react-aria/label";
import { Input } from "./Input";
import { IconMinus } from "../Icons";
import { dateFieldRecipe } from "./DateField.css";
import clsx from "clsx";
import { LocalizedString } from "../util/LocalizedString";
import { ButtonProps } from "../Button/createButton";

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
    Button,
  }: {
    Field: FieldType;
    IconButton: FunctionComponent<IconButtonProps>;
    Menu: FunctionComponent<MenuProps>;
    Button: FunctionComponent<ButtonProps>;
  }
) {
  const Calendar = createCalendar(config, { Menu, IconButton });

  return function DateField(props: Props) {
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);
    const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
      onDateSelect,
      isStartDate,
      isEndDate,
    } = useDatepicker({
      onDatesChange: ({ startDate, endDate, focusedInput }) => {
        const newFocusedInput =
          props.type === "range" || focusedInput !== "endDate" ? focusedInput : null;
        if (newFocusedInput === null) {
          setIsOpen(false);
          startInputRef.current && startInputRef.current.focus();
        }
        if (newFocusedInput === "endDate" && endInputRef.current) endInputRef.current.focus();
        if (newFocusedInput === "startDate" && startInputRef.current) startInputRef.current.focus();

        if (props.type === "range") {
          props.onChange([startDate, endDate]);
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

    const selectDate = (date: Date) => {
      if (!isDateBlocked(date)) {
        onDateSelect(date);
        onDateFocus(date);
      }
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

    const onInputFocus = (input: NonNullable<FocusedInput>) => () => {
      if (!props.disabled && !props.readOnly) {
        setIsFocused(true);
        setFocusedInput(input);
      }
    };

    const onInputClick = (input: NonNullable<FocusedInput>) => () => {
      if (!props.disabled && !props.readOnly) {
        setIsFocused(true);
        setFocusedInput(input);
        setIsOpen(true);
      }
    };

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
              if (props.type === "range") {
                const value = shortcut.value as [Date, Date];
                props.onChange(value);
                onDateFocus(value[0]);
              } else {
                const value = shortcut.value as Date;
                props.onChange(value);
                onDateFocus(value);
              }
            }}
          />
        ))}
      </Inline>
    );

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
            dateFieldRecipe({ validation: validationState || "notSet", isFocused }),
            {
              readOnly: props.readOnly,
            }
          )}
          disabled={props.disabled}
        >
          <Columns space={16} alignY="center">
            <Input
              for="startDate"
              currentDate={props.type === "range" ? props.value[0] : props.value}
              inputRef={startInputRef}
              disabled={props.disabled || false}
              readOnly={props.readOnly || false}
              onChange={onDateFocus}
              isFocused={focusedInput === "startDate"}
              onDateSelect={selectDate}
              onDateClear={onDateClear}
              onFocus={onInputFocus("startDate")}
              onClick={onInputClick("startDate")}
              onBlur={() => setIsFocused(false)}
              isOpen={isOpen}
            />
            {props.type === "range" && (
              <>
                <Column width="content">
                  <IconMinus size={12} />
                </Column>
                <Input
                  for="endDate"
                  currentDate={props.value[1]}
                  inputRef={endInputRef}
                  disabled={props.disabled || false}
                  readOnly={props.readOnly || false}
                  onChange={onDateFocus}
                  isFocused={focusedInput === "endDate"}
                  onDateSelect={selectDate}
                  onDateClear={onDateClear}
                  onFocus={onInputFocus("endDate")}
                  onClick={onInputClick("endDate")}
                  onBlur={() => setIsFocused(false)}
                  isOpen={isOpen}
                />
              </>
            )}
          </Columns>
        </Box>
        {isOpen && (
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
            onDateSelect={selectDate}
            activeDate={activeMonths[0]}
            goToNextMonth={goToNextMonths}
            goToPreviousMonth={goToPreviousMonths}
            selectActiveDate={goToDate}
            onClose={() => {
              setIsOpen(false);
              onDateFocus((props.type === "range" ? props.value[0] : props.value) || new Date());
            }}
            shortcuts={shortcuts}
          />
        )}
      </Field>
    );
  };
}

export type { Props as DateFieldProps };
