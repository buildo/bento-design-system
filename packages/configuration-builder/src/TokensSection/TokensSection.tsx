import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BrandTokens } from "./BrandTokens";
import { match } from "ts-pattern";
import { TextAndIconsTokens } from "./TextAndIconsTokens";
import { useNavigate } from "react-router-dom";
import { InteractiveElementsTokens } from "./InteractiveElementsTokens";
import { SemanticElementsTokens } from "./SemanticElementsTokens";
import { CategoricalPalettesTokens } from "./CategoricalPalettesTokens";

export function TokensSection() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    "brand" as const,
    "textAndIcons" as const,
    "interactiveElements" as const,
    "semanticElements" as const,
    "categoricalPalettes" as const,
  ];
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
            onNext={onNext}
            onCancel={() => navigate("/theme")}
          />
        ))
        .with("textAndIcons", () => (
          <TextAndIconsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
            onNext={onNext}
            onBack={onBack}
          />
        ))
        .with("interactiveElements", () => (
          <InteractiveElementsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
            onNext={onNext}
            onBack={onBack}
          />
        ))
        .with("semanticElements", () => (
          <SemanticElementsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
            onNext={onNext}
            onBack={onBack}
          />
        ))
        .with("categoricalPalettes", () => (
          <CategoricalPalettesTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
            onNext={onNext}
            onBack={onBack}
          />
        ))
        .exhaustive()}
    </ConfiguratorSection>
  );
}
