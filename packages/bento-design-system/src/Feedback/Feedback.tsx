import {
  Body,
  ButtonProps,
  Children,
  Display,
  LocalizedString,
  Box,
  Stack,
  Button,
  IconProps,
} from "..";
import { Title } from "../Typography/Title/Title";
import { Headline } from "../Typography/Headline/Headline";
import type { FeedbackConfig } from "./Config";
import { useBentoConfig } from "../BentoConfigContext";
import { match } from "ts-pattern";

type Status = "positive" | "negative";
export type FeedbackSize = "medium" | "large";

type Props = {
  title: LocalizedString;
  description?: Children;
  action?: Pick<ButtonProps, "label" | "onPress">;
  size: FeedbackSize;
} & (
  | {
      /** Use as:
       * ```tsx
       *  <Feedback
       *    icon={IconLightbulb}
       *    // ...
       *  />
       * ```
       */
      icon: (props: IconProps) => Children;
      status?: never;
    }
  | {
      status: Status;
      icon?: never;
    }
);

/**
 * Feedback can render a predefined feedback status (when using the `status` prop) or render a custom icon
 * (when using the `icon` prop).
 */
export function Feedback({ title, description, action, status, icon, size }: Props) {
  const config = useBentoConfig().feedback;

  return (
    <Box style={{ width: config.maxWidth[size] }}>
      <Stack space={size === "large" ? 24 : 16} align="center">
        {renderIcon(size, iconElement(status, icon, config), status, config)}
        <Stack space={size === "large" ? 8 : 4}>
          {renderTitle(size, title, config)}
          {description && (
            <Body size={config.descriptionSize[size]} align="center">
              {description}
            </Body>
          )}
        </Stack>
        {action && (
          <Button
            label={action.label}
            kind={config.action[size].kind}
            hierarchy={config.action[size].hierarchy}
            size={config.action[size].size}
            onPress={action.onPress}
          />
        )}
      </Stack>
    </Box>
  );
}

function renderTitle(size: FeedbackSize, title: LocalizedString, config: FeedbackConfig) {
  return match(size)
    .with("medium", () =>
      match(config.title.medium.kind)
        .with("body", () => (
          <Body size={config.title.medium.size} align="center">
            {title}
          </Body>
        ))
        .with("title", () => (
          <Title size={config.title.medium.size} align="center">
            {title}
          </Title>
        ))
        .exhaustive()
    )
    .with("large", () =>
      match(config.title.large.kind)
        .with("display", () => (
          <Display size={config.title.large.size} align="center">
            {title}
          </Display>
        ))
        .with("headline", () => (
          <Headline size={config.title.large.size} align="center">
            {title}
          </Headline>
        ))
        .with("title", () => (
          <Title size={config.title.large.size} align="center">
            {title}
          </Title>
        ))
        .exhaustive()
    )
    .exhaustive();
}

function iconElement(
  status: Props["status"],
  icon: Props["icon"],
  config: FeedbackConfig
): ((props: IconProps) => Children) | undefined {
  if (icon) {
    return icon;
  } else if (status) {
    return iconForStatus(status!, config);
  }
  return undefined;
}

function iconForStatus(status: Status, config: FeedbackConfig) {
  switch (status) {
    case "positive":
      return config.positiveIcon;
    case "negative":
      return config.negativeIcon;
  }
}

function renderIcon(
  size: "medium" | "large",
  icon: ((props: IconProps) => Children) | undefined,
  status: Props["status"] | undefined,
  config: FeedbackConfig
): Children {
  const iconProps: IconProps = {
    size: config.iconSize[size],
    color: match(status)
      .with("positive", () => "positive" as const)
      .with("negative", () => "negative" as const)
      .with(undefined, () => "interactive" as const)
      .exhaustive(),
  };
  return (
    <Box
      display="flex"
      borderRadius="circled"
      background={match(status)
        .with("positive", () => "backgroundPositive" as const)
        .with("negative", () => "backgroundNegative" as const)
        .with(undefined, () => "backgroundInteractiveOverlay" as const)
        .exhaustive()}
      padding={size === "medium" ? 12 : 16}
      alignItems="center"
      justifyContent="center"
    >
      {icon && icon(iconProps)}
    </Box>
  );
}

export type { Props as FeedbackProps };
