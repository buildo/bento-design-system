import {
  RadioGroupField,
  SelectField,
  Stack,
  unsafeLocalizedString,
} from "@buildo/bento-design-system";
import { ColorEditor } from "../ColorEditor/ColorEditor";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ThemeConfig } from "../ConfiguratorStatusContext";

type InteractiveColor = ThemeConfig["colors"]["interactive"];
type BrandColors = ThemeConfig["colors"]["brand"];

type Props = {
  value: InteractiveColor;
  brandColors: BrandColors;
  onChange: (value: InteractiveColor) => void;
};

type BrandColor = "primary" | "secondary" | "tertiary";
const brandColors = ["primary", "secondary", "tertiary"] as const;

export function InteractiveColor(props: Props) {
  const { t } = useTranslation();

  type UseColor = { kind: "Brand"; value?: BrandColor } | { kind: "New" };

  const [useColor, setUseColor] = useState<UseColor>({ kind: "New" });

  return (
    <>
      <Stack space={24}>
        <RadioGroupField
          name={t("InteractiveColors.useColor")}
          label={unsafeLocalizedString("")}
          value={useColor.kind}
          options={[
            { label: t("InteractiveColors.setNewColor"), value: "New" },
            { label: t("InteractiveColors.useBrandColor"), value: "Brand" },
          ]}
          onChange={(value) => {
            if (value === "Brand") {
              setUseColor({ kind: "Brand", value: "primary" });
              props.onChange(props.brandColors[0]);
            } else {
              setUseColor({ kind: "New" });
            }
          }}
          orientation="horizontal"
        />
        {useColor.kind === "Brand" && (
          <SelectField
            label={t("InteractiveColors.brandColor")}
            value={useColor.value}
            onChange={(value) => {
              setUseColor({ kind: "Brand", value });
              if (value) {
                props.onChange(props.brandColors[brandColors.indexOf(value)]);
              }
            }}
            options={props.brandColors.map((_, index) => {
              const value = brandColors[index];
              return {
                label: t(`BrandColors.${value}`),
                value,
              };
            })}
          />
        )}
      </Stack>
      {useColor.kind === "Brand" ? (
        <ColorEditor name={t("InteractiveColors.interactive")} value={props.value} isReadOnly />
      ) : (
        <ColorEditor
          name={t("InteractiveColors.interactive")}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </>
  );
}
