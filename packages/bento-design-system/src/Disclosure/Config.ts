import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";
import { Children } from "../util/Children";
import { DisclosureProps } from "./createDisclosure";

export type DisclosureConfig = {
  internalSpacing: BentoSprinkles["gap"];
  titleSize: {
    1: TitleProps["size"];
    2: TitleProps["size"];
  };
  defaultIconPosition: NonNullable<DisclosureProps["iconPosition"]>;
  icons: {
    open: (props: IconProps) => Children;
    closed: (props: IconProps) => Children;
  };
  iconSize: {
    1: IconProps["size"];
    2: IconProps["size"];
  };
};
