import { FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";
import { Label, LocalizedString, Columns, Column, Box, IconButton, ChipCustomColors } from "..";
import { BentoSprinkles } from "../internal";
import { chip, ellipsedLabel, maxWidth } from "./Chip.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useBentoConfig } from "../BentoConfigContext";

type DismissProps =
  | {
      dismissButtonLabel?: LocalizedString;
      onDismiss: () => void;
    }
  | {
      dismissButtonLabel?: never;
      onDismiss?: never;
    };

type DefaultColor =
  | "grey"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "jade"
  | "blue"
  | "indigo"
  | "violet"
  | "pink";

type Props = {
  label: LocalizedString;
  color: DefaultColor | ChipCustomColors;
  icon?: FunctionComponent<IconProps>;
  /** Truncate and show ellipsis after a number of characters */
  maxCharacters?: number;
  size?: "medium" | "large";
} & DismissProps;

const defaultColorsMapping: Record<DefaultColor, BentoSprinkles["background"]> = {
  grey: "softGrey",
  red: "softRed",
  orange: "softOrange",
  yellow: "softYellow",
  green: "softGreen",
  jade: "softJade",
  blue: "softBlue",
  indigo: "softIndigo",
  violet: "softViolet",
  pink: "softPink",
};

export function Chip({
  color,
  label: _label,
  icon,
  maxCharacters,
  size = "medium",
  ...dismissProps
}: Props) {
  const config = useBentoConfig().chip;
  const colorsMapping = { ...defaultColorsMapping, ...config.customColors };

  const { defaultMessages } = useDefaultMessages();

  const label =
    maxCharacters != null ? (
      <Box
        as="span"
        display="block"
        className={ellipsedLabel}
        title={_label}
        style={assignInlineVars({ [maxWidth]: `${maxCharacters}ch` })}
      >
        {_label}
      </Box>
    ) : (
      _label
    );

  return (
    <Box display="flex">
      <Box
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        className={chip}
        background={colorsMapping[color]}
        borderRadius={config.radius}
      >
        <Columns space={config.spacingAfterLabel} align="center" alignY="center">
          <Columns space={config.spacingAfterIcon} alignY="center">
            {icon && (
              <Column width="content">{icon({ size: config.iconSize, color: "secondary" })}</Column>
            )}

            <Label size={config.labelSize}>{label}</Label>
          </Columns>
          {dismissProps.onDismiss && (
            <Column width="content">
              <IconButton
                icon={config.closeIcon}
                label={dismissProps.dismissButtonLabel ?? defaultMessages.Chip.dismissButtonLabel}
                onPress={dismissProps.onDismiss}
                size={config.closeIconSize}
                kind="transparent"
                hierarchy="secondary"
              />
            </Column>
          )}
        </Columns>
      </Box>
    </Box>
  );
}

export type { Props as ChipProps };
