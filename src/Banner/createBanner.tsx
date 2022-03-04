import { LocalizedString } from "../util/LocalizedString";
import {
  Title,
  Body,
  TextChildren,
  IconButton,
  IconClose,
  IconInformative,
  IconCheckCircleSolid,
  IconWarning,
  IconNegative,
  IconIdea,
} from "..";
import { Columns, Column, Box, Stack, BentoSprinkles } from "../internal";
import { bannerRecipe } from "./Banner.css";
import { ComponentProps, FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";

type DismissProps =
  | {
      dismissButtonLabel: LocalizedString;
      onDismiss: () => void;
    }
  | {
      dismissButtonLabel?: never;
      onDismiss?: never;
    };

type Kind = "informative" | "positive" | "warning" | "negative" | "tip";

type Props = {
  kind: Kind;
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

type KindConfig<T> = {
  [k in Kind]: T;
};
type BannerConfig = {
  padding?: BentoSprinkles["padding"];
  radius?: BentoSprinkles["borderRadius"];
  titleSize?: ComponentProps<typeof Title>["size"];
  descriptionSize?: ComponentProps<typeof Body>["size"];
  closeIcon?: FunctionComponent<IconProps>;
  kindIcons?: KindConfig<FunctionComponent<IconProps>>;
};

export function createBanner({
  padding = 16,
  titleSize = "small",
  descriptionSize = "small",
  radius = 8,
  closeIcon = IconClose,
  kindIcons = {
    informative: IconInformative,
    positive: IconCheckCircleSolid,
    warning: IconWarning,
    negative: IconNegative,
    tip: IconIdea,
  },
}: BannerConfig) {
  return function Banner({ title, description, kind, ...dismissProps }: Props) {
    const isWithoutTitle = title === undefined;
    const iconSize = isWithoutTitle ? 16 : 24;
    const iconProps = { size: iconSize, color: kind === "tip" ? "secondary" : kind } as const;
    const Icon = kindIcons[kind];

    return (
      <Box padding={padding} borderRadius={radius} className={bannerRecipe({ kind })}>
        <Columns space={16} align="left" alignY={title && description ? "top" : "center"}>
          <Column width="content">
            <Box>
              <Icon {...iconProps} />
            </Box>
          </Column>
          <Stack align="left" space={4}>
            {title && (
              <Title size={titleSize} color={kind === "tip" ? "secondary" : kind}>
                {title}
              </Title>
            )}
            {description && <Body size={descriptionSize}>{description}</Body>}
          </Stack>
          {dismissProps.onDismiss && (
            <Column width="content">
              <IconButton
                label={dismissProps.dismissButtonLabel}
                onPress={dismissProps.onDismiss}
                size={12}
                icon={closeIcon}
                color="primary"
              />
            </Column>
          )}
        </Columns>
      </Box>
    );
  };
}
