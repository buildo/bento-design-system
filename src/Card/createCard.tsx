import { bentoSprinkles, Box } from "../internal";
import { BoxProps, Children } from "..";
import { cardRecipe } from "./Card.css";

type PaddingKey =
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";

type CardConfig = {
  radius?: BoxProps<typeof bentoSprinkles>["borderRadius"];
};

export type CardProps = {
  children: Children;
  elevation?: "small" | "medium" | "large";
} & { [k in PaddingKey]?: "24" | "32" | "40" };

export function createCard({ radius = "8" }: CardConfig) {
  return function Card({ children, elevation, ...boxProps }: CardProps) {
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
