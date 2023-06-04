import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { ButtonProps, ButtonSize } from "./Button";

type SizeConfig<T> = {
  [k in ButtonSize]: T;
};

export type ButtonConfig = {
  paddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: LabelProps["size"] | SizeConfig<LabelProps["size"]>;
  radius: BorderRadiusConfig;
  internalSpacing: BentoSprinkles["gap"];
  iconSize: SizeConfig<IconProps["size"]>;
  /**
   * @default true
   */
  uppercaseLabel: boolean;
  /**
   * @default "medium"
   */
  defaultSize: ButtonSize;
  defaultIconPosition: ButtonProps["iconPosition"];
};
