import { bentoSprinkles, Box } from "../internal";
import { BoxProps, Children } from "..";
import { cardRecipe } from "./Card.css";

type InternalBoxProps = BoxProps<typeof bentoSprinkles>;

type PaddingKey =
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";

type CardConfig = {
  radius?: InternalBoxProps["borderRadius"];
};

export type CardProps<Paddings extends InternalBoxProps["padding"]> = {
  children: Children;
  elevation?: "small" | "medium" | "large";
} & { [k in PaddingKey]?: Paddings };

export function createCard<Paddings extends InternalBoxProps["padding"] = 24 | 32 | 40>({
  radius = 8,
}: CardConfig) {
  return function Card({ children, elevation, ...boxProps }: CardProps<Paddings>) {
    return (
      <Box
        borderRadius={radius}
        className={cardRecipe({ elevation: elevation || "none" })}
        {...boxProps}
      >
        {children}
      </Box>
    );
  };
}
