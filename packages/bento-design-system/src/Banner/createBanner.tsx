import { LocalizedString } from "../util/LocalizedString";
import { Title, Body, ButtonProps, Children } from "..";
import { Columns, Column, Box, Stack, Inline } from "../internal";
import { bannerRecipe } from "./Banner.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { IconButtonProps } from "../IconButton/createIconButton";
import { BannerConfig } from "./Config";
import { FunctionComponent } from "react";

export type Kind = "informative" | "positive" | "warning" | "negative" | "secondary";

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
        description?: Children;
      }
    | {
        title?: LocalizedString;
        description: Children;
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
    const iconSize = isWithoutTitle
      ? config.semanticIconSize.withoutTitle
      : config.semanticIconSize.withTitle;
    const iconProps = { size: iconSize, color: kind } as const;
    const icon = config.semanticIcons[kind];

    const { defaultMessages } = useDefaultMessages();

    return (
      <Box
        padding={config.padding}
        borderRadius={config.radius}
        className={bannerRecipe({ kind, hasOutline: config.outline })}
      >
        <Stack space={4}>
          <Columns space={16} align="left" alignY={title && description ? "top" : "center"}>
            <Column width="content">
              <Box>{icon(iconProps)}</Box>
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
                  size={config.closeIconSize}
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
                kind={config.buttonKind}
                hierarchy="secondary"
                size={config.buttonSize}
              />
            </Inline>
          )}
        </Stack>
      </Box>
    );
  };
}

export type { Props as BannerProps };
