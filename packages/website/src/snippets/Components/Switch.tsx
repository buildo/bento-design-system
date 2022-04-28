import * as React from "react";
import { Switch } from "..";
import { formatMessage } from "../formatMessage";

export default function SwitchExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      label={formatMessage("I agree with the terms and conditions")}
      name="terms-and-conditions"
      value={checked}
      onChange={setChecked}
      onBlur={() => {}}
    />
  );
}
