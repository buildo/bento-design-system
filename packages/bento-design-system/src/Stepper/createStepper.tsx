import { Box, Inline } from "../internal";
import { Label, unsafeLocalizedString } from "..";
import { stepIconRecipe, stepRecipe } from "./Stepper.css";
import { StepperConfig } from "./Config";
import { Children } from "../util/Children";

type Step = {
  label: Children;
};

type Props = {
  currentStep: number;
  steps: Array<Step>;
};

type StepStatus = "todo" | "inProgress" | "done";

export type { Props as StepperProps };

export function createStepper(config: StepperConfig) {
  function Stepper({ currentStep, steps }: Props) {
    return (
      <Inline space={config.spaceBetweenSteps} alignY="center">
        {steps.map(({ label }, index) => {
          const status =
            index < currentStep ? "done" : index === currentStep ? "inProgress" : "todo";
          return <Step label={label} index={index} status={status} key={index} />;
        })}
      </Inline>
    );
  }

  function Step({ label, index, status }: { label: Children; index: number; status: StepStatus }) {
    return (
      <Box className={stepRecipe({ status })}>
        <Inline space={config.internalSpacing} alignY="center">
          <StepIcon status={status} index={index} />
          <Label size={config.labelSize} uppercase={config.labelUppercase}>
            {label}
          </Label>
        </Inline>
      </Box>
    );
  }

  function StepIcon({ status, index }: { status: StepStatus; index: number }) {
    return (
      <Box className={stepIconRecipe({ status })}>
        {status === "done" ? (
          config.doneIcon({ size: 24 })
        ) : (
          <Label size={config.numberSize}>{unsafeLocalizedString(index + 1)}</Label>
        )}
      </Box>
    );
  }

  return { Stepper, Step };
}
