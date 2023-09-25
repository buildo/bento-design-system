import { Box, Column, Columns, LocalizedString, Stack, Title } from "@buildo/bento-design-system";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { ColorPickerField } from "../ColorPickerField/ColorPickerField";

export function ColorTokenField(props: {
  label: LocalizedString;
  value: string;
  onChange: (value: string) => void;
}) {
  const { theme } = useConfiguratorStatusContext();
  const { t } = useTranslation();
  return (
    <Columns space={24} alignY="stretch">
      <Column width="content">
        <Box borderRadius={16} height="full" style={{ background: props.value, width: 64 }} />
      </Column>
      <Stack space={8}>
        <Title size="medium">{props.label}</Title>
        <ColorPickerField
          colors={theme.colors}
          label={t("Tokens.Color.label")}
          value={props.value}
          onChange={props.onChange}
        />
      </Stack>
    </Columns>
  );
}
