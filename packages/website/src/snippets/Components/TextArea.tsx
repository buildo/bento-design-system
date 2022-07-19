import * as React from "react";
import { TextArea } from "..";

export default function TextFieldExample() {
  const [value, setValue] = React.useState("");
  return (
    <TextArea
      name="description"
      label="Description"
      placeholder="Type here..."
      value={value}
      onChange={setValue}
      onBlur={() => {}}
    />
  );
}
