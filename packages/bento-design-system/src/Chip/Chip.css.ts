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
      true: {
        textTransform: "uppercase",
      },
    },
  },
});

export const maxWidth = createVar();

export const ellipsedLabel = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: maxWidth,
});
