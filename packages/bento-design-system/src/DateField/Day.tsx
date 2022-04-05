import { useDay } from "@datepicker-react/hooks";
import { useRef } from "react";
import { Box } from "../internal";
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
}) {
  if (props.isDisabled) {
    return "disabled";
  }
  if (props.type === "single") {
    return props.isStartDate ? "selected" : "default";
  } else {
    if (props.isStartDate) {
      return "selectedStart";
    } else if (props.isEndDate) {
      return "selectedEnd";
    } else if (props.isInRange) {
      return "selectedRange";
    } else if (props.isInHoverRange) {
      return "inHoverRange";
    } else {
      return "default";
    }
  }
}

export function Day(props: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { disabledDate, isWithinHoverRange, isSelected, isSelectedStartOrEnd, ...rest } = useDay({
    ...props,
    dayRef: ref,
  });

  const style = computeStyle({
    type: props.type,
    isDisabled: disabledDate,
    isStartDate: props.isStartDate(props.date),
    isEndDate: props.isEndDate(props.date),
    isInRange: isSelected,
    isInHoverRange: isWithinHoverRange,
  });

  return (
    <Box className={dayRecipe({ style })} {...rest}>
      {props.label}
    </Box>
  );
}
