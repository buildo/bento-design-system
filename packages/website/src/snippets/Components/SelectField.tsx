import * as React from "react";
import { SelectField } from "..";

export default function SelectFieldExample() {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <SelectField
      value={value}
      onBlur={() => {}}
      onChange={setValue}
      name="color"
      label="What's your favorite color?"
      placeholder="Select a color"
      options={[
        {
          value: 1,
          label: "Red",
          kind: "two-line",
          secondLine: "#ff0000",
        },
        {
          value: 2,
          label: "Blue",
          kind: "two-line",
          secondLine: "#0000ff",
        },
        {
          value: 3,
          label: "Green",
          kind: "two-line",
          secondLine: "#00ff00",
        },
      ]}
    />
  );
}
