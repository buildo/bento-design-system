import { strictRecipe } from "../util/strictRecipe";
import { bentoSprinkles } from "../internal";

export const destinationRecipe = strictRecipe({
  base: bentoSprinkles({
    position: "relative",
    background: {
      default: "primaryTransparentEnabledBackground",
      hover: "primaryTransparentHoverBackground",
      focus: "primaryTransparentFocusBackground",
    },
    color: { disabled: "disabledTransparentForeground" },
    fill: { disabled: "disabledTransparentForeground" },
    cursor: { default: "pointer", disabled: "notAllowed" },
    outline: "none",
  }),
  variants: {
    active: {
      false: bentoSprinkles({
        color: {
          default: "secondaryTransparentEnabledForeground",
          hover: "secondaryTransparentHoverForeground",
          focus: "secondaryTransparentFocusForeground",
        },
      }),
      true: bentoSprinkles({
        color: "textPrimary",
      }),
    },
  },
});
