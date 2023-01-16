import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { strictRecipe } from "../util/strictRecipe";

export const iconButtonRecipe = strictRecipe({
  base: style([extendedHitAreaRecipe({ axis: "both" }), { lineHeight: 0 }]),
  variants: {
    kind: {
      solid: {},
      transparent: bentoSprinkles({
        borderRadius: "circled",
      }),
      outline: {},
    },
    size: {
      8: {},
      12: {},
      16: {},
      24: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        kind: "transparent",
        size: 8,
      },
      style: bentoSprinkles({
        margin: "negative4",
        padding: 4,
      }),
    },
    {
      variants: {
        kind: "transparent",
        size: 12,
      },
      style: {
        margin: -6,
        padding: 6,
      },
    },
    {
      variants: {
        kind: "transparent",
        size: 16,
      },
      style: bentoSprinkles({
        margin: "negative8",
        padding: 8,
      }),
    },
    {
      variants: {
        kind: "transparent",
        size: 24,
      },
      style: bentoSprinkles({
        margin: "negative8",
        padding: 8,
      }),
    },
  ],
});
