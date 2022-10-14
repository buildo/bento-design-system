import * as React from "react";
import { NumberField } from "..";

export default function NumberFieldExample() {
  const [value, setValue] = React.useState(42);
  return (
    <NumberField
      name="amount"
      label="Amount"
      placeholder="Type here..."
      value={value}
      onChange={setValue}
      onBlur={() => {}}
      kind="currency"
      currency="EUR"
    />
  );
}
