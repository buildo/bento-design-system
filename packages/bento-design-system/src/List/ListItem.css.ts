import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const listItemRecipe = strictRecipe({
  variants: {
    interactive: {
      true: bentoSprinkles({
        cursor: { default: "pointer", disabled: "notAllowed" },
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
          disabled: "disabledTransparentBackground",
        },
      }),
    },
    focused: {
      true: bentoSprinkles({
        background: "secondaryTransparentFocusBackground",
      }),
    },
    selected: {
      true: bentoSprinkles({
        background: "backgroundInteractiveOverlay",
      }),
    },
  },
});
