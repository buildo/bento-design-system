import { MonthType, useMonth } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { RefObject, useRef } from "react";
import { Box, Stack, Tiles } from "..";
import { Label } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { createPortal } from "../util/createPortal";
import { CalendarHeader } from "./CalendarHeader";
import { calendar, weekDay } from "./DateField.css";
import { Day } from "./Day";
import { useBentoConfig } from "../BentoConfigContext";

export type CommonCalendarProps = {
  inputRef: RefObject<HTMLInputElement>;
  focusedDate: Date | null;
  onDateFocus(date: Date): void;
  onDateSelect(date: Date): void;
  onDateHover(date: Date): void;
  isStartDate(date: Date): boolean;
  isEndDate(date: Date): boolean;
  isDateFocused(date: Date): boolean;
  isDateSelected(date: Date): boolean;
  isDateHovered(date: Date): boolean;
  isDateBlocked(date: Date): boolean;
  isFirstOrLastSelectedDate(date: Date): boolean;
};

type Props = CommonCalendarProps & {
  type: "single" | "range";
  activeDate: MonthType;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectActiveDate: (date: Date) => void;
  onClose: () => void;
  shortcuts?: Children;
  minDate?: Date;
  maxDate?: Date;
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

export function Calendar(props: Props) {
  const config = useBentoConfig().dateField;
  const weekdayFormatter = useDateFormatter({
    weekday: "narrow",
  });
  const overlayRef = useRef(null);

  const { days, weekdayLabels } = useMonth({
    year: props.activeDate.year,
    month: props.activeDate.month,
    weekdayLabelFormat: (date) => weekdayFormatter.format(date),
  });

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
      borderRadius={config.radius}
      padding={config.padding}
      boxShadow={boxShadowFromElevation(config.elevation)}
      {...mergeProps(overlayProps, positionProps)}
      ref={overlayRef}
    >
      <Stack space={16} align="center">
        <CalendarHeader {...props} />
        <Tiles columns={7} space={0}>
          {weekdayLabels.map((d, index) => (
            <Box
              className={weekDay}
              width={config.dayWidth}
              height={config.dayHeight}
              key={`${d}-${index}`}
            >
              <Label size={config.dayOfWeekLabelSize}>{d}</Label>
            </Box>
          ))}
          {days.map((day, index) => {
            if (typeof day === "object") {
              return <Day key={day.dayLabel} {...props} date={day.date} label={day.dayLabel} />;
            } else {
              return (
                <Box key={`empty-${index}`} width={config.dayWidth} height={config.dayHeight} />
              );
            }
          })}
        </Tiles>
        <Box style={{ maxWidth: config.dayWidth * 7 }}>{props.shortcuts}</Box>
      </Stack>
    </Box>
  );
}
