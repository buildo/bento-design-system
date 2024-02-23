import {
  Actions,
  Children,
  Headline,
  LocalizedString,
  Stack,
  Stepper,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type Props<T extends string> = (
  | {
      singleStep?: never;
      steps: readonly T[];
      stepLabel: (step: T) => LocalizedString;
      currentStep: T;
      onStepChange: (step: T) => void;
    }
  | {
      singleStep: true;
    }
) & {
  children: Children;
  onComplete: () => void;
};

export function ConfiguratorSectionSteps<T extends string>(props: Props<T>) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentStepIndex = props.singleStep ? 0 : props.steps.indexOf(props.currentStep);

  const onNext = () => {
    if (props.singleStep || currentStepIndex === props.steps.length - 1) {
      props.onComplete();
    } else {
      props.onStepChange(props.steps[currentStepIndex + 1]);
    }
  };
  const onBack = () => {
    if (!props.singleStep) {
      props.onStepChange(props.steps[currentStepIndex - 1]);
    }
  };

  return (
    <Stack space={24}>
      {!props.singleStep && (
        <Stepper
          steps={props.steps.map((step) => ({ label: props.stepLabel(step) }))}
          currentStep={currentStepIndex}
        />
      )}

      <Stack space={40}>
        {!props.singleStep && (
          <Headline size="small">{props.stepLabel(props.currentStep)}</Headline>
        )}
        {props.children}
        <Actions
          primaryAction={{
            label: t(props.singleStep ? "Confirm" : "Next"),
            onPress: onNext,
          }}
          secondaryAction={
            currentStepIndex === 0
              ? { label: t("Cancel"), onPress: () => navigate("/theme") }
              : { label: t("Back"), onPress: onBack }
          }
        />
      </Stack>
    </Stack>
  );
}
