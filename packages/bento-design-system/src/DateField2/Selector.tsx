import { useDateFormatter } from "@react-aria/i18n";
import { useMemo } from "react";
import { Box, Button, Menu } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { ListProps } from "../List/List";
import { CalendarDate, getLocalTimeZone, isSameYear, isSameMonth } from "@internationalized/date";

function getYears(
  activeDate: CalendarDate,
  minDate?: CalendarDate,
  maxDate?: CalendarDate
): CalendarDate[] {
  const firstYear = activeDate.set({ year: activeDate.year - 100 });
  return Array(200)
    .fill(0)
    .map((_, diff) => {
      return firstYear.add({ years: diff });
    })
    .filter(
      (year) =>
        (minDate === undefined || year.year >= minDate.year) &&
        (maxDate === undefined || year.year <= maxDate.year)
    );
}

function getMonths(activeDate: CalendarDate): CalendarDate[] {
  return Array(12)
    .fill(0)
    .map((_, month) => {
      return activeDate.set({ month: month + 1 });
    });
}

type Props = {
  activeDate: CalendarDate;
  onSelect: (date: CalendarDate) => void;
} & (
  | {
      datePart: "year";
      maxDate?: CalendarDate;
      minDate?: CalendarDate;
    }
  | {
      datePart: "month";
      maxDate?: never;
      minDate?: never;
    }
);

export function Selector({ datePart, activeDate, maxDate, minDate, onSelect }: Props) {
  const config = useBentoConfig().dateField;
  const formatter = useDateFormatter(
    datePart === "month" ? { month: "long" } : { year: "numeric" }
  );

  const values =
    datePart === "month" ? getMonths(activeDate) : getYears(activeDate, minDate, maxDate);

  const options: ListProps["items"] = useMemo(
    () =>
      values.map((value) => {
        return {
          label: formatter.format(value.toDate(getLocalTimeZone())),
          onPress: () => onSelect(value),
          isSelected: isSameMonth(value, activeDate) && isSameYear(value, activeDate),
        };
      }),
    [values, activeDate, onSelect, formatter]
  );

  return (
    <Menu
      size="medium"
      trigger={(ref, triggerProps, { isOpen, toggle }) => (
        <Box ref={ref} {...triggerProps} display="inline-block" outline="none" tabIndex={undefined}>
          <Button
            kind="transparent"
            hierarchy="secondary"
            icon={isOpen ? config.monthYearSelectIcons.open : config.monthYearSelectIcons.close}
            iconPosition="trailing"
            label={formatter.format(activeDate.toDate(getLocalTimeZone()))}
            size="small"
            onPress={toggle}
          />
        </Box>
      )}
      items={options}
      closeOnSelect
    />
  );
}
