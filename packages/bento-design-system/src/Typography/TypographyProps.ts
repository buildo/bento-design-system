import { Children as Children_ } from "..";

export type TypographySize = "small" | "medium" | "large";
export type TypographyAlign = "left" | "center" | "right";

export type TypographyColor =
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
  Children extends Children_,
  Color extends string,
  Align extends string = TypographyAlign
> = {
  children: Children;
  size: TypographySize;
  color?: Color;
  align?: Align;
  ellipsis?: boolean;
};
