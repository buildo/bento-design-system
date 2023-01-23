import { IconProps } from "../Icons";
import { IllustrationColor, IllustrationProps } from "../Illustrations";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import type { ListSize } from "./List";

type ListItemSizeConfig<T> = {
  [k in ListSize]: T;
};

export type ListItemConfig = {
  borderRadius: BentoSprinkles["borderRadius"];
  paddingX: ListItemSizeConfig<BentoSprinkles["paddingX"]>;
  paddingY: ListItemSizeConfig<BentoSprinkles["paddingY"]>;
  fontSize: {
    firstLine: BodyProps["size"];
    secondLine: BodyProps["size"];
    overline: LabelProps["size"];
  };
  internalSpacing: BentoSprinkles["gap"];
  iconSize: {
    leading: IconProps["size"];
    trailing: IconProps["size"];
    illustration: IllustrationProps["size"];
  };
  iconColor: {
    leading: IconProps["color"];
    trailing: IconProps["color"];
    illustration: IllustrationColor;
  };
};

export type ListConfig = {
  item: ListItemConfig;
  spacing: BentoSprinkles["gap"];
};
