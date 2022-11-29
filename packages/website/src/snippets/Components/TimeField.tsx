import * as React from "react";
import { Time, TimeField } from "..";

export default function DateFieldExample() {
  const [value, setValue] = React.useState<Time | undefined>(new Time(17, 42));
  return <TimeField name="time" label="Time" value={value} onChange={setValue} />;
}
