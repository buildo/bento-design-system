import * as React from "react";
import { TextField } from "..";
import { formatMessage } from "../formatMessage";

export default function TextFieldExample() {
  const [value, setValue] = React.useState("");
  return (
    <TextField
      name="name"
      label={formatMessage("Name")}
      placeholder={formatMessage("Type here...")}
      value={value}
      onChange={setValue}
      onBlur={() => {}}
    />
  );
}
