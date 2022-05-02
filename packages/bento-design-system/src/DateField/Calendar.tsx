import { MonthType, useMonth } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { FunctionComponent, RefObject, useRef } from "react";
import { IconButtonProps } from "../IconButton/createIconButton";
import { Box, Stack, Tiles } from "../internal";
import { MenuProps } from "../Menu/createMenu";
import { Label } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { createPortal } from "../util/createPortal";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { createCalendarHeader } from "./CalendarHeader";
import { DateFieldConfig } from "./Config";
import { calendar, weekDay } from "./DateField.css";
import { createDay } from "./Day";

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

export function createCalendar(
  config: DateFieldConfig,
  {
    Menu,
    IconButton,
  }: {
    Menu: FunctionComponent<MenuProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  const CalendarHeader = createCalendarHeader(config, { Menu, IconButton });
  const Day = createDay(config);

  return function Calendar(props: Props) {
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
        color={undefined}
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
                <Label size={config.dayOfWeekLabelSize}>{unsafeLocalizedString(d)}</Label>
              </Box>
            ))}
            {days.map((day, index) => {
              if (typeof day === "object") {
                return <Day key={day.dayLabel} {...props} date={day.date} label={day.dayLabel} />;
              } else {
                return <Box key={`empty-${index}`} width={40} height={40} />;
              }
            })}
          </Tiles>
          {props.shortcuts}
        </Stack>
      </Box>
    );
  };
}
