import { FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";
import { Label, LocalizedString, BoxType } from "..";
import { Column, Columns, BentoSprinkles, bentoSprinkles } from "../internal";
import { chip, ellipsedLabel, maxWidth } from "./Chip.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { IconButtonProps } from "../IconButton/createIconButton";
import { ChipConfig } from "./Config";
import { assignInlineVars } from "@vanilla-extract/dynamic";

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

type Props<CustomColor extends string> = {
  label: LocalizedString;
  color: DefaultColor | CustomColor;
  icon?: FunctionComponent<IconProps>;
  /** Truncate and show ellipsis after a number of characters */
  maxCharacters?: number;
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

export function createChip<AtomsFn extends typeof bentoSprinkles, CustomColors extends string>(
  config: ChipConfig<AtomsFn, CustomColors>,
  {
    Box,
    IconButton,
  }: {
    Box: BoxType<AtomsFn>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  const colorsMapping = { ...defaultColorsMapping, ...config.customColors };

  return function Chip({
    color,
    label: _label,
    icon,
    maxCharacters,
    ...dismissProps
  }: Props<CustomColors>) {
    const { defaultMessages } = useDefaultMessages();

    const label =
      maxCharacters != null ? (
        <Box
          as="span"
          display="inline-block"
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
                <Column width="content">
                  {icon({ size: config.iconSize, color: "secondary" })}
                </Column>
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
  };
}

export type { Props as ChipProps };
