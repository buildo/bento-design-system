import { Button, Headline, Inline, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { ColorConfig, ColorEditor } from "../ColorEditor/ColorEditor";
import { HexColor } from "../utils/colorUtils";
import { ThemeConfig } from "../ThemeConfigurator/ThemeConfigurator";
import { defaultColorConfig } from "./defaultColor";

type BrandColors = ThemeConfig["colors"]["brand"];

type Props = {
  value: BrandColors;
  onChange: (value: BrandColors) => void;
};

const defaultColor: ColorConfig = defaultColorConfig("#7F77FF" as HexColor);

export function BrandColors(props: Props) {
  const { t } = useTranslation();

  function onAddBrandColor() {
    switch (props.value.length) {
      case 1:
        return props.onChange([props.value[0], defaultColor]);
      case 2:
        return props.onChange([props.value[0], props.value[1], defaultColor]);
    }
  }

  return (
    <Stack space={40}>
      <Headline size="small">{t("ColorsSection.Step.brand")}</Headline>
      <Stack space={24}>
        <ColorEditor
          name={t("BrandColors.brandPrimary")}
          value={props.value[0]}
          onChange={(value) =>
            props.onChange([value, props.value[1], props.value[2]].filter(Boolean) as BrandColors)
          }
        />
        {props.value[1] && (
          <ColorEditor
            name={t("BrandColors.brandSecondary")}
            value={props.value[1]}
            onChange={(value) =>
              props.onChange(
                props.value[2] ? [props.value[0], value, props.value[2]] : [props.value[0], value]
              )
            }
            onDelete={() =>
              props.onChange(props.value[2] ? [props.value[0], props.value[2]] : [props.value[0]])
            }
          />
        )}
        {props.value[2] && (
          <ColorEditor
            name={t("BrandColors.brandTertiary")}
            value={props.value[2]}
            onChange={(value) =>
              props.onChange([props.value[0], props.value[1], value] as BrandColors)
            }
            onDelete={() => props.onChange([props.value[0], props.value[1]] as BrandColors)}
          />
        )}
        {props.value.length < 3 && (
          <Inline space={0}>
            <Button
              kind="solid"
              hierarchy="secondary"
              label={t("BrandColors.addBrandColor")}
              onPress={onAddBrandColor}
            />
          </Inline>
        )}
      </Stack>
    </Stack>
  );
}
