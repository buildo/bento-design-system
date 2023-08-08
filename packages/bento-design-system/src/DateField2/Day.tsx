import { useCalendarCell } from "@react-aria/calendar";
import { useRef } from "react";
import { CalendarState, RangeCalendarState } from "@react-stately/calendar";
import { CalendarDate, isToday, getLocalTimeZone } from "@internationalized/date";
import { useBentoConfig } from "../BentoConfigContext";
import { Box } from "../Box/Box";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  bottomLeftRadius,
  bottomRightRadius,
  dayRecipe,
  topLeftRadius,
  topRightRadius,
} from "../DateField/DateField.css";
import { Body } from "../Typography/Body/Body";
import { mergeProps } from "@react-aria/utils";

type Props = (
  | {
      type: "single";
      state: CalendarState;
    }
  | {
      type: "range";
      state: RangeCalendarState;
    }
) & {
  date: CalendarDate;
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
  const config = useBentoConfig().dateField;
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isInvalid,
    isFocused,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date: props.date }, props.state, ref);

  const style = computeStyle({
    type: props.type,
    isDisabled: isDisabled || isUnavailable || isInvalid,
    isStartDate:
      props.type === "single"
        ? isSelected
        : (isSelected && props.state.value && props.date.compare(props.state.value.start) === 0) ||
          (props.state.highlightedRange &&
            props.date.compare(props.state.highlightedRange.start) === 0),
    isEndDate:
      props.type === "single"
        ? isSelected
        : (isSelected && props.state.value && props.date.compare(props.state.value.end) === 0) ||
          (props.state.highlightedRange &&
            props.date.compare(props.state.highlightedRange.end) === 0),
    isInRange:
      props.type === "single"
        ? isSelected
        : isSelected &&
          props.state.value &&
          props.date.compare(props.state.value.end) < 0 &&
          props.date.compare(props.state.value.start) > 0,
    isInHoverRange:
      props.type === "single"
        ? isSelected
        : props.state.highlightedRange &&
          props.date.compare(props.state.highlightedRange.start) > 0 &&
          props.date.compare(props.state.highlightedRange.end) < 0,
    isFocused: isFocused,
  });

  return (
    <Box
      as="td"
      {...mergeProps(cellProps, buttonProps)}
      ref={ref}
      className={dayRecipe({ style })}
      style={{
        ...assignInlineVars(
          typeof config.dayRadius === "object"
            ? {
                [topLeftRadius]: `${config.dayRadius.topLeft}px`,
                [topRightRadius]: `${config.dayRadius.topRight}px`,
                [bottomLeftRadius]: `${config.dayRadius.bottomLeft}px`,
                [bottomRightRadius]: `${config.dayRadius.bottomRight}px`,
              }
            : {
                [topLeftRadius]: `${config.dayRadius}px`,
                [topRightRadius]: `${config.dayRadius}px`,
                [bottomLeftRadius]: `${config.dayRadius}px`,
                [bottomRightRadius]: `${config.dayRadius}px`,
              }
        ),
        width: config.dayWidth,
        height: config.dayHeight,
      }}
    >
      {!isOutsideVisibleRange && (
        <Body
          size={config.daySize}
          color="inherit"
          weight={isToday(props.date, getLocalTimeZone()) ? "strong" : "default"}
        >
          {formattedDate}
        </Body>
      )}
    </Box>
  );
}
