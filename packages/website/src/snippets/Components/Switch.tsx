import * as React from "react";
import { Switch } from "..";

export default function SwitchExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      label="I agree with the terms and conditions"
      name="terms-and-conditions"
      value={checked}
      onChange={setChecked}
      onBlur={() => {}}
    />
  );
}
