import { useTranslation } from "react-i18next";
import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { BrandColors } from "./BrandColors";
import { ThemeConfig } from "../ThemeConfigurator/ThemeConfigurator";

type ColorsConfig = ThemeConfig["colors"];

type Props = {
  value: ColorsConfig;
  onChange: (value: ColorsConfig) => void;
};

export function ColorsSection(props: Props) {
  const { t } = useTranslation();

  return (
    <ConfiguratorSection
      title={t("ColorsSection.title")}
      steps={[
        { label: t("ColorsSection.Step.brand") },
        { label: t("ColorsSection.Step.interactive") },
        { label: t("ColorsSection.Step.neutral") },
        { label: t("ColorsSection.Step.semantic") },
        { label: t("ColorsSection.Step.dataVisualization") },
      ]}
      currentStep={0}
    >
      <BrandColors
        value={props.value.brand}
        onChange={(value) => props.onChange({ ...props.value, brand: value })}
      />
    </ConfiguratorSection>
  );
}
