import * as React from "react";
import { Stepper } from "..";

export default function StepperExample() {
  const [value, setValue] = React.useState<[number, number]>([10, 20]);
  return (
    <Stepper
      steps={[
        {
          label: "Step 1",
        },
        {
          label: "Step 2",
        },
        {
          label: "Step 3",
        },
      ]}
      currentStep={1}
    />
  );
}
