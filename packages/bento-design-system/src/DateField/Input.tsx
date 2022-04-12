import { useTextField } from "@react-aria/textfield";
import { InputHTMLAttributes, RefObject, useEffect, useState } from "react";
import { Box } from "../internal";
import { input } from "./DateField.css";
import { getInputValue as _getInputValue, parseDate as _parseDate } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import InputMask from "react-input-mask";

type Props = {
  for: "startDate" | "endDate";
  currentDate: Date | null;
  inputRef: RefObject<HTMLInputElement>;
  inFocus: boolean;
  onInputFocus: () => void;
  focusDate: (date: Date) => void;
  disabled: boolean;
  isDateBlocked: (date: Date) => boolean;
  onDateSelect: (date: Date) => void;
  onDateClear: () => void;
};

function parseDate(value: string): Date | null {
  // TODO(vince): how do we get the right date format for parsing?
  const parsedDate = _parseDate(value, "MM/dd/yyyy", new Date());
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
  return null;
}

export function Input(props: Props) {
  const dateFormatter = useDateFormatter({ day: "2-digit", month: "2-digit", year: "numeric" });
  const [value, setValue] = useState("");
  function setCurrentValue() {
    return setValue(_getInputValue(props.currentDate, (date) => dateFormatter.format(date), ""));
  }
  const onFocus = () => {
    props.inputRef.current && props.inputRef.current.select();
    props.onInputFocus();
  };
  const { inputProps } = useTextField(
    {
      ...props,
      label: props.for,
      type: "text",
      value,
      onChange: (value) => {
        props.onInputFocus();
        setValue(value);
        const newDate = parseDate(value);
        if (newDate) {
          props.focusDate(newDate);
        }
      },
      isDisabled: props.disabled,
      onBlur: setCurrentValue,
      onFocus,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          if (props.inFocus) {
            const date = parseDate(value);
            if (date && !props.isDateBlocked(date)) {
              props.onDateSelect(date);
            } else {
              if (value === "") {
                props.onDateClear();
              } else {
                setCurrentValue();
              }
            }
          } else {
            props.onInputFocus();
          }
        }
      },
      autoComplete: "off",
    },
    props.inputRef
  );

  useEffect(() => {
    setCurrentValue();
  }, [props.currentDate]);

  return (
    <InputMask
      {...inputProps}
      onFocus={onFocus}
      onBlur={setCurrentValue}
      mask="99/99/9999"
      maskChar=""
    >
      {(inputProps: InputHTMLAttributes<HTMLInputElement>) => {
        return (
          <Box
            as="input"
            type="text"
            className={input}
            ref={props.inputRef}
            onClick={props.onInputFocus}
            {...inputProps}
            color={undefined}
            width={undefined}
            height={undefined}
            disabled={props.disabled}
          />
        );
      }}
    </InputMask>
  );
}
