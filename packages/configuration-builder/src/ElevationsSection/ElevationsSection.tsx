import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionCompleted } from "./SectionCompleted";
import { Columns } from "@buildo/bento-design-system";
import { ElevationCard } from "./ElevationCard";

export function ElevationsSection() {
  const { theme, setTheme, completeSection } = useConfiguratorStatusContext();
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (completed) {
    return (
      <ConfiguratorSection title={t("ElevationsSection.title")} endStep>
        <SectionCompleted />
      </ConfiguratorSection>
    );
  }

  return (
    <ConfiguratorSection
      title={t("ElevationsSection.title")}
      singleStep
      onCancel={() => navigate("/theme")}
      onComplete={() => {
        setCompleted(true);
        completeSection("elevations");
      }}
    >
      <Columns space={24}>
        {(Object.keys(theme.elevations) as (keyof typeof theme.elevations)[]).map((elevation) => (
          <ElevationCard
            elevation={elevation}
            config={theme.elevations[elevation]}
            onChange={(elevationConfig) => {
              setTheme({
                ...theme,
                elevations: { ...theme.elevations, [elevation]: elevationConfig },
              });
            }}
          />
        ))}
      </Columns>
    </ConfiguratorSection>
  );
}
