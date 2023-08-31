import * as React from "react";
import { DateField, CalendarDate } from "..";

export default function DateFieldExample() {
  const [value, setValue] = React.useState<CalendarDate | null>(new CalendarDate(1987, 8, 31));
  return (
    <DateField
      type="single"
      name="birth-date"
      label="Birth date"
      value={value}
      onChange={setValue}
    />
  );
}
