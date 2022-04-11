import { MonthType } from "@datepicker-react/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { FunctionComponent, useMemo } from "react";
import { Box, Column, Columns } from "../internal";
import { ListItemProps } from "../List/createListItem";
import { MenuProps } from "../Menu/createMenu";
import { Label } from "../Typography/Label/Label";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { DateFieldConfig } from "./Config";
import { selector } from "./DateField.css";

function getYears(activeDate: Date): Date[] {
  const currentYear = new Date().getFullYear();
  return [...Array(100).keys()].map((diff) => {
    const yearDate = new Date(activeDate);
    yearDate.setFullYear(currentYear - diff);
    return yearDate;
  });
}

function getMonths(activeDate: Date): Date[] {
  return [...Array(12).keys()].map((month) => {
    const monthDate = new Date(activeDate);
    monthDate.setMonth(month);
    return monthDate;
  });
}

export function createSelector(
  config: DateFieldConfig,
  { Menu }: { Menu: FunctionComponent<MenuProps> }
) {
  return function Selector(props: {
    datePart: "month" | "year";
    activeMonth: MonthType;
    onSelect: (date: Date) => void;
  }) {
    const formatter = useDateFormatter(
      props.datePart === "month" ? { month: "long" } : { year: "numeric" }
    );

    const values =
      props.datePart === "month"
        ? getMonths(props.activeMonth.date)
        : getYears(props.activeMonth.date);

    const options: ListItemProps[] = useMemo(
      () =>
        values.map((value) => {
          return {
            value: value,
            label: unsafeLocalizedString(formatter.format(value)),
            onPress: () => props.onSelect(value),
          };
        }),
      [values]
    );

    return (
      <Menu
        size="medium"
        trigger={(ref, triggerProps, { isOpen }) => (
          <Box ref={ref} {...triggerProps} cursor="pointer" outline="none" className={selector}>
            <Columns space={8} align="center" alignY="center">
              <Column width="content">
                <Label size={config.monthYearLabelSize} color="secondary" uppercase>
                  {unsafeLocalizedString(formatter.format(props.activeMonth.date))}
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
  };
}
