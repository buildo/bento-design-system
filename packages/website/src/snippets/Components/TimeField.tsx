import * as React from "react";
import { Time, TimeField, TimeValue } from "..";

export default function DateFieldExample() {
  const [value, setValue] = React.useState<TimeValue | undefined>(new Time(17, 42) as any);
  return <TimeField name="time" label="Time" value={value} onChange={setValue} onBlur={() => {}} />;
}
