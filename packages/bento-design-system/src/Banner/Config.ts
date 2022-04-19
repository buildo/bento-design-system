import { ComponentProps } from "react";
import { Title } from "../Typography/Title/Title";
import { BentoSprinkles } from "../internal";
import { Body } from "../Typography/Body/Body";
import { IconProps } from "../Icons";
import { Kind } from "./createBanner";
import { ButtonProps } from "../Button/createButton";
import { Children } from "../util/Children";

type KindConfig<T> = {
  [k in Kind]: T;
};
export type BannerConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: ComponentProps<typeof Title>["size"];
  descriptionSize: ComponentProps<typeof Body>["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconProps["size"];
  semanticIcons: KindConfig<(props: IconProps) => Children>;
  semanticIconSize: {
    withoutTitle: IconProps["size"];
    withTitle: IconProps["size"];
  };
  outline: boolean;
  buttonKind: ButtonProps["kind"];
  buttonSize: ButtonProps["size"];
};
