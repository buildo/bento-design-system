import { useTextField } from "@react-aria/textfield";
import { InputHTMLAttributes, RefObject, useEffect, useState } from "react";
import { Box } from "../internal";
import { input } from "./DateField.css";
import { getInputValue, parseDate as _parseDate } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import InputMask from "react-input-mask";
import { DateFormatter } from "@internationalized/date";

type Props = {
  for: "startDate" | "endDate";
  currentDate: Date | null;
  inputRef: RefObject<HTMLInputElement>;
  isFocused: boolean;
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (date: Date) => void;
  disabled: boolean;
  readOnly: boolean;
  onDateSelect: (date: Date) => void;
  onDateClear: () => void;
  isOpen: boolean;
};

function getDatePattern(dateFormatter: DateFormatter): string {
  const parts = dateFormatter.formatToParts(new Date());

  return parts
    .map((part) => {
      switch (part.type) {
        case "day":
          return "dd";
        case "month":
          return "MM";
        case "year":
          return "yyyy";
        default:
          return undefined;
      }
    })
    .filter((a) => !!a)
    .join("/");
}

function parseDate(value: string, pattern: string): Date | null {
  const parsedDate = _parseDate(value, pattern, new Date());
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
  return null;
}

export function Input(props: Props) {
  const dateFormatter = useDateFormatter({ day: "2-digit", month: "2-digit", year: "numeric" });
  const datePattern = getDatePattern(dateFormatter);
  const dateMask = datePattern.replace(/[a-zA-Z]/g, "9");
  const [value, setValue] = useState("");
  function setCurrentValue() {
    return setValue(getInputValue(props.currentDate, (date) => dateFormatter.format(date), ""));
  }
  const onFocus = () => {
    if (!props.readOnly) {
      props.inputRef.current && props.inputRef.current.select();
      props.onFocus();
    }
  };
  const onBlur = () => {
    props.onBlur();
    setCurrentValue();
  };

  const { inputProps } = useTextField(
    {
      ...props,
      label: props.for,
      placeholder: datePattern.toUpperCase(),
      type: "text",
      value,
      onChange: (value) => {
        props.onClick();
        setValue(value);
        const newDate = parseDate(value, datePattern);
        if (newDate) {
          props.onChange(newDate);
        }
      },
      isDisabled: props.disabled,
      isReadOnly: props.readOnly,
      onBlur,
      onFocus,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          if (props.isOpen) {
            const date = parseDate(value, datePattern);
            if (date) {
              props.onDateSelect(date);
            } else {
              if (value === "") {
                props.onDateClear();
              } else {
                setCurrentValue();
              }
            }
          } else {
            props.onClick();
          }
        }
      },
      autoComplete: "off",
    },
    props.inputRef
  );

  useEffect(setCurrentValue, [props.currentDate]);

  return (
    <InputMask {...inputProps} mask={dateMask} maskChar="">
      {(maskedInputProps: InputHTMLAttributes<HTMLInputElement>) => {
        const { onFocus, onBlur, ...rest } = inputProps;
        return (
          <Box
            as="input"
            type="text"
            className={input}
            ref={props.inputRef}
            onClick={() => {
              if (!props.disabled && !props.readOnly) {
                props.onClick();
              }
            }}
            {...rest}
            {...maskedInputProps}
            color={undefined}
            width={undefined}
            height={undefined}
          />
        );
      }}
    </InputMask>
  );
}
