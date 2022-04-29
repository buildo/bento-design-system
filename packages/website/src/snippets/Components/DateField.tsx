import * as React from "react";
import { DateField } from "..";

export default function ChipExample() {
  const [value, setValue] = React.useState(new Date());
  return <DateField label="Birth date" value={value} onChange={setValue} />;
}
