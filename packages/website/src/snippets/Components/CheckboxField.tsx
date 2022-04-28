import * as React from "react";
import { CheckboxField } from "..";
import { formatMessage } from "../formatMessage";

export default function CheckboxFieldExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckboxField
      label={formatMessage("I agree with the terms and conditions")}
      name="terms-and-conditions"
      value={checked}
      onChange={setChecked}
      onBlur={() => {}}
    />
  );
}
