import { FunctionComponent } from "react";
import { Body, ButtonProps, Children, Display, LocalizedString } from "..";
import { Box, Stack } from "../internal";
import { feedbackStyle } from "./Feedback.css";
import { IllustrationProps } from "../Illustrations/IllustrationProps";
import { IllustrationNegative, IllustrationPositive } from "../Illustrations";

type Status = "positive" | "negative";

type Props = {
  title: LocalizedString;
  description?: LocalizedString;
  action?: Pick<ButtonProps, "label" | "onPress">;
  background?: boolean;
  size: "medium" | "large";
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

type FeedbackConfig = {
  background: JSX.Element | null;
  positiveIllustration: (props: IllustrationProps) => Children;
  negativeIllustration: (props: IllustrationProps) => Children;
};

/**
 * Feedback can render a predefined feedback status (when using the `status` prop) or render a custom illustration
 * (when using the `illustration` prop).
 */
export function createFeedback(
  Button: FunctionComponent<ButtonProps>,
  config: FeedbackConfig = {
    background: null,
    positiveIllustration: IllustrationPositive,
    negativeIllustration: IllustrationNegative,
  }
) {
  return function Feedback({
    title,
    description,
    action,
    background,
    status,
    illustration,
    size,
  }: Props) {
    return (
      <Box className={feedbackStyle}>
        <Stack space={size === "large" ? 24 : 16} align="center">
          {renderIllustration(size, illustrationElement(status, illustration), background)}
          <Display size="small" align="center">
            {title}
          </Display>
          {description && (
            <Body size="medium" align="center">
              {description}
            </Body>
          )}
          {action && (
            <Button
              label={action.label}
              kind={size === "large" ? "solid" : "transparent"}
              hierarchy="primary"
              onPress={action.onPress}
            />
          )}
        </Stack>
      </Box>
    );
  };

  function illustrationElement(
    status: Props["status"],
    illustration: Props["illustration"]
  ): ((props: IllustrationProps) => Children) | undefined {
    if (illustration) {
      return illustration;
    } else if (status) {
      return illustrationForStatus(status!);
    }
    return undefined;
  }

  function illustrationForStatus(status: Status) {
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
    background: boolean | undefined
  ): Children {
    const illustrationProps: IllustrationProps = {
      size: size === "large" ? 160 : 80,
      style: "color",
    };
    if (background) {
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
}
