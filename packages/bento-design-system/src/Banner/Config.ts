import { ComponentProps, FunctionComponent } from "react";
import { Title } from "../Typography/Title/Title";
import { BentoSprinkles } from "../internal";
import { Body } from "../Typography/Body/Body";
import { IconProps } from "../Icons";
import { Kind } from "./createBanner";
import { ButtonProps } from "../Button/createButton";

type KindConfig<T> = {
  [k in Kind]: T;
};
export type BannerConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: ComponentProps<typeof Title>["size"];
  descriptionSize: ComponentProps<typeof Body>["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  semanticIcons: KindConfig<FunctionComponent<IconProps>>;
  semanticIconSize: {
    withoutTitle: IconProps["size"];
    withTitle: IconProps["size"];
  };
  outline: boolean;
  buttonKind: ButtonProps["kind"];
  buttonSize: ButtonProps["size"];
};
