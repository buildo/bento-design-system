import * as React from "react";
import { RadioGroupField } from "..";

export default function RadioGroupFieldExample() {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <RadioGroupField
      orientation="vertical"
      label="Your favourite color:"
      name="favourite-color"
      value={value}
      onChange={setValue}
      onBlur={() => {}}
      options={[
        {
          value: "Green",
          label: "Green",
        },
        {
          value: "Blue",
          label: "Blue",
        },
        {
          value: "Red",
          label: "Red",
        },
      ]}
    />
  );
}
