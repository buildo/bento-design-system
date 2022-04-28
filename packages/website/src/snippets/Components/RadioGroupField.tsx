import * as React from "react";
import { RadioGroupField } from "..";
import { formatMessage } from "../formatMessage";

export default function RadioGroupFieldExample() {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <RadioGroupField
      orientation="vertical"
      label={formatMessage("Your favourite color:")}
      name="favourite-color"
      value={value}
      onChange={setValue}
      onBlur={() => {}}
      options={[
        {
          value: "Green",
          label: formatMessage("Green"),
        },
        {
          value: "Blue",
          label: formatMessage("Blue"),
        },
        {
          value: "Red",
          label: formatMessage("Red"),
        },
      ]}
    />
  );
}
