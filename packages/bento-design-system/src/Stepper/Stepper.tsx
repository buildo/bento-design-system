import { Box, Inline, Label, unsafeLocalizedString } from "..";
import { stepIconRecipe, stepRecipe } from "./Stepper.css";
import { Children } from "../util/Children";
import { useBentoConfig } from "../BentoConfigProvider";

type Step = {
  label: Children;
  key?: string | number;
};

type Props = {
  currentStep: number;
  steps: Array<Step>;
};

type StepStatus = "todo" | "inProgress" | "done";

export type { Props as StepperProps };

export function Stepper({ currentStep, steps }: Props) {
  const config = useBentoConfig().stepper;

  return (
    <Inline space={config.spaceBetweenSteps} alignY="center">
      {steps.map(({ label, key }, index) => {
        const status = index < currentStep ? "done" : index === currentStep ? "inProgress" : "todo";
        return <Step label={label} index={index} status={status} key={key ?? index} />;
      })}
    </Inline>
  );
}

export function Step({
  label,
  index,
  status,
}: {
  label: Children;
  index: number;
  status: StepStatus;
}) {
  const config = useBentoConfig().stepper;

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
  const config = useBentoConfig().stepper;

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
