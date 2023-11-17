import {
  Actions,
  Children,
  Headline,
  LocalizedString,
  Stack,
  Stepper,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";

export type Props<T extends string> = {
  steps: readonly T[];
  stepLabel: (step: T) => LocalizedString;
  currentStep: T;
  onStepChange: (step: T) => void;
  onComplete: () => void;
  onCancel: () => void;
  children: Children;
};

export function ConfiguratorSectionSteps<T extends string>(props: Props<T>) {
  const { t } = useTranslation();
  const currentStepIndex = props.steps.indexOf(props.currentStep);

  const onNext = () => {
    props.onStepChange(props.steps[currentStepIndex + 1]);
  };
  const onBack = () => {
    props.onStepChange(props.steps[currentStepIndex - 1]);
  };

  return (
    <Stack space={24}>
      <Stepper
        steps={props.steps.map((step) => ({ label: props.stepLabel(step) }))}
        currentStep={currentStepIndex}
      />

      <Stack space={40}>
        <Headline size="small">{props.stepLabel(props.currentStep)}</Headline>
        {props.children}
        <Actions
          primaryAction={{
            label: t("Next"),
            onPress: currentStepIndex === props.steps.length - 1 ? props.onComplete : onNext,
          }}
          secondaryAction={
            currentStepIndex === 0
              ? { label: t("Cancel"), onPress: props.onCancel }
              : { label: t("Back"), onPress: onBack }
          }
        />
      </Stack>
    </Stack>
  );
}
