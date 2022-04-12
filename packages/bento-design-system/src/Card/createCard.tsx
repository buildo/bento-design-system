import { bentoSprinkles, Box } from "../internal";
import { BoxProps, Children } from "..";
import { cardRecipe } from "./Card.css";
import { CardConfig } from "./Config";

type InternalBoxProps = BoxProps<typeof bentoSprinkles>;

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
} & { [k in PaddingKey]?: 0 | InternalBoxProps["padding"] };

export function createCard(config: CardConfig) {
  return function Card({ children, elevation, ...boxProps }: Props) {
    return (
      <Box
        borderRadius={config.radius}
        className={cardRecipe({ elevation: elevation || "none" })}
        {...boxProps}
      >
        {children}
      </Box>
    );
  };
}

export type { Props as CardProps };
