import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";
import { DisclosureProps } from "./createDisclosure";

export type DisclosureConfig = {
  internalSpacing: BentoSprinkles["gap"];
  titleSize: {
    1: TitleProps["size"];
    2: TitleProps["size"];
  };
  defaultIconPosition: NonNullable<DisclosureProps["iconPosition"]>;
};
