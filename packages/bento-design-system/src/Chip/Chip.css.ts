import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const chipRecipe = strictRecipe({
  base: bentoSprinkles({
    color: "textPrimary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  variants: {
    uppercase: {
      true: bentoSprinkles({
        textTransform: "uppercase",
      }),
    },
  },
});

export const maxWidth = createVar();

export const ellipsedLabel = style([
  { maxWidth: maxWidth },
  bentoSprinkles({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
]);
