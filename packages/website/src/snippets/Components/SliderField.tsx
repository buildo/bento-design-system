import * as React from "react";
import { SliderField } from "..";
import { formatMessage } from "../formatMessage";

export default function SliderFieldExample() {
  const [value, setValue] = React.useState<[number, number]>([10, 20]);
  return (
    <SliderField
      type="double"
      name="value"
      label={formatMessage("Value")}
      value={value}
      onChange={setValue}
      onBlur={() => {}}
      minValue={0}
      maxValue={100}
      step={10}
    />
  );
}
