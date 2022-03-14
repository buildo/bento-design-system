import { strictRecipe } from "../util/strictRecipe";
import { bentoSprinkles } from "../internal";

export const destinationRecipe = strictRecipe({
  base: bentoSprinkles({
    position: "relative",
    color: { disabled: "disabledTransparentForeground" },
    fill: { disabled: "disabledTransparentForeground" },
    cursor: { disabled: "notAllowed" },
    outline: "none",
  }),
  variants: {
    active: {
      false: bentoSprinkles({
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
        },
        cursor: "pointer",
      }),
      true: bentoSprinkles({
        background: "secondaryTransparentEnabledBackground",
      }),
    },
  },
});
