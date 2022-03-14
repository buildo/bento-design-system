import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

const hitArea = 44;

export const extendedHitAreaDebug = style({});

export const extendedHitAreaRecipe = strictRecipe({
  base: [
    bentoSprinkles({ position: "relative" }),
    {
      ":after": {
        position: "absolute",
        content: "''",
      },
      selectors: {
        [`${extendedHitAreaDebug} &:after`]: {
          background: vars.backgroundColor.backgroundInformative,
          zIndex: -1,
        },
      },
    },
  ],
  variants: {
    axis: {
      both: {
        ":after": {
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          minHeight: hitArea,
          minWidth: hitArea,
        },
      },
      y: {
        ":after": {
          top: "50%",
          transform: "translateY(-50%)",
          minHeight: hitArea,
          left: 0,
          right: 0,
        },
      },
    },
  },
});
