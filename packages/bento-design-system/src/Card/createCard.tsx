import { bentoSprinkles, Box } from "../internal";
import { BoxProps, Children } from "..";
import { cardRecipe } from "./Card.css";

type InternalBoxProps = BoxProps<typeof bentoSprinkles>;
type CardConfig = {
  radius: InternalBoxProps["borderRadius"];
};
export const defaultCardConfig: CardConfig = {
  radius: 8,
};

type PaddingKey =
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";

type Props<Paddings extends InternalBoxProps["padding"]> = {
  children: Children;
  elevation?: "small" | "medium" | "large";
} & { [k in PaddingKey]?: 0 | Paddings };

export function createCard<Paddings extends InternalBoxProps["padding"] = 24 | 32 | 40>(
  config: CardConfig
) {
  return function Card({ children, elevation, ...boxProps }: Props<Paddings>) {
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
