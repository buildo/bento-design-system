import { BentoSprinkles } from "../internal";
import { Box, Children } from "..";
import { cardRecipe } from "./Card.css";
import { useBentoConfig } from "../BentoConfigContext";
import { BorderRadiusConfig, getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { CardElevation } from "./Config";

type PaddingKey =
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";

type Props = {
  children: Children;
  elevation?: CardElevation;
  borderRadius?: BorderRadiusConfig;
  background?: BentoSprinkles["background"];
} & { [k in PaddingKey]?: 0 | BentoSprinkles["padding"] };

export function Card({ children, elevation, borderRadius, ...boxProps }: Props) {
  const config = useBentoConfig().card;
  return (
    <Box
      {...getRadiusPropsFromConfig(borderRadius ?? config.defaultRadius)}
      className={cardRecipe({ elevation: elevation ?? config.defaultElevation })}
      {...config.defaultPadding}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

export type { Props as CardProps };
