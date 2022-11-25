import * as React from "react";
import { SliderField } from "..";

export default function SliderFieldExample() {
  const [value, setValue] = React.useState<[number, number]>([10, 20]);
  return (
    <SliderField
      type="double"
      name="value"
      label="Value"
      value={value}
      onChange={setValue}
      minValue={0}
      maxValue={100}
      step={10}
    />
  );
}
