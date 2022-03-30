import { LocalizedString } from "../util/LocalizedString";
import {
  Title,
  Body,
  TextChildren,
  IconClose,
  IconInformative,
  IconCheckCircleSolid,
  IconWarning,
  IconNegative,
  IconIdea,
  ButtonProps,
} from "..";
import { Columns, Column, Box, Stack, BentoSprinkles, Inline } from "../internal";
import { bannerRecipe } from "./Banner.css";
import { ComponentProps, FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { IconButtonProps } from "../IconButton/createIconButton";

type Kind = "informative" | "positive" | "warning" | "negative" | "secondary";

type KindConfig<T> = {
  [k in Kind]: T;
};
type BannerConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: ComponentProps<typeof Title>["size"];
  descriptionSize: ComponentProps<typeof Body>["size"];
  closeIcon: FunctionComponent<IconProps>;
  kindIcons: KindConfig<FunctionComponent<IconProps>>;
};
export const defaultBannerConfig: BannerConfig = {
  padding: 16,
  titleSize: "small",
  descriptionSize: "small",
  radius: 8,
  closeIcon: IconClose,
  kindIcons: {
    informative: IconInformative,
    positive: IconCheckCircleSolid,
    warning: IconWarning,
    negative: IconNegative,
    secondary: IconIdea,
  },
};

type DismissProps =
  | {
      dismissButtonLabel?: LocalizedString;
      onDismiss: () => void;
    }
  | {
      dismissButtonLabel?: never;
      onDismiss?: never;
    };

type ActionProps = {
  label: LocalizedString;
  onPress: ButtonProps["onPress"];
};

type Props = {
  kind: Kind;
  action?: ActionProps;
} & DismissProps &
  (
    | {
        title: LocalizedString;
        description?: TextChildren;
      }
    | {
        title?: LocalizedString;
        description: TextChildren;
      }
  );

export function createBanner(
  config: BannerConfig,
  {
    Button,
    IconButton,
  }: {
    Button: FunctionComponent<ButtonProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  return function Banner({ title, description, kind, action, ...dismissProps }: Props) {
    const isWithoutTitle = title === undefined;
    const iconSize = isWithoutTitle ? 16 : 24;
    const iconProps = { size: iconSize, color: kind } as const;
    const Icon = config.kindIcons[kind];

    const { defaultMessages } = useDefaultMessages();

    return (
      <Box padding={config.padding} borderRadius={config.radius} className={bannerRecipe({ kind })}>
        <Stack space={4}>
          <Columns space={16} align="left" alignY={title && description ? "top" : "center"}>
            <Column width="content">
              <Box>
                <Icon {...iconProps} />
              </Box>
            </Column>
            <Stack align="left" space={4}>
              {title && (
                <Title size={config.titleSize} color={kind}>
                  {title}
                </Title>
              )}
              {description && <Body size={config.descriptionSize}>{description}</Body>}
            </Stack>
            {dismissProps.onDismiss && (
              <Column width="content">
                <IconButton
                  label={
                    dismissProps.dismissButtonLabel ?? defaultMessages.Banner.dismissButtonLabel
                  }
                  onPress={dismissProps.onDismiss}
                  size={12}
                  kind="transparent"
                  hierarchy="secondary"
                  icon={config.closeIcon}
                />
              </Column>
            )}
          </Columns>
          {action && (
            <Inline space={0} align="right">
              <Button
                onPress={action.onPress}
                label={action.label}
                kind="transparent"
                hierarchy="secondary"
                size="medium"
              />
            </Inline>
          )}
        </Stack>
      </Box>
    );
  };
}

export type { Props as BannerProps };
