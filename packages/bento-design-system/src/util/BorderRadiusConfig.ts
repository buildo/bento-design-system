import { BentoSprinkles } from "../internal";

type Radius = NonNullable<BentoSprinkles["borderRadius"]>;

export type BorderRadiusConfig =
  | Radius
  | { topLeft: Radius; topRight: Radius; bottomRight: Radius; bottomLeft: Radius };

export function getRadiusPropsFromConfig(config: BorderRadiusConfig): BentoSprinkles {
  if (typeof config === "object") {
    return {
      borderTopLeftRadius: config.topLeft,
      borderTopRightRadius: config.topRight,
      borderBottomRightRadius: config.bottomRight,
      borderBottomLeftRadius: config.bottomLeft,
    };
  } else {
    return {
      borderRadius: config,
    };
  }
}
