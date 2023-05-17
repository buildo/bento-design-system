import { ButtonProps } from "../Button/Button";
import { IconProps } from "../Icons";
import { BodyProps } from "../Typography/Body/Body";
import { DisplayProps } from "../Typography/Display/Display";
import { HeadlineProps } from "../Typography/Headline/Headline";
import { TitleProps } from "../Typography/Title/Title";
import { Children } from "../util/Children";
import { FeedbackSize } from "./Feedback";

type SizeConfig<T> = Record<FeedbackSize, T>;
export type FeedbackConfig = {
  positiveIcon: (props: IconProps) => Children;
  negativeIcon: (props: IconProps) => Children;
  iconSize: SizeConfig<IconProps["size"]>;
  title: {
    medium: { kind: "title"; size: TitleProps["size"] } | { kind: "body"; size: BodyProps["size"] };
    large:
      | { kind: "display"; size: DisplayProps["size"] }
      | { kind: "title"; size: TitleProps["size"] }
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
