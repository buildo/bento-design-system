import { MonthType } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { useMemo } from "react";
import { Box, Column, Columns, Menu } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { ListProps } from "../List/List";
import { Label } from "../Typography/Label/Label";
import { selector } from "./DateField.css";

function getYears(activeDate: Date, minDate?: Date, maxDate?: Date): Date[] {
  const firstYear = new Date().getFullYear() - 100;
  return Array(200)
    .fill(0)
    .map((_, diff) => {
      const yearDate = new Date(activeDate);
      yearDate.setFullYear(firstYear + diff);
      return yearDate;
    })
    .filter(
      (year) =>
        (minDate === undefined || year.getFullYear() >= minDate.getFullYear()) &&
        (maxDate === undefined || year.getFullYear() <= maxDate.getFullYear())
    );
}

function getMonths(activeDate: Date): Date[] {
  return Array(12)
    .fill(0)
    .map((_, month) => {
      const monthDate = new Date(activeDate);
      monthDate.setMonth(month);
      return monthDate;
    });
}

type Props = {
  activeMonth: MonthType;
  onSelect: (date: Date) => void;
} & (
  | {
      datePart: "year";
      maxDate?: Date;
      minDate?: Date;
    }
  | {
      datePart: "month";
      maxDate?: never;
      minDate?: never;
    }
);

export function Selector({ datePart, activeMonth, maxDate, minDate, onSelect }: Props) {
  const config = useBentoConfig().dateField;
  const formatter = useDateFormatter(
    datePart === "month" ? { month: "long" } : { year: "numeric" }
  );

  const values =
    datePart === "month"
      ? getMonths(activeMonth.date)
      : getYears(activeMonth.date, minDate, maxDate);

  const options: ListProps["items"] = useMemo(
    () =>
      values.map((value) => {
        return {
          label: formatter.format(value),
          onPress: () => onSelect(value),
          isSelected: value.getTime() === activeMonth.date.getTime(),
        };
      }),
    [values, activeMonth, onSelect, formatter]
  );

  return (
    <Menu
      size="medium"
      trigger={(ref, triggerProps, { isOpen }) => (
        <Box ref={ref} {...triggerProps} cursor="pointer" outline="none" className={selector}>
          <Columns space={8} align="center" alignY="center">
            <Column width="content">
              <Label size={config.monthYearLabelSize} color="secondary" uppercase>
                {formatter.format(activeMonth.date)}
              </Label>
            </Column>
            <Column width="content">
              {isOpen
                ? config.monthYearSelectIcons.open({ size: 12 })
                : config.monthYearSelectIcons.close({ size: 12 })}
            </Column>
          </Columns>
        </Box>
      )}
      items={options}
      closeOnSelect
    />
  );
}
