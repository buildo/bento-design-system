import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { match } from "ts-pattern";

const steps = ["fontFamily", "typographicScale"] as const;
type Step = (typeof steps)[number];

export function TypographySection() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  return (
    <ConfiguratorSection
      sectionName="typography"
      title={t("TypographySection.title")}
      steps={steps}
      currentStep={currentStep}
      onStepChange={(step) => setCurrentStep(step)}
      stepLabel={(step) => t(`TypographySection.Step.${step}`)}
      nextSection={{
        label: t("TypographySection.goToElevations"),
        href: "/theme/elevations",
      }}
    >
      {match(currentStep)
        .with("fontFamily", () => <></>)
        .with("typographicScale", () => <></>)
        .exhaustive()}
    </ConfiguratorSection>
  );
}
