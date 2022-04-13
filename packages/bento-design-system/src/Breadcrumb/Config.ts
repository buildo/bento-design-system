import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";

export type BreadcrumbConfig = {
  fontSize: BodyProps["size"];
  separator: FunctionComponent<IconProps>;
  separatorSize: IconProps["size"];
  space: BentoSprinkles["gap"];
};
