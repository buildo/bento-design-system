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
import { useNavigate } from "react-router-dom";

const steps = ["brand", "interactive", "neutral", "semantic", "dataVisualization"] as const;
type Step = (typeof steps)[number];

export function ColorsSection() {
  const { t } = useTranslation();
  const { theme, setTheme, completeSection } = useConfiguratorStatusContext();
  const navigate = useNavigate();

  const colors = theme.colors;

  const onChange = (newValue: ThemeConfig["colors"]) => {
    setTheme({ ...theme, colors: newValue });
  };

  const [completed, setCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  if (completed) {
    return (
      <ConfiguratorSection title={t("ColorsSection.title")} endStep>
        <SectionCompleted />
      </ConfiguratorSection>
    );
  }

  return (
    <ConfiguratorSection
      title={t("ColorsSection.title")}
      steps={steps}
      currentStep={currentStep}
      onStepChange={(step) => setCurrentStep(step)}
      stepLabel={(step) => t(`ColorsSection.Step.${step}`)}
      onCancel={() => navigate("/theme")}
      onComplete={() => {
        setCompleted(true);
        completeSection("colors");
      }}
    >
      {match(currentStep)
        .with("brand", () => (
          <BrandColors
            value={colors.brand}
            onChange={(value) => onChange({ ...colors, brand: value })}
          />
        ))
        .with("interactive", () => (
          <InteractiveColor
            value={theme.colors.interactive}
            onChange={(value) => onChange({ ...colors, interactive: value })}
            brandColors={colors.brand}
          />
        ))
        .with("neutral", () => (
          <NeutralColor
            value={colors.neutral}
            onChange={(neutral) => onChange({ ...colors, neutral })}
          />
        ))
        .with("semantic", () => (
          <SemanticColors
            value={colors.semantic}
            onChange={(semantic) => onChange({ ...colors, semantic })}
          />
        ))
        .with("dataVisualization", () => (
          <DataVizColors
            value={colors.dataVisualization}
            onChange={(dataVisualization) => onChange({ ...colors, dataVisualization })}
          />
        ))
        .exhaustive()}
    </ConfiguratorSection>
  );
}
