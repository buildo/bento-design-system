import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { NavigationSize } from "./Navigation";

type SizeConfig<A> = Record<NavigationSize, A>;

export type NavigationConfig = {
  destinationsSpacing: BentoSprinkles["gap"];
  destinationPaddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  destinationPaddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: SizeConfig<LabelProps["size"]>;
  iconSize: SizeConfig<IconProps["size"]>;
  internalSpacing: SizeConfig<BentoSprinkles["gap"]>;
  activeVisualElement: ActiveVisualElementConfig | JSX.Element;
  uppercaseLabel: boolean;
};

type ActiveVisualElementConfig = {
  lineHeight: SizeConfig<number>;
  lineColor: BentoSprinkles["decoration"];
};
