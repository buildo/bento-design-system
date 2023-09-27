import { useTranslation } from "react-i18next";
import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { BrandColors } from "./BrandColors";
import { useState } from "react";
import { match } from "ts-pattern";
import { InteractiveColor } from "./InteractiveColor";
import { NeutralColor } from "./NeutralColor";
import { SemanticColors } from "./SemanticColors";
import { DataVizColors } from "./DataVizColors";
import { SectionCompleted } from "./SectionCompleted";
import { ThemeConfig, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";

export function ColorsSection() {
  const steps = [
    "brand" as const,
    "interactive" as const,
    "neutral" as const,
    "semantic" as const,
    "dataVisualization" as const,
  ];
  const { t } = useTranslation();
  const { theme, setTheme, completeSection } = useConfiguratorStatusContext();

  const colors = theme.colors;

  const onChange = (newValue: ThemeConfig["colors"]) => {
    setTheme({ ...theme, colors: newValue });
  };

  const [completed, setCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState<(typeof steps)[0]>("brand");
  const currentStepIndex = steps.indexOf(currentStep);

  const onNext = () => {
    setCurrentStep(steps[currentStepIndex + 1]);
  };
  const onBack = () => {
    setCurrentStep(steps[currentStepIndex - 1]);
  };

  return match(completed)
    .with(true, () => (
      <ConfiguratorSection title={t("ColorsSection.title")} endStep>
        <SectionCompleted />
      </ConfiguratorSection>
    ))
    .with(false, () => (
      <ConfiguratorSection
        key={currentStep} // refresh component to restore scroll position at every step change
        title={t("ColorsSection.title")}
        steps={steps.map((step) => ({ label: t(`ColorsSection.Step.${step}`) }))}
        currentStep={currentStepIndex}
      >
        {match(currentStep)
          .with("brand", () => (
            <BrandColors
              value={colors.brand}
              onChange={(value) => onChange({ ...colors, brand: value })}
              onCancel={() => {}}
              onNext={onNext}
            />
          ))
          .with("interactive", () => (
            <InteractiveColor
              value={theme.colors.interactive}
              onChange={(value) => onChange({ ...colors, interactive: value })}
              brandColors={colors.brand}
              onBack={onBack}
              onNext={onNext}
            />
          ))
          .with("neutral", () => (
            <NeutralColor
              value={colors.neutral}
              onChange={(neutral) => onChange({ ...colors, neutral })}
              onBack={onBack}
              onNext={onNext}
            />
          ))
          .with("semantic", () => (
            <SemanticColors
              value={colors.semantic}
              onChange={(semantic) => onChange({ ...colors, semantic })}
              onBack={onBack}
              onNext={onNext}
            />
          ))
          .with("dataVisualization", () => (
            <DataVizColors
              value={colors.dataVisualization}
              onChange={(dataVisualization) => onChange({ ...colors, dataVisualization })}
              onBack={onBack}
              onNext={() => {
                setCompleted(true);
                completeSection("colors");
              }}
            />
          ))
          .exhaustive()}
      </ConfiguratorSection>
    ))
    .exhaustive();
}
