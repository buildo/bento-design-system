import { IconProps } from "src/Icons";
import { BentoSprinkles } from "src/internal";
import { LabelProps } from "src/Typography/Label/Label";
import { createButtonLink } from "./ButtonLink";
import { createButton, ButtonProps, Size } from "./createButton";

type SizeConfig<T> = {
  [k in Size]: T;
};

export type ButtonConfig = {
  paddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: LabelProps["size"];
  radius: BentoSprinkles["borderRadius"];
  internalSpacing: BentoSprinkles["gap"];
  iconSize: SizeConfig<IconProps["size"]>;
  uppercaseLabel: boolean;
  defaultSize: Size;
};

export const defaultButtonConfig: ButtonConfig = {
  paddingX: {
    small: 8,
    medium: 16,
    large: 16,
  },
  paddingY: {
    small: 4,
    medium: 8,
    large: 16,
  },
  labelSize: "large",
  radius: 4,
  internalSpacing: 8,
  iconSize: {
    small: 12,
    medium: 12,
    large: 16,
  },
  uppercaseLabel: true,
  defaultSize: "medium",
};

export function createButtons(config: ButtonConfig) {
  const Button = createButton(config);
  const ButtonLink = createButtonLink(config);

  return { Button, ButtonLink };
}

export type { ButtonProps };
