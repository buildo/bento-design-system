import { ComponentProps, FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";
import { Label, LocalizedString, IconButton, IconClose } from "..";
import { Box, Columns, Column, BentoSprinkles } from "../internal";
import { chipRecipe } from "./Chip.css";
import { useDefaultMessages } from "../util/useDefaultMessages";

type DismissProps =
  | {
      dismissButtonLabel?: LocalizedString;
      onDismiss: () => void;
    }
  | {
      dismissButtonLabel?: never;
      onDismiss?: never;
    };

export type ChipProps = {
  label: LocalizedString;
  color:
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
} & DismissProps;

type ChipConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  labelSize: ComponentProps<typeof Label>["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  internalSpacing: BentoSprinkles["gap"];
};

export function createChip(
  config: ChipConfig = {
    paddingX: 8,
    paddingY: 4,
    labelSize: "small",
    closeIcon: IconClose,
    closeIconSize: 8,
    internalSpacing: 8,
  }
) {
  return function Chip({ color, label, ...dismissProps }: ChipProps) {
    const { defaultMessages } = useDefaultMessages();

    return (
      <Box display="flex">
        <Box
          paddingX={config.paddingX}
          paddingY={config.paddingY}
          className={chipRecipe({
            color,
          })}
        >
          <Columns space={config.internalSpacing} align="center" alignY="center">
            <Label size={config.labelSize}>{label}</Label>
            {dismissProps.onDismiss && (
              <Column width="content">
                <IconButton
                  icon={config.closeIcon}
                  label={dismissProps.dismissButtonLabel ?? defaultMessages.Chip.dismissButtonLabel}
                  onPress={dismissProps.onDismiss}
                  size={config.closeIconSize}
                />
              </Column>
            )}
          </Columns>
        </Box>
      </Box>
    );
  };
}
