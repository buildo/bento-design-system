import { useTranslation } from "react-i18next";
import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { BrandColors } from "./BrandColors";
import { ThemeConfig } from "../ThemeConfigurator/ThemeConfigurator";
import { useState } from "react";
import { match } from "ts-pattern";
import { InteractiveColor } from "./InteractiveColor";
import { NeutralColor } from "./NeutralColor";
import { SemanticColors } from "./SemanticColors";

type ColorsConfig = ThemeConfig["colors"];

type Props = {
  value: ColorsConfig;
  onChange: (value: ColorsConfig) => void;
};

export function ColorsSection(props: Props) {
  const steps = [
    "brand" as const,
    "interactive" as const,
    "neutral" as const,
    "semantic" as const,
    "dataVisualization" as const,
  ];
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState<(typeof steps)[0]>("brand");
  const currentStepIndex = steps.indexOf(currentStep);

  const onNext = () => {
    setCurrentStep(steps[currentStepIndex + 1]);
  };
  const onBack = () => {
    setCurrentStep(steps[currentStepIndex - 1]);
  };

  return (
    <ConfiguratorSection
      title={t("ColorsSection.title")}
      steps={steps.map((step) => ({ label: t(`ColorsSection.Step.${step}`) }))}
      currentStep={currentStepIndex}
    >
      {match(currentStep)
        .with("brand", () => (
          <BrandColors
            value={props.value.brand}
            onChange={(value) => props.onChange({ ...props.value, brand: value })}
            onCancel={() => {}}
            onNext={onNext}
          />
        ))
        .with("interactive", () => (
          <InteractiveColor
            value={props.value.interactive}
            onChange={(value) => props.onChange({ ...props.value, interactive: value })}
            brandColors={props.value.brand}
            onBack={onBack}
            onNext={onNext}
          />
        ))
        .with("neutral", () => (
          <NeutralColor
            value={props.value.neutral}
            onChange={(neutral) => props.onChange({ ...props.value, neutral })}
            onBack={onBack}
            onNext={onNext}
          />
        ))
        .with("semantic", () => (
          <SemanticColors
            value={props.value.semantic}
            onChange={(semantic) => props.onChange({ ...props.value, semantic })}
            onBack={onBack}
            onNext={onNext}
          />
        ))
        .with("dataVisualization", () => null)
        .exhaustive()}
    </ConfiguratorSection>
  );
}
