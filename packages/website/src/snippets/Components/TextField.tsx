import * as React from "react";
import { TextField } from "..";

export default function TextFieldExample() {
  const [value, setValue] = React.useState("");
  return (
    <TextField
      name="name"
      label="Name"
      placeholder="Type here..."
      value={value}
      onChange={setValue}
      onBlur={() => {}}
    />
  );
}
