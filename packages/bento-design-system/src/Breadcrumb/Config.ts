import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";

export type BreadcrumbConfig = {
  separator: FunctionComponent<IconProps>;
  separatorSize: IconProps["size"];
  space: BentoSprinkles["gap"];
};
