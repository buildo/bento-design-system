import { FieldProps } from "../Field/FieldProps";
import { useTextField } from "@react-aria/textfield";
import { FunctionComponent, useRef, useState } from "react";
import { FieldType } from "../Field/createField";
import { useDateFormatter } from "@react-aria/i18n";
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
import { Box } from "../internal";
import { DateFieldConfig } from "./Config";
import { InputConfig } from "../Field/Config";

type SingleDateFieldProps = {
  type?: "single";
} & FieldProps<Date | null>;
type RangeDateFieldProps = {
  type: "range";
} & FieldProps<[Date | null, Date | null]>;
type Props = (SingleDateFieldProps | RangeDateFieldProps) & {
  minDate?: UseDatepickerProps["minBookingDate"];
  maxDate?: UseDatepickerProps["maxBookingDate"];
};

function getInputValue(value: Props["value"], formatter: (date: Date) => string) {
  if (Array.isArray(value)) {
    return value
      .map((date) => _getInputValue(date, formatter, ""))
      .filter((a) => !!a)
      .join(" - ");
  } else {
    return _getInputValue(value, formatter, "");
  }
}

function parseDate(value: string): Date | null {
  // TODO(vince): how do we get the right date format for parsing?
  const parsedDate = _parseDate(value, "dd/MM/yyyy", new Date());
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
  return null;
}

function parseRange(value: string): [Date | null, Date | null] {
  const dates = value.split("-").map((d) => parseDate(d.trim()));
  if (dates[0] && dates[1] && dates[0] > dates[1]) {
    return [dates[0], null];
  }
  return [dates[0], dates[1]];
}

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
    const dateFormatter = useDateFormatter({ day: "2-digit", month: "2-digit", year: "numeric" });
    const inputRef = useRef<HTMLInputElement>(null);
    const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
    const [inputText, setInputText] = useState(
      getInputValue(props.value, (date) => dateFormatter.format(date))
    );
    const validationState = props.issues ? "invalid" : "valid";

    function handleInputChange(value: string) {
      if (props.type === "range") {
        const range = parseRange(value);
        if (range[1]) {
          onDateFocus(range[1]);
        } else if (range[0]) {
          onDateFocus(range[0]);
        }
      } else {
        const parsedDate = parseDate(value);
        if (parsedDate) {
          onDateFocus(parsedDate);
        }
      }
    }

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
        if (props.type === "range" || focusedInput !== "endDate") {
          setFocusedInput(focusedInput);
        } else {
          setFocusedInput(null);
        }
        if (props.type === "range") {
          const newValue: [Date | null, Date | null] = [startDate, endDate];
          props.onChange(newValue);
          setInputText(getInputValue(newValue, (date) => dateFormatter.format(date)));
        } else {
          props.onChange(startDate);
          setInputText(getInputValue(startDate, (date) => dateFormatter.format(date)));
        }
      },
      startDate: props.type === "range" ? props.value[0] : props.value,
      endDate: props.type === "range" ? props.value[1] : null,
      focusedInput,
      numberOfMonths: 1,
      minBookingDate: props.minDate,
      maxBookingDate: props.maxDate,
    });

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...props,
        type: "text",
        value: inputText,
        onChange: (value) => {
          setFocusedInput("startDate");
          setInputText(value);
          handleInputChange(value);
        },
        isDisabled: props.disabled,
      },
      inputRef
    );

    return (
      <Field
        {...props}
        labelProps={labelProps}
        assistiveTextProps={descriptionProps}
        errorMessageProps={errorMessageProps}
      >
        <Box
          as="input"
          type="text"
          ref={inputRef}
          {...inputProps}
          // NOTE: this is to please TS, since the inputProps type is very broad
          color={undefined}
          width={undefined}
          height={undefined}
          borderRadius={inputConfig.radius}
          paddingX={inputConfig.paddingX}
          paddingY={inputConfig.paddingY}
          className={[
            inputRecipe({ validation: validationState || "notSet" }),
            bodyRecipe({
              color: props.disabled ? "disabled" : "default",
              weight: "default",
              size: inputConfig.fontSize,
            }),
          ]}
          onClick={() => {
            setFocusedInput("startDate");
          }}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!!focusedInput && focusedDate) {
                onDateSelect(focusedDate);
              } else {
                setFocusedInput("startDate");
              }
            }
          }}
        />
        {!!focusedInput && (
          <Calendar
            inputRef={inputRef}
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
            }}
          />
        )}
      </Field>
    );
  };
}

export type { Props as DateFieldProps };
