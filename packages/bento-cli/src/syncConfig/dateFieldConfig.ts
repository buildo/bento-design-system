import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function dateFieldConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["dateField"],
  "previousMonthIcon" | "nextMonthIcon" | "monthYearSelectIcons"
> {
  const { findWithVariants } = ctx.findComponentsInPage("Datepicker");

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
    radius: datePicker.cornerRadius,
    padding: datePicker.paddingTop,
    elevation: ctx.elevationVariant(datePicker),
    monthYearLabelSize: ctx.typographyVariant(monthLabel).size,
    dayOfWeekLabelSize: ctx.typographyVariant(weekDayLabel).size,
    dayHeight: day.absoluteBoundingBox.height,
    dayWidth: day.absoluteBoundingBox.width,
    dayRadius: day.cornerRadius,
    daySize: ctx.typographyVariant(dayLabel).size,
  };
}
