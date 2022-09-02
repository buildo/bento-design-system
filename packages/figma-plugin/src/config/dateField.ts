import { elevationVariant } from "../util/elevationVariant";
import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function dateFieldConfig(): Omit<
  SimpleBentoConfig["dateField"],
  "previousMonthIcon" | "nextMonthIcon" | "monthYearSelectIcons"
> {
  const { findWithVariants } = findComponentInPage("Datepicker");

  const datePicker = findWithVariants({
    "Range presets": "True",
  });

  const day = findWithVariants({
    Status: "Enabled",
  });

  const dayLabel = findChildByName(day, "0", "TEXT");
  const monthYear = findChildByName(datePicker, "Month + Year", "FRAME");
  const monthLabel = findChildByName(monthYear, "Label", "TEXT");
  const weekdays = findChildByName(datePicker, "Weekdays", "FRAME");
  const weekDay = findChildByName(weekdays, "Day", "FRAME");
  const weekDayLabel = findChildByName(weekDay, "S", "TEXT");

  return {
    radius: datePicker.cornerRadius as number,
    padding: datePicker.verticalPadding,
    elevation: elevationVariant(datePicker),
    monthYearLabelSize: typographyVariant(monthLabel).size,
    dayOfWeekLabelSize: typographyVariant(weekDayLabel).size,
    dayHeight: day.height,
    dayWidth: day.width,
    dayRadius: day.cornerRadius as number,
    daySize: typographyVariant(dayLabel).size,
  };
}
