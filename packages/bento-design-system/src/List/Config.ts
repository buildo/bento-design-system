import { IconProps } from "../Icons";
import { IllustrationProps } from "../Illustrations";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { ListSize } from "./createListComponents";

type ListItemSizeConfig<T> = {
  [k in ListSize]: T;
};

export type ListItemConfig = {
  paddingX: BentoSprinkles["paddingX"];
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
};

export type ListConfig = {
  item: ListItemConfig;
};
