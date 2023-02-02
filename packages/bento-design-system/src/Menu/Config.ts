import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";

export type MenuConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  elevation: "small" | "medium" | "large";
  headerPaddingX: BentoSprinkles["paddingX"];
  headerPaddingY: BentoSprinkles["paddingY"];
  defaultOffset: number;
  nestedMenuIcon: (props: IconProps) => JSX.Element;
};
