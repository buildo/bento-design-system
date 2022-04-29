import * as React from "react";
import { DateField } from "..";

export default function ChipExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <DateField
      type="single"
      name="birth-date"
      label="Birth date"
      value={value}
      onChange={setValue}
      onBlur={() => {}}
    />
  );
}
