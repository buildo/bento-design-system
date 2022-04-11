import { useDay } from "@datepicker-react/hooks";
import { useEffect, useRef } from "react";
import { Box } from "../internal";
import { Body } from "../Typography/Body/Body";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { CommonCalendarProps } from "./Calendar";
import { dayRecipe } from "./DateField.css";

type Props = CommonCalendarProps & {
  date: Date;
  label: string;
  type: "single" | "range";
};

function computeStyle(props: {
  type: "single" | "range";
  isInRange: boolean;
  isInHoverRange: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isDisabled: boolean;
  isFocused: boolean;
}) {
  if (props.isDisabled) {
    return "disabled";
  }
  if (props.type === "single") {
    if (props.isStartDate) {
      return "selected";
    } else if (props.isFocused) {
      return "focused";
    } else return "default";
  } else {
    if (props.isStartDate) {
      if (props.isEndDate) {
        return "selected";
      }
      return "selectedStart";
    } else if (props.isEndDate) {
      return "selectedEnd";
    } else if (props.isInRange) {
      return "selectedRange";
    } else if (props.isInHoverRange) {
      return "inHoverRange";
    } else if (props.isFocused) {
      return "focused";
    } else {
      return "default";
    }
  }
}

export function Day(props: Props) {
  const dayRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLButtonElement | null>(null);
  const {
    disabledDate,
    isWithinHoverRange,
    isSelected,
    isSelectedStartOrEnd,
    onKeyDown: _onKeyDown,
    ...rest
  } = useDay({
    ...props,
    dayRef: ref,
  });

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter") {
      rest.onClick();
    } else {
      _onKeyDown(e);
    }
  }

  const style = computeStyle({
    type: props.type,
    isDisabled: disabledDate,
    isStartDate: props.isStartDate(props.date),
    isEndDate: props.isEndDate(props.date),
    isInRange: isSelected,
    isInHoverRange: isWithinHoverRange,
    isFocused: props.isDateFocused(props.date),
  });

  useEffect(() => {
    if (
      dayRef.current &&
      props.inputRef.current &&
      props.isDateFocused(props.date) &&
      document.activeElement !== props.inputRef.current
    ) {
      dayRef.current.focus();
    }
  }, [props.isDateFocused(props.date)]);

  return (
    <Box className={dayRecipe({ style })} {...rest} onKeyDown={onKeyDown} ref={dayRef}>
      <Body size="medium" color="inherit">
        {unsafeLocalizedString(props.label)}
      </Body>
    </Box>
  );
}
