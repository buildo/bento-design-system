import { Body, ButtonProps, Children, Display, LocalizedString, Box, Stack } from "..";
import { IllustrationProps } from "../Illustrations/IllustrationProps";
import { Title } from "../Typography/Title/Title";
import { Headline } from "../Typography/Headline/Headline";
import { FeedbackConfig } from "./Config";
import { useBentoConfig } from "../BentoConfigProvider";

type Status = "positive" | "negative";
export type FeedbackSize = "medium" | "large";

type Props = {
  title: LocalizedString;
  description?: Children;
  action?: Pick<ButtonProps, "label" | "onPress">;
  background?: boolean;
  size: FeedbackSize;
} & (
  | {
      /** Use as:
       * ```tsx
       *  <Feedback
       *    illustration={IllustrationIdea}
       *    // ...
       *  />
       * ```
       */
      illustration: (props: IllustrationProps) => Children;
      status?: never;
    }
  | {
      status: Status;
      illustration?: never;
    }
);

/**
 * Feedback can render a predefined feedback status (when using the `status` prop) or render a custom illustration
 * (when using the `illustration` prop).
 */
export function Feedback({
  title,
  description,
  action,
  background,
  status,
  illustration,
  size,
}: Props) {
  const config = useBentoConfig().feedback;

  return (
    <Box style={{ width: config.maxWidth[size] }}>
      <Stack space={size === "large" ? 24 : 16} align="center">
        {renderIllustration(
          size,
          illustrationElement(status, illustration, config),
          background,
          config
        )}
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
  switch (size) {
    case "medium":
      return (
        <Title size={config.title.medium} align="center">
          {title}
        </Title>
      );
    case "large":
      switch (config.title.large.kind) {
        case "display":
          return (
            <Display size={config.title.large.size} align="center">
              {title}
            </Display>
          );
        case "headline":
          return (
            <Headline size={config.title.large.size} align="center">
              {title}
            </Headline>
          );
      }
  }
}

function illustrationElement(
  status: Props["status"],
  illustration: Props["illustration"],
  config: FeedbackConfig
): ((props: IllustrationProps) => Children) | undefined {
  if (illustration) {
    return illustration;
  } else if (status) {
    return illustrationForStatus(status!, config);
  }
  return undefined;
}

function illustrationForStatus(status: Status, config: FeedbackConfig) {
  switch (status) {
    case "positive":
      return config.positiveIllustration;
    case "negative":
      return config.negativeIllustration;
  }
}

function renderIllustration(
  size: "medium" | "large",
  illustration: ((props: IllustrationProps) => Children) | undefined,
  background: boolean | undefined,
  config: FeedbackConfig
): Children {
  const illustrationProps: IllustrationProps = {
    size: config.illustrationSize[size],
    style: "color",
  };
  if (background && config.background) {
    // NOTE(gabro): when we have a background, the overall size of the illustration is the one of
    // the background so the background has position relative and the illustration has position absolute.
    return (
      <Box position="relative" width="full">
        <Box position="relative">{config.background}</Box>
        <Box position="absolute" top={40} width="full" display="flex" justifyContent="center">
          {illustration && illustration(illustrationProps)}
        </Box>
      </Box>
    );
  } else {
    return illustration && illustration(illustrationProps);
  }
}

export type { Props as FeedbackProps };
