import { Children as Children_ } from "../util/Children";

export type TypographySize = "small" | "medium" | "large";
export type TypographyAlign = "left" | "center" | "right" | "justify";

export type TypographyColor =
  | "default"
  | "inherit"
  | "primary"
  | "secondary"
  | "primaryInverse"
  | "secondaryInverse"
  | "interactive"
  | "informative"
  | "positive"
  | "warning"
  | "negative"
  | "disabled";

export type TypographyProps<
  Align extends TypographyAlign = TypographyAlign,
  Children extends Children_ = Children_,
  Color extends TypographyColor = TypographyColor
> = {
  children: Children;
  size: TypographySize;
  color?: Color;
  align?: Align;
  ellipsis?: boolean;
};
