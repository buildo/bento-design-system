import * as React from "react";
import { DateField } from "..";

export default function DateFieldExample() {
  const [value, setValue] = React.useState<Date | null>(new Date(1987, 8, 31));
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
