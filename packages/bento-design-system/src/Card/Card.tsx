import { BentoSprinkles } from "../internal";
import { Box, Children } from "..";
import { cardRecipe } from "./Card.css";
import { useBentoConfig } from "../BentoConfigProvider";

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
  elevation?: "small" | "medium" | "large";
  borderRadius?: Exclude<BentoSprinkles["borderRadius"], "circled">;
} & { [k in PaddingKey]?: 0 | BentoSprinkles["padding"] };

export function Card({ children, elevation, borderRadius, ...boxProps }: Props) {
  const config = useBentoConfig().card;
  return (
    <Box
      borderRadius={borderRadius ?? config.defaultRadius}
      className={cardRecipe({ elevation: elevation || "none" })}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

export type { Props as CardProps };
