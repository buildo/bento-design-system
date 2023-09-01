import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { Children } from "../util/Children";

export type BreadcrumbConfig = {
  fontSize: BodyProps["size"];
  separator: (props: IconProps) => Children;
  separatorSize: IconProps["size"];
  separatorColor: IconProps["color"];
  space: BentoSprinkles["gap"];
};
