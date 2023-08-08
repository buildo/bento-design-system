import { useCalendar, useCalendarGrid, useRangeCalendar } from "@react-aria/calendar";
import {
  CalendarState,
  RangeCalendarState,
  useCalendarState,
  useRangeCalendarState,
} from "@react-stately/calendar";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { Day } from "./Day";
import { useLocale } from "@react-aria/i18n";
import { Box } from "../Box/Box";
import { calendar, calendarGrid, weekDay } from "../DateField/DateField.css";
import { useBentoConfig } from "../BentoConfigContext";
import { Label, Stack } from "..";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { CalendarHeader } from "./CalendarHeader";
import { useCreatePortal } from "../util/useCreatePortal";
import { useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { DOMAttributes, useRef } from "react";
import { mergeProps } from "@react-aria/utils";
import { AriaCalendarProps, AriaRangeCalendarProps, DateValue } from "@react-types/calendar";
import { AriaButtonProps } from "@react-types/button";
import { FocusableElement } from "@react-types/shared";

type Props = (
  | ({
      type: "single";
    } & AriaCalendarProps<DateValue>)
  | ({
      type: "range";
    } & AriaRangeCalendarProps<DateValue>)
) & {
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

function boxShadowFromElevation(config: "none" | "small" | "medium" | "large") {
  switch (config) {
    case "none":
      return "none";
    case "small":
      return "elevationSmall";
    case "medium":
      return "elevationMedium";
    case "large":
      return "elevationLarge";
  }
}

function CalendarGrid(
  props:
    | {
        type: "single";
        state: CalendarState;
      }
    | { type: "range"; state: RangeCalendarState }
) {
  const { locale } = useLocale();
  const { gridProps, weekDays } = useCalendarGrid({}, props.state);
  const config = useBentoConfig().dateField;

  const weeksInMonth = getWeeksInMonth(props.state.visibleRange.start, locale);

  return (
    <Box className={calendarGrid} {...gridProps}>
      {weekDays.map((day, index) => (
        <Box
          key={index}
          className={weekDay}
          style={{ width: config.dayWidth, height: config.dayHeight }}
        >
          <Label color="secondary" size={config.dayOfWeekLabelSize}>
            {day}
          </Label>
        </Box>
      ))}
      {[...new Array(weeksInMonth).keys()].map((weekIndex) =>
        props.state
          .getDatesInWeek(weekIndex)
          .map((date, i) => (date ? <Day {...props} key={i} date={date} /> : <td key={i} />))
      )}
    </Box>
  );
}

function SingleCalendar(props: Extract<Props, { type: "single" }>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state);
  const ref = useRef(null);

  return (
    <InternalCalendar
      type="single"
      {...calendarProps}
      prevButtonProps={prevButtonProps}
      nextButtonProps={nextButtonProps}
      state={state}
      onClose={props.onClose}
      inputRef={props.inputRef}
      calendarRef={ref}
    />
  );
}

function RangeCalendar(props: Extract<Props, { type: "range" }>) {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(props, state, ref);

  return (
    <InternalCalendar
      type="range"
      {...calendarProps}
      prevButtonProps={prevButtonProps}
      nextButtonProps={nextButtonProps}
      state={state}
      onClose={props.onClose}
      inputRef={props.inputRef}
      calendarRef={ref}
    />
  );
}

export function InternalCalendar(
  props: {
    type: "single" | "range";
    prevButtonProps: AriaButtonProps<"button">;
    nextButtonProps: AriaButtonProps<"button">;
    onClose: () => void;
    calendarRef: React.RefObject<HTMLElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    state: CalendarState | RangeCalendarState;
  } & DOMAttributes<FocusableElement>
) {
  const {
    prevButtonProps,
    nextButtonProps,
    onClose,
    inputRef,
    state,
    calendarRef,
    ...calendarProps
  } = props;
  const config = useBentoConfig().dateField;

  const createPortal = useCreatePortal();

  const { overlayProps } = useOverlay(
    {
      isOpen: true,
      isDismissable: true,
      onClose: props.onClose,
    },
    calendarRef
  );
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: props.inputRef,
    overlayRef: calendarRef,
    placement: "bottom start",
    offset: 35,
    isOpen: true,
    shouldFlip: true,
  });

  return createPortal(
    <Box
      className={calendar}
      {...getRadiusPropsFromConfig(config.radius)}
      padding={config.padding}
      boxShadow={boxShadowFromElevation(config.elevation)}
      {...calendarProps}
      {...mergeProps(overlayProps, positionProps)}
      ref={calendarRef}
    >
      <Stack space={16} align="center">
        <CalendarHeader
          prevButtonProps={prevButtonProps}
          nextButtonProps={nextButtonProps}
          focusedDate={state.focusedDate}
          onChange={state.setFocusedDate}
          minDate={state.minValue}
          maxDate={state.maxValue}
        />
        <CalendarGrid type={props.type} state={state as any} />
      </Stack>
    </Box>
  );
}

export function Calendar(props: Props) {
  if (props.type === "single") {
    return <SingleCalendar {...props} />;
  } else {
    return <RangeCalendar {...props} />;
  }
}
