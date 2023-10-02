import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BrandTokens } from "./BrandTokens";
import { match } from "ts-pattern";

export function TokensSection() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();

  const steps = ["brand" as const];
  const [currentStep] = useState<(typeof steps)[0]>("brand");
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <ConfiguratorSection
      title={t("Tokens.title")}
      steps={steps.map((step) => ({ label: t(`TokensSection.Step.${step}`) }))}
      currentStep={currentStepIndex}
    >
      {match(currentStep)
        .with("brand", () => (
          <BrandTokens
            tokens={theme.tokens.brandColor}
            onChange={(brandTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, brandColor: brandTokens } })
            }
          />
        ))
        .exhaustive()}
    </ConfiguratorSection>
  );
}
