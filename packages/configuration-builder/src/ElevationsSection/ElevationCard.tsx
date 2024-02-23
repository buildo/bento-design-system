import { Body, Card, FormRow, Inset, NumberField, Stack, Title } from "@buildo/bento-design-system";
import { ElevationConfig } from "../ConfiguratorStatusContext";
import { Playground } from "../TokensSection/Playground";
import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColorSelector } from "../TokensSection/ColorSelector";

type Props = {
  elevation: "small" | "medium" | "large";
  config: ElevationConfig;
  onChange: (elevation: ElevationConfig) => void;
};

export function ElevationCard(props: Props) {
  const { t } = useTranslation();
  return (
    <Card padding={0} borderRadius={40}>
      <Stack space={0}>
        <Playground>
          <Inset spaceY={40}>
            <Card elevation={props.elevation}>
              <></>
            </Card>
          </Inset>
        </Playground>
        <Inset space={40}>
          <Form>
            <Stack space={24}>
              <Stack space={8}>
                <Title size="large">{t(`Elevation.${props.elevation}`)}</Title>
                <Body size="medium">{t(`Elevation.${props.elevation}Description`)}</Body>
              </Stack>
              <FormRow>
                <NumberField
                  label={t("Elevation.x")}
                  value={props.config.x}
                  onChange={(x) => props.onChange({ ...props.config, x })}
                />
                <NumberField
                  label={t("Elevation.y")}
                  value={props.config.y}
                  onChange={(y) => props.onChange({ ...props.config, y })}
                />
                <NumberField
                  label={t("Elevation.blur")}
                  value={props.config.blur}
                  onChange={(blur) => props.onChange({ ...props.config, blur })}
                />
              </FormRow>
              <FormRow>
                <ColorSelector
                  label={t("Elevation.color")}
                  value={props.config.color}
                  onChange={(color) => props.onChange({ ...props.config, color })}
                />
              </FormRow>
            </Stack>
          </Form>
        </Inset>
      </Stack>
    </Card>
  );
}
