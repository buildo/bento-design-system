import { MonthType } from "@datepicker-react/hooks";
import { FunctionComponent } from "react";
import { IconButtonProps } from "../IconButton/createIconButton";
import { IconChevronLeft, IconChevronRight } from "../Icons";
import { Box, Column, Columns } from "../internal";
import { MenuProps } from "../Menu/createMenu";
import { unsafeLocalizedString } from "../util/LocalizedString";
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
    return (
      <Box paddingBottom={16} style={{ paddingLeft: 12, paddingRight: 12 }} width="full">
        <Columns space={0}>
          <Column width="content">
            <IconButton
              label={unsafeLocalizedString("Prev month")}
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
              label={unsafeLocalizedString("Next month")}
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
