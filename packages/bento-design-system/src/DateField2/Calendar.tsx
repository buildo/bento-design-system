import { useCalendar, useCalendarGrid } from "@react-aria/calendar";
import { CalendarState, useCalendarState } from "@react-stately/calendar";
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
import { useRef } from "react";
import { mergeProps } from "@react-aria/utils";
import { AriaCalendarProps, DateValue } from "@react-types/calendar";

type Props = {
  type: "single" | "range";
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
} & AriaCalendarProps<DateValue>;

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

function CalendarGrid(props: { state: CalendarState; type: "single" | "range" }) {
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
          .map((date, i) =>
            date ? (
              <Day type={props.type} key={i} state={props.state} date={date} />
            ) : (
              <td key={i} />
            )
          )
      )}
    </Box>
  );
}

export function Calendar(props: Props) {
  const config = useBentoConfig().dateField;

  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state);
  const createPortal = useCreatePortal();

  const overlayRef = useRef(null);

  const { overlayProps } = useOverlay(
    {
      isOpen: true,
      isDismissable: true,
      onClose: props.onClose,
    },
    overlayRef
  );
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: props.inputRef,
    overlayRef,
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
      ref={overlayRef}
    >
      <Stack space={16} align="center">
        <CalendarHeader
          prevButtonProps={prevButtonProps}
          nextButtonProps={nextButtonProps}
          focusedDate={state.focusedDate}
          onChange={state.setFocusedDate}
          minDate={props.minValue}
          maxDate={props.maxValue}
        />
        <CalendarGrid type={props.type} state={state} />
      </Stack>
    </Box>
  );
}
