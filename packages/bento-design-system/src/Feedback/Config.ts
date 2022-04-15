import { ButtonProps } from "../Button/createButton";
import { IllustrationProps } from "../Illustrations";
import { BodyProps } from "../Typography/Body/Body";
import { DisplayProps } from "../Typography/Display/Display";
import { HeadlineProps } from "../Typography/Headline/Headline";
import { TitleProps } from "../Typography/Title/Title";
import { Children } from "../util/Children";
import { FeedbackSize } from "./createFeedback";

type SizeConfig<T> = Record<FeedbackSize, T>;
export type FeedbackConfig = {
  background: JSX.Element | null;
  positiveIllustration: (props: IllustrationProps) => Children;
  negativeIllustration: (props: IllustrationProps) => Children;
  illustrationSize: SizeConfig<IllustrationProps["size"]>;
  title: {
    medium: TitleProps["size"];
    large:
      | { kind: "display"; size: DisplayProps["size"] }
      | { kind: "headline"; size: HeadlineProps["size"] };
  };
  descriptionSize: SizeConfig<BodyProps["size"]>;
  action: SizeConfig<{
    hierarchy: Extract<ButtonProps["hierarchy"], "primary" | "secondary">;
    kind: ButtonProps["kind"];
    size: ButtonProps["size"];
  }>;
  maxWidth: SizeConfig<number>;
};
