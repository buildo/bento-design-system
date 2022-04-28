import * as React from "react";
import { Stepper } from "..";
import { formatMessage } from "../formatMessage";

export default function StepperExample() {
  const [value, setValue] = React.useState<[number, number]>([10, 20]);
  return (
    <Stepper
      steps={[
        {
          label: formatMessage("Step 1"),
        },
        {
          label: formatMessage("Step 2"),
        },
        {
          label: formatMessage("Step 3"),
        },
      ]}
      currentStep={1}
    />
  );
}
