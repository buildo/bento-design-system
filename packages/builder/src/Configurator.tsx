import { Inline, Inset, SelectField, Stack } from "@buildo/bento-design-system";
import { useConfiguratorContext } from "./ConfiguratorContext";
import { radiusOptions } from "./utils";
import { ColorPicker } from "./components/ColorPicker";
import { FontField } from "./components/FontField";

export function Configurator() {
  const {
    mergeConfig,
    mergeTheme,
    value: { theme, config },
  } = useConfiguratorContext();
  return (
    <Inset space={16}>
      <Stack space={16}>
        <Inline space={16}>
          <SelectField
            name="buttonRadius"
            label="Button radius"
            placeholder="Select a button radius"
            options={radiusOptions}
            value={config.button.radius}
            onChange={(value) => mergeConfig({ button: { radius: value } })}
          />
        </Inline>
        <ColorPicker
          value={theme.interactiveBackgroundColor?.primarySolidEnabledBackground ?? null}
          onChange={(value) =>
            mergeTheme({
              interactiveBackgroundColor: { primarySolidEnabledBackground: value },
            })
          }
        />
        <FontField
          value={theme.fontFamily?.default ?? null}
          onChange={(value) => mergeTheme({ fontFamily: { default: value } })}
        />
      </Stack>
    </Inset>
  );
}
