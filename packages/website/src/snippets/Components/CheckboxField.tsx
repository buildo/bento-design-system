import * as React from "react";
import { CheckboxField } from "..";

export default function CheckboxFieldExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckboxField
      label="I agree with the terms and conditions"
      name="terms-and-conditions"
      value={checked}
      onChange={setChecked}
    />
  );
}
