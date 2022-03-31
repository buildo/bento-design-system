import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";

export type DisclosureConfig = {
  internalSpacing: BentoSprinkles["gap"];
  titleSize: {
    1: TitleProps["size"];
    2: TitleProps["size"];
  };
};
