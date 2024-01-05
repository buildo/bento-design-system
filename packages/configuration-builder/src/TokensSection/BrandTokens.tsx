import {
  AreaLoader,
  Body,
  Box,
  Column,
  Columns,
  SliderField,
  Stack,
  unsafeLocalizedString,
  DecorativeDivider,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { useState } from "react";

type Props = {
  tokens: ThemeConfig["tokens"]["brandColor"];
  onChange: (value: ThemeConfig["tokens"]["brandColor"]) => void;
};

function BrandTokensPlayground() {
  const [slider, setSlider] = useState(50);
  const { t } = useTranslation();
  return (
    <Playground>
      <Stack space={40}>
        <Stack space={12}>
          <Body size="medium" color="secondary">
            {t("Component.decorativeDivider")}
          </Body>
          <DecorativeDivider />
        </Stack>
        <Stack space={12}>
          <Body size="medium" color="secondary">
            {t("Component.areaLoader")}
          </Body>
          <Box position="relative" style={{ height: 240 }}>
            <AreaLoader />
          </Box>
        </Stack>
        <Stack space={12}>
          <Body size="medium" color="secondary">
            {t("Component.sliderField")}
          </Body>
          <SliderField
            type="single"
            label={unsafeLocalizedString("")}
            value={slider}
            minValue={0}
            maxValue={100}
            onChange={setSlider}
          />
        </Stack>
      </Stack>
    </Playground>
  );
}

export function BrandTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Columns space={40} alignY="stretch">
      <Column width="1/3">
        <Stack space={16}>
          <ColorSelector
            label={t("Tokens.Color.brandPrimary")}
            value={props.tokens.brandPrimary}
            onChange={(value) => props.onChange({ ...props.tokens, brandPrimary: value })}
          />
          <ColorSelector
            label={t("Tokens.Color.brandSecondary")}
            value={props.tokens.brandSecondary}
            onChange={(value) =>
              props.onChange({
                ...props.tokens,
                brandSecondary: value,
              })
            }
          />
          <ColorSelector
            label={t("Tokens.Color.brandTertiary")}
            value={props.tokens.brandTertiary}
            onChange={(value) =>
              props.onChange({
                ...props.tokens,
                brandTertiary: value,
              })
            }
          />
        </Stack>
      </Column>
      <BrandTokensPlayground />
    </Columns>
  );
}
