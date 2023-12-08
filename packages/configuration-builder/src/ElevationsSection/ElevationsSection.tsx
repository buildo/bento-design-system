import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { Columns } from "@buildo/bento-design-system";
import { ElevationCard } from "./ElevationCard";

export function ElevationsSection() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();

  return (
    <ConfiguratorSection
      sectionName="elevations"
      title={t("ElevationsSection.title")}
      singleStep
      nextSection={{
        label: t("ElevationsSection.goToTokens"),
        href: "/theme/tokens",
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
