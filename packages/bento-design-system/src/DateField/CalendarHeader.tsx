import { MonthType } from "@datepicker-react/hooks";
import { IconChevronLeft, IconChevronRight } from "../Icons";
import { Box, Column, Columns, IconButton } from "..";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { Selector } from "./Selector";

type Props = {
  activeDate: MonthType;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectActiveDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

export function CalendarHeader({
  goToPreviousMonth,
  goToNextMonth,
  selectActiveDate,
  activeDate,
  minDate,
  maxDate,
}: Props) {
  const { defaultMessages } = useDefaultMessages();
  return (
    <Box style={{ paddingLeft: 12, paddingRight: 12 }} width="full">
      <Columns space={4} alignY="center">
        <Column width="content">
          <IconButton
            label={defaultMessages.DateField.previousMonthLabel}
            size={16}
            kind="transparent"
            hierarchy="secondary"
            icon={IconChevronLeft}
            onPress={goToPreviousMonth}
          />
        </Column>
        <Selector datePart="month" activeMonth={activeDate} onSelect={selectActiveDate} />
        <Selector
          datePart="year"
          activeMonth={activeDate}
          onSelect={selectActiveDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Column width="content">
          <IconButton
            label={defaultMessages.DateField.nextMonthLabel}
            size={16}
            kind="transparent"
            hierarchy="secondary"
            icon={IconChevronRight}
            onPress={goToNextMonth}
          />
        </Column>
      </Columns>
    </Box>
  );
}
