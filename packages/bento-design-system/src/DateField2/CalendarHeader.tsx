import { AriaButtonProps } from "@react-types/button";
import { Box } from "../Box/Box";
import { Column, Columns } from "../Layout/Columns";
import { IconButton } from "../";
import { defaultMessages } from "../defaultMessages/en";
import { IconChevronLeft, IconChevronRight } from "../Icons";
import { Selector } from "./Selector";
import { CalendarDate } from "@internationalized/date";
import { DateValue } from "@react-aria/calendar";

type Props = {
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
  focusedDate: CalendarDate;
  onChange: (date: CalendarDate) => void;
  minDate?: DateValue;
  maxDate?: DateValue;
};

export function CalendarHeader(props: Props) {
  return (
    <Box paddingX={8} width="full">
      <Columns space={8} alignY="center">
        <Column width="content">
          <IconButton
            label={defaultMessages.DateField.previousMonthLabel}
            size={24}
            kind="transparent"
            hierarchy="secondary"
            icon={IconChevronLeft}
            {...props.prevButtonProps}
            onPress={props.prevButtonProps.onPress!}
          />
        </Column>
        <Selector datePart="month" activeDate={props.focusedDate} onSelect={props.onChange} />
        <Selector
          datePart="year"
          activeDate={props.focusedDate}
          onSelect={props.onChange}
          minDate={props.minDate}
          maxDate={props.maxDate}
        />
        <Column width="content">
          <IconButton
            label={defaultMessages.DateField.nextMonthLabel}
            size={24}
            kind="transparent"
            hierarchy="secondary"
            icon={IconChevronRight}
            {...props.nextButtonProps}
            onPress={props.nextButtonProps.onPress!}
          />
        </Column>
      </Columns>
    </Box>
  );
}
