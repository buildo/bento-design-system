import { MonthType } from "@datepicker-react/hooks";
import { FunctionComponent } from "react";
import { IconButtonProps } from "../IconButton/createIconButton";
import { IconChevronLeft, IconChevronRight } from "../Icons";
import { Box, Column, Columns } from "../internal";
import { MenuProps } from "../Menu/createMenu";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { DateFieldConfig } from "./Config";
import { createSelector } from "./Selector";

type Props = {
  activeDate: MonthType;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectActiveDate: (date: Date) => void;
};

export function createCalendarHeader(
  config: DateFieldConfig,
  {
    IconButton,
    Menu,
  }: {
    IconButton: FunctionComponent<IconButtonProps>;
    Menu: FunctionComponent<MenuProps>;
  }
) {
  const Selector = createSelector(config, { Menu });
  return function CalendarHeader({
    goToPreviousMonth,
    goToNextMonth,
    selectActiveDate,
    activeDate,
  }: Props) {
    const { defaultMessages } = useDefaultMessages();
    return (
      <Box paddingBottom={16} style={{ paddingLeft: 12, paddingRight: 12 }} width="full">
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
          <Selector datePart="year" activeMonth={activeDate} onSelect={selectActiveDate} />
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
  };
}
