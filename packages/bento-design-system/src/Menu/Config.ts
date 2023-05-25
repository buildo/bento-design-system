import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type MenuConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BorderRadiusConfig;
  elevation: "small" | "medium" | "large";
  headerPaddingX: BentoSprinkles["paddingX"];
  headerPaddingY: BentoSprinkles["paddingY"];
  defaultOffset: number;
  nestedMenuIcon: (props: IconProps) => JSX.Element;
};
