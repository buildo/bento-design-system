import { useTranslation } from "react-i18next";
import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { BrandColors } from "./BrandColors";
import { ThemeConfig } from "../ThemeConfigurator/ThemeConfigurator";
import { useState } from "react";
import { match } from "ts-pattern";
import { InteractiveColor } from "./InteractiveColor";

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

  return (
    <ConfiguratorSection
      title={t("ColorsSection.title")}
      steps={steps.map((step) => ({ label: t(`ColorsSection.Step.${step}`) }))}
      currentStep={steps.indexOf(currentStep)}
    >
      {match(currentStep)
        .with("brand", () => (
          <BrandColors
            value={props.value.brand}
            onChange={(value) => props.onChange({ ...props.value, brand: value })}
            onCancel={() => {}}
            onNext={() => setCurrentStep("interactive")}
          />
        ))
        .with("interactive", () => (
          <InteractiveColor
            value={props.value.interactive}
            onChange={(value) => props.onChange({ ...props.value, interactive: value })}
            brandColors={props.value.brand}
            onBack={() => setCurrentStep("brand")}
            onNext={() => setCurrentStep("neutral")}
          />
        ))
        .with("neutral", "semantic", "dataVisualization", () => null)
        .exhaustive()}
    </ConfiguratorSection>
  );
}
