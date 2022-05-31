import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const menuRecipe = strictRecipe({
  base: [
    style([
      {
        minWidth: 240,
        overflowY: "auto",
      },
      bentoSprinkles({
        background: "backgroundPrimary",
        borderStyle: "solid",
        borderColor: "outlineContainer",
        borderWidth: 1,
        overflow: "hidden",
      }),
    ]),
  ],
  variants: {
    elevation: {
      small: bentoSprinkles({
        boxShadow: "elevationSmall",
      }),
      medium: bentoSprinkles({
        boxShadow: "elevationMedium",
      }),
      large: bentoSprinkles({
        boxShadow: "elevationLarge",
      }),
    },
  },
});
