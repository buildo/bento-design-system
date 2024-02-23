import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BrandTokens } from "./BrandTokens";
import { match } from "ts-pattern";
import { TextAndIconsTokens } from "./TextAndIconsTokens";
import { InteractiveElementsTokens } from "./InteractiveElementsTokens";
import { SemanticElementsTokens } from "./SemanticElementsTokens";
import { CategoricalPalettesTokens } from "./CategoricalPalettesTokens";
import { InputTokens } from "./InputTokens";
import { OtherTokens } from "./OtherTokens";

const steps = [
  "brand",
  "textAndIcons",
  "interactiveElements",
  "semanticElements",
  "categoricalPalettes",
  "inputs",
  "other",
] as const;
type Step = (typeof steps)[number];

export function TokensSection() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  return (
    <ConfiguratorSection
      sectionName="tokens"
      title={t("Tokens.title")}
      steps={steps}
      currentStep={currentStep}
      onStepChange={(step) => setCurrentStep(step)}
      stepLabel={(step) => t(`TokensSection.Step.${step}`)}
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
        .with("other", () => (
          <OtherTokens
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
