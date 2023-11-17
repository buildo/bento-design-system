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
import { InputTokens } from "./InputTokens";
import { SectionCompleted } from "./SectionCompleted";

const steps = [
  "brand",
  "textAndIcons",
  "interactiveElements",
  "semanticElements",
  "categoricalPalettes",
  "inputs",
] as const;
type Step = (typeof steps)[number];

export function TokensSection() {
  const { theme, setTheme, completeSection } = useConfiguratorStatusContext();
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  if (completed) {
    return (
      <ConfiguratorSection title={t("Tokens.title")} endStep>
        <SectionCompleted />
      </ConfiguratorSection>
    );
  }

  return (
    <ConfiguratorSection
      title={t("Tokens.title")}
      steps={steps}
      currentStep={currentStep}
      onStepChange={(step) => setCurrentStep(step)}
      stepLabel={(step) => t(`TokensSection.Step.${step}`)}
      onCancel={() => navigate("/theme")}
      onComplete={() => {
        setCompleted(true);
        completeSection("tokens");
      }}
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
        .with("textAndIcons", () => (
          <TextAndIconsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
          />
        ))
        .with("interactiveElements", () => (
          <InteractiveElementsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
          />
        ))
        .with("semanticElements", () => (
          <SemanticElementsTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
          />
        ))
        .with("categoricalPalettes", () => (
          <CategoricalPalettesTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
          />
        ))
        .with("inputs", () => (
          <InputTokens
            tokens={theme.tokens}
            onChange={(newTokens) =>
              setTheme({ ...theme, tokens: { ...theme.tokens, ...newTokens } })
            }
          />
        ))
        .exhaustive()}
    </ConfiguratorSection>
  );
}
